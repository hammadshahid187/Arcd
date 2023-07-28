import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import { db } from '../../config/Firebase';
import CardInput from './CardInput';

const StripeCard = ({email, user}) => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitSub = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        });

        

        if (result.error) {
            
        } else {
            const res = await axios.post('https://actualnewsapi.herokuapp.com/sub', { 'payment_method': result.paymentMethod.id, 'email': email });
            // eslint-disable-next-line camelcase
            const { client_secret, status } = res.data;

            // console.log(res.data())

            if (status === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then(function (result) {
                    if (result.error) {
                        
                        
                        // Display error message in your UI.
                        // The card was declined (i.e. insufficient funds, card has expired, etc)
                    } else {
                        
                        // db.collection("user").doc(user.uid).set(
                        //     {
                        //         client_secret: client_secret
                        //     },
                        //     {merge: true}
                        // )
                        // Show a success message to your customer
                    }
                });
            } else {
                
                // No additional information was needed
                // Show a success message to your customer
            }
        }
    };

    return (
        <div>
            <form>
                <CardInput />
                <button onClick={(e) => {handleSubmitSub(e)}}>Subscribe</button>
            </form>
        </div>
    )
}

export default StripeCard
