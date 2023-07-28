import firebase from "firebase";
import firebaseui from "firebase";
import Stripe from "Stripe";

/**
 * Replace with your publishable key from the Stripe Dashboard
 * https://dashboard.stripe.com/apikeys
 */
const STRIPE_PUBLISHABLE_KEY =
    "pk_live_51IIkuQFHoKYpZR6ojLitzxBXsdsM1w9iVCFfsPeNqNorjnellwAErXtLHVO3VShebYVvNj1bTLdqWKMQrWhaH5cD00cibwiEO6";

/**
 * Your Firebase config from the Firebase console
 * https://firebase.google.com/docs/web/setup#config-object
 */

const firebaseConfig = {
    apiKey: "AIzaSyDyK4PI5JFoKo23on7RTMEVZxlMpsLRRsI",
    authDomain: "arcafeed.firebaseapp.com",
    databaseURL: "https://arcafeed-default-rtdb.firebaseio.com",
    projectId: "arcafeed",
    storageBucket: "arcafeed.appspot.com",
    messagingSenderId: "95104512746",
    appId: "1:95104512746:web:212eb67cf2d6313c0ddd93",
    measurementId: "G-BRWN3QK767",
};

/**
 * Initialize Firebase
 */
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
let currentUser;

/**
 * Firebase Authentication configuration
 */
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
const firebaseUiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: () => {
            document.querySelector("#loader").style.display = "none";
        },
    },
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Your terms of service url.
    tosUrl: "https://example.com/terms",
    // Your privacy policy url.
    privacyPolicyUrl: "https://example.com/privacy",
};
firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").style.display = "block";
        currentUser = firebaseUser.uid;
        startDataListeners();
    } else {
        document.querySelector("main").style.display = "none";
        firebaseUI.start("#firebaseui-auth-container", firebaseUiConfig);
    }
});

function startDataListeners() {
    // Get all our products and render them to the page
    const products = document.querySelector(".products");
    const template = document.querySelector("#product");
    db.collection("products")
        .where("active", "==", true)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                const priceSnap = await doc.ref
                    .collection("prices")
                    .orderBy("unit_amount")
                    .get();
                if (!("content" in document.createElement("template"))) {
                    return;
                }

                const product = doc.data();
                const container = template.content.cloneNode(true);

                container.querySelector("h2").innerText =
                    product.name.toUpperCase();
                container.querySelector(".description").innerText =
                    product.description?.toUpperCase() || "";
                // Prices dropdown
                priceSnap.docs.forEach((doc) => {
                    const priceId = doc.id;
                    const priceData = doc.data();
                    const content = document.createTextNode(
                        `${new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: priceData.currency,
                        }).format(
                            (priceData.unit_amount / 100).toFixed(2)
                        )} per ${priceData.interval}`
                    );
                    const option = document.createElement("option");
                    option.value = priceId;
                    option.appendChild(content);
                    container.querySelector("#price").appendChild(option);
                });

                if (product.images.length) {
                    const img = container.querySelector("img");
                    img.src = product.images[0];
                    img.alt = product.name;
                }

                const form = container.querySelector("form");
                form.addEventListener("submit", subscribe);

                products.appendChild(container);
            });
        });

    db.collection("customers")
        .doc(currentUser)
        .collection("subscriptions")
        .where("status", "in", ["trialing", "active"])
        .onSnapshot(async (snapshot) => {
            if (snapshot.empty) {
                // Show products
                document.querySelector("#subscribe").style.display = "block";
                return;
            }
            document.querySelector("#subscribe").style.display = "none";
            document.querySelector("#my-subscription").style.display = "block";
            // In this implementation we only expect one Subscription to exist
            const subscription = snapshot.docs[0].data();
            const priceData = (await subscription.price.get()).data();
            document.querySelector(
                "#my-subscription p"
            ).textContent = `You are paying ${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: priceData.currency,
            }).format((priceData.unit_amount / 100).toFixed(2))} per ${
                priceData.interval
            }`;
        });
}

/**
 * Data listeners
 */

document
    .getElementById("signout")
    .addEventListener("click", () => firebase.auth().signOut());

// Checkout handler
async function subscribe(event) {
    event.preventDefault();
    document.querySelectorAll("button").forEach((b) => (b.disabled = true));
    const formData = new FormData(event.target);

    const docRef = await db
        .collection("customers")
        .doc(currentUser)
        .collection("checkout_sessions")
        .add({
            price: formData.get("price"),
            allow_promotion_codes: true,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
            // We have a session, let's redirect to Checkout
            const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
            stripe.redirectToCheckout({ sessionId });
        }
    });
}

// Billing portal handler
const functionLocation = "us-central1"; // us-central1, for example
document
    .querySelector("#billing-portal-button")
    .addEventListener("click", async (event) => {
        document.querySelectorAll("button").forEach((b) => (b.disabled = true));

        // Call billing portal function
        const functionRef = firebase
            .app()
            .functions(functionLocation)
            .httpsCallable(
                "ext-firestore-stripe-subscriptions-createPortalLink"
            );
        const { data } = await functionRef({
            returnUrl: window.location.origin,
        });
        window.location.assign(data.url);
    });
