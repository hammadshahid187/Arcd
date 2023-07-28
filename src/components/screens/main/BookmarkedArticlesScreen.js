import React, { useState, useEffect } from "react";
import { db } from "../../../config/Firebase";
import Navbar from "../../components/Navbar";
import firebase from "firebase";
import NewsGrid from "../../components/NewsGrid";

const BookmarkedArticlesScreen = ({ history }) => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getBookmarked = async (uid) => {
        var arr = [];
        await db
            .collection("bookmarks")
            .where("user", "==", uid)
            .get()
            .then((querySnapshotter) => {
                querySnapshotter.forEach(async (doc) => {
                    const post = doc.data();
                    arr.push(post);
                });
            });

        var actArr = [];

        for (var z = 0; z < arr.length; z++) {
            var data = await db.collection("posts").doc(arr[z].id).get();
            actArr.push({ id: arr[z].id, data: data.data() });
        }
        // arr = arr.sort((post) => {return (new Date(post.published_utc))})
        setIsLoading(false);
        setBookmarkedArticles(actArr);
    };

    useEffect(() => {
        async function func() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    getBookmarked(user.uid);
                    console.log("book", isLoading);
                } else {
                    history.push("/login");
                    // No user is signed in.
                }
            });
        }
        func();
        // fetchPrivateDate();e
        // e.preventDefault()
    }, [history, isLoading]);

    console.log("bookmarked-articles", bookmarkedArticles);

    return (
        <div>
            <Navbar history={history} activeNav={"bookmarks"} />
            <div className="container mx-auto">
                <div className="pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 mb-12 md:mb-16 lg:mb-20">
                    <NewsGrid
                        data={bookmarkedArticles}
                        history={history}
                        loaded={!isLoading}
                    />

                    <div className="flex justify-center text-2xl font-semibold">
                        {!isLoading && bookmarkedArticles.length === 0 ? (
                            "No Bookmarked Articles"
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkedArticlesScreen;
