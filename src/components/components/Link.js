import { PlaidLink } from "react-plaid-link";
import { auth, db } from "../../config/Firebase";
import { useContext, useEffect, useRef } from "react";
import firebase from "firebase";
import { PlaidContext } from "../../services/Plaid/Plaid.context";

const Link = (_props) => {
  const {
    token,
    onSuccess,
  } = useContext(PlaidContext);
  // const uid = useRef(null);

  const onExit = (error, _metadata) => {
    
    
  };

  const onEvent = (_eventName, _metadata) => {
    
  };

  return (
    <>
      <PlaidLink
        className="CustomButton"
        style={{ padding: "20px", fontSize: "16px", cursor: "pointer" }}
        token={token ? token : ""}
        onExit={onExit}
        onSuccess={onSuccess}
        onEvent={onEvent}
      >
        Connect your brokerage with Plaid
      </PlaidLink>
    </>
  );
};

export default Link;