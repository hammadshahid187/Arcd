import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {
  AuthenticationContextProvider,
} from "./services/authentication/authentication.context";

const publishableKey = "pk_live_51IIkuQFHoKYpZR6ojLitzxBXsdsM1w9iVCFfsPeNqNorjnellwAErXtLHVO3VShebYVvNj1bTLdqWKMQrWhaH5cD00cibwiEO6"
const stripePromise = loadStripe(publishableKey)




ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
