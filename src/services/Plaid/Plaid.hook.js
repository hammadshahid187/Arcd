import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/Firebase.js";
import { AuthenticationContext } from "../authentication/authentication.context.js";
import cAxios from "../cAxios.js";
import firebase from "firebase";
import moment from "moment";

// our authentication hook
export const usePlaid = () => {
  // const [accessToken, setAccessToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  // const [publicToken, setPublicToken] = useState(null);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [investmentTransactions, setInvestmentTransactions] = useState(null);
  const [holdings, setHoldings] = useState(null);
  const [verifiedSecurityIds, setVerifiedSecurityIds] = useState({});
  const [secondaryAccessTokens, setSecondaryAccessTokens] = useState([]);
  const [accounts, setAccounts] = useState(new Set());
  const [secondaryToken, setSecondaryToken] = useState(null);

  const { currentUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
      if (uid) {
        getSecondaryAccessTokens();
      }
    }
  }, [currentUser, uid]);

  useEffect(() => {
    // get transactions info user only if access token and uid exists
    if (secondaryAccessTokens.length > 0 && uid) {
      async function gTH() {
        await getTransactions(uid);
        await getInvestmentTransactions();
        await getInvestmentHoldings();
      }
      gTH();

      // account ids
      if (accounts.size <= 0) {
        var promises = []
        secondaryAccessTokens.forEach(async (token) => {
          promises.push(
            identity({
              accessToken: token,
            })
          );
        })
        setAccountsFun(promises);
      }
    }
  }, [secondaryAccessTokens]);

  useEffect(() => {
    console.log("plaids", secondaryAccessTokens);
  }, [secondaryAccessTokens]);

  useEffect(async () => {
    // todo get access token from public token
    if (secondaryToken && uid) {
      await getAccessToken(secondaryToken, uid);
    }
  }, [secondaryToken, uid]);

  const identity = firebase.app().functions('us-central1').httpsCallable('identity');

  const setAccountsFun = async (promises) => {
    console.log("promises entry", promises)
    const accountsLocal = new Set();
    var i = 0;
    Promise.all(promises).then(async (res) => {
      res.forEach((item) => {
        item.data = JSON.parse(item.data);
        // filter item.data.accounts with type == "investment"
        item.data.accounts.forEach((account) => {
          if (account.type === "investment") {
            account['accessToken'] = secondaryAccessTokens[i];
            accountsLocal.add(account);
            i += 1;
          }
        });
      });
      setAccounts(new Set([...accounts, ...accountsLocal]));
      console.log("promises exit", promises)
    });
  }

  const getAccessToken = async (publicToken, uid) => {
    try {
      const functionRef = firebase.app().functions('us-central1').httpsCallable('setAccessToken');
      var res = await functionRef({
        public_token: publicToken,
      });

      res.data = JSON.parse(res.data);
      const secondaryAccessToken = res.data.access_token;
      console.log(`data public token  }`);

      if (secondaryAccessToken) {
        await db.collection("users").doc(uid).collection('access_tokens').doc(secondaryAccessToken).set({
          accessToken: secondaryAccessToken,
        });

        var promises = []
        promises.push(
          identity({
            accessToken: secondaryAccessToken,
          })
        );
        setAccountsFun(promises);

        // window.location.reload(false);
        setSecondaryAccessTokens([...secondaryAccessTokens, secondaryAccessToken]);
      } else {
        throw new Error("data: public token not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSecondaryAccessTokens = async () => {
    var snapshot = await db.collection("users").doc(uid).collection("access_tokens").get();
    var local = []
    snapshot.docs.map(doc => {
      local.push(doc.data()['accessToken']);
    })
    setSecondaryAccessTokens(local);
    getLink();
  };

  const resetAllToken = async () => {
    const FieldValue = firebase.firestore.FieldValue;

    // delete access token in the user document in firestore
    await db.collection("users").doc(uid).update({
      auth_tokens: FieldValue.delete(),
    });

    setToken(null);
    setError(null);
    setHoldings(null);
    setTransactions(null);
    setInvestmentTransactions(null);
    setVerifiedSecurityIds({});
    setSecondaryAccessTokens([]);
  };

  async function getLink() {
    await createLinkToken();
  }

  // fetches link token from our plaid server
  const createLinkToken = async () => {
    try {


      // const res = await cAxios.post("/create-link-token", { uid });
      const functionRef = firebase.app().functions('us-central1').httpsCallable('createLinkToken');
      var res = await functionRef();
      res.data = JSON.parse(res.data);
      const data = res.data.link_token;
      if (data) {
        console.log(`data link token fetched`);

        setToken(data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  // get user's transactions from our plaid server
  const getTransactions = async () => {
    const funref = firebase.app().functions('us-central1').httpsCallable('transactions');
    // var res = await funref({
    //   accessToken: accessToken,
    // })
    // res.data = JSON.parse(res.data);
    let transactions2 = [];

    if (secondaryAccessTokens.length > 0) {
      var promises = []
      secondaryAccessTokens.map((token) => {
        promises.push(funref({
          accessToken: token,
        }))
      })
      Promise.all(promises).then(function (values) {
        values.map((value) => {
          transactions2 = transactions2.concat(JSON.parse(value.data).transactions);
        })
        setTransactions(transactions2);
      })
    } else {
      setTransactions(transactions2);
    }
  };

  // get user's investmentTransactions from our plaid server
  const getInvestmentTransactions = async () => {
    console.log("neww called")
    const funref = firebase.app().functions('us-central1').httpsCallable('investmentTransactions');

    const startDate = moment().subtract(5, "years").format("YYYY-MM-DD");

    let investment_transactions = [];
    console.log("pliad", investment_transactions.length)
    if (secondaryAccessTokens.length > 0) {
      var promises = []
      secondaryAccessTokens.map((token) => {
        promises.push(funref({
          accessToken: token,
          startDate: startDate
        }))
      })
      Promise.all(promises).then(function (values) {
        values.map((value) => {
          investment_transactions = investment_transactions.concat(JSON.parse(value.data).investment_transactions);
        })
        console.log("plaid transactions", investment_transactions)
        setInvestmentTransactions(investment_transactions);
      })
    } else {
      setInvestmentTransactions(investment_transactions);
    }
  };

  // get user's investment holdings from our plaid server
  const getInvestmentHoldings = async () => {
    try {
      const funref = firebase.app().functions('us-central1').httpsCallable('holdings');

      const holdings = [];
      var securities = [];

      console.log("pliad", securities.length)

      if (secondaryAccessTokens.length > 0) {
        var promises = []
        secondaryAccessTokens.map((token) => {
          promises.push(funref({
            accessToken: token,
          }))
        })
        Promise.all(promises).then(function (values) {
          values.map((value) => {
            securities = securities.concat(JSON.parse(value.data).holdings.securities);
          })
          console.log("pliad", securities.length)
          handleSecurities(securities);
        })
      } else {

        handleSecurities(securities);
      }

    } catch (err) {
      console.log(err);
      setError("Error while fetching investment holdings.");
    }
  };

  const handleSecurities = async (securities) => {
    var localVerifiedSecurityIds = {}
    if (securities.length > 0) {
      // store securities
      for (let index = 0; index < securities.length; index++) {

        //TODO: Extract all data at once and check if it exists
        if (securities[index].ticker_symbol && securities[index].type === "equity") {
          var docRef = await db.collection("follows").doc(`${uid}-${securities[index].ticker_symbol}`);
          var data = await docRef.get()
          if (!data.exists) {
            db.collection("follows").doc(`${uid}-${securities[index].ticker_symbol}`).set(
              {
                user: uid,
                stock: securities[index].ticker_symbol,
                isFollowing: true,
              })
          }
          localVerifiedSecurityIds[securities[index].security_id] = securities[index].ticker_symbol
        }
      }
      console.log("verifiedSecurityIds", localVerifiedSecurityIds)
      setVerifiedSecurityIds(localVerifiedSecurityIds);
      setHoldings(securities);
    }
  };

  const onSuccess = useCallback(async (public_token) => {
    console.log(`data: public token received from plaid`);
    console.log(`data: ${public_token}`);
    setSecondaryToken(public_token);
  }, []);

  return {
    uid,
    token,
    transactions,
    holdings,
    createLinkToken,
    error,
    resetAllToken,
    investmentTransactions,
    verifiedSecurityIds,
    setSecondaryAccessTokens,
    secondaryAccessTokens,
    onSuccess,
    accounts
  };
};
