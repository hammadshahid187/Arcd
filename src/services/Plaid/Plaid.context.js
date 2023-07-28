import { createContext } from "react"
import { usePlaid } from "./Plaid.hook.js";

// our custom authentication context
export const PlaidContext = createContext({
  accessToken: null,
  token: null,
  error: null,
  transactions: null,
  holdings: null,
  investmentTransactions: null,
  verifiedSecurityIds: null,
  createLinkToken: async () => { },
  setAccessToken: async () => { },
  getAccessToken: async () => { },
  onSuccess: async () => { },
  resetAllToken: async () => { },
});

// our authentication context provider object
export const PlaidContextProvider = ({ children }) => {
  const {
    // accessToken,
    // setAccessToken,
    token,
    createLinkToken,
    // getAccessToken,
    resetAllToken,
    error,
    onSuccess,
    transactions,
    investmentTransactions,
    verifiedSecurityIds,
    holdings,
    setSecondaryAccessTokens,
    secondaryAccessTokens,
    accounts
  } = usePlaid();

  return (
    <PlaidContext.Provider
      value={{
        // accessToken: accessToken,
        token: token,
        error: error,
        transactions: transactions,
        investmentTransactions: investmentTransactions,
        verifiedSecurityIds: verifiedSecurityIds,
        holdings: holdings,
        createLinkToken: createLinkToken,
        // setAccessToken: setAccessToken,
        // getAccessToken: getAccessToken,
        onSuccess: onSuccess,
        resetAllToken: resetAllToken,
        setSecondaryAccessTokens: setSecondaryAccessTokens,
        secondaryAccessTokens: secondaryAccessTokens,
        accounts: accounts
      }}
    >
      {children}
    </PlaidContext.Provider>
  );
};