import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
// Routing
// Screens
import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    ResetPasswordScreen,
    AccountScreen,
    AccountsScreen,
    LandingPage,
    PrivacyPolicy,
    Terms,
    FeaturesPage,
} from "./components/screens/auth";
import {
    BookmarkedArticlesPage,
    NewsScreen,
    StocksScreen,
    ShowStockScreen,
    PremiumAd,
    Page404,
    NewsDetailsScreen,
    EnterpriseLandingScreen,
} from "./components/screens/main";

import ReactGA from "react-ga";

import { Suspense, useContext, useEffect } from "react";

import LoadingSpinner from "./components/components/UIElements/LoadingSpinner";
import { AuthenticationContext } from "./services/authentication/authentication.context";
import { PlaidContextProvider } from "./services/Plaid/Plaid.context";
import NewsContextProvider from "./services/news/news.context";
import ExploreStockNewsContextProvider from "./services/exploreStocksNews/exploreStocksNews.context";
import "swiper/components/pagination/pagination.min.css";

const TRACKING_ID = "UA-185964762-1";
const App = () => {
    const { userType, isLoggedIn, isLoading, currentUser } = useContext(
        AuthenticationContext
    );
    ReactGA.initialize(TRACKING_ID);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    return (
        <PlaidContextProvider>
            <NewsContextProvider>
                <ExploreStockNewsContextProvider>
                    <Router>
                        {!isLoading && !isLoggedIn && (
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={FeaturesPage}
                                />
                                {/* <Route exact path="/features" component={FeaturesPage} /> */}
                                <Route
                                    exact
                                    path="/login"
                                    component={LoginScreen}
                                />
                                <Route
                                    exact
                                    path="/register/:email?"
                                    component={RegisterScreen}
                                />
                                <Route
                                    exact
                                    path="/forgotpassword"
                                    component={ForgotPasswordScreen}
                                />
                                <Route
                                    exact
                                    path="/passwordreset/:resetToken"
                                    component={ResetPasswordScreen}
                                />
                                <Route
                                    exact
                                    path="/premium"
                                    component={PremiumAd}
                                />
                                <Route
                                    exact
                                    path="/privacy-policy"
                                    component={PrivacyPolicy}
                                />
                                {/* <Route
                                    exact
                                    path="/news/:signIn"
                                    component={NewsScreen}
                                /> */}
                                {/* <Route
                                    exact
                                    path="/news"
                                    component={NewsScreen}
                                />
                                <Route
                                    exact
                                    path="/news/:id"
                                    component={NewsDetailsScreen}
                                /> */}
                                <Route exact path="/terms" component={Terms} />
                                <Route exact path="/404" component={Page404} />
                                <Route
                                    exact
                                    path="/enterprise"
                                    component={EnterpriseLandingScreen}
                                />

                                <Route
                                    path={[
                                        "/account",
                                        "/mystocks",
                                        "/news",
                                        "/stock/:stock",
                                    ]}
                                >
                                    <Redirect to="/login" />
                                </Route>
                                <Route component={Page404} />
                            </Switch>
                        )}

                        {!isLoading && isLoggedIn && userType === "Basic" && (
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/news" />
                                </Route>
                                {/* <Route exact path="/features" >
                                    <Redirect to="/news" />
                                </Route> */}
                                <Route
                                    exact
                                    path="/news"
                                    component={NewsScreen}
                                />
                                <Route
                                    exact
                                    path="/news/:id"
                                    component={NewsDetailsScreen}
                                />
                                <Route
                                    exact
                                    path="/account"
                                    component={AccountsScreen}
                                />
                                <Route
                                    exact
                                    path="/bookmarks"
                                    component={BookmarkedArticlesPage}
                                />
                                <Route
                                    exact
                                    path="/stock/:stock"
                                    component={ShowStockScreen}
                                />
                                <Route
                                    exact
                                    path="/premium"
                                    component={PremiumAd}
                                />
                                <Route
                                    exact
                                    path="/privacy-policy"
                                    component={PrivacyPolicy}
                                />

                                <Route
                                    exact
                                    path="/enterprise"
                                    component={EnterpriseLandingScreen}
                                />

                                <Route exact path="/terms" component={Terms} />
                                <Route exact path="/404" component={Page404} />

                                {/* login & register screen to prevent a flash second of 404 after logout */}
                                <Route
                                    exact
                                    path="/login"
                                    component={LoginScreen}
                                />
                                <Route
                                    exact
                                    path="/register/:email?"
                                    component={RegisterScreen}
                                />
                                <Route component={Page404} />
                            </Switch>
                        )}

                        {!isLoading && isLoggedIn && userType === "Premium" && (
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/mystocks" />
                                </Route>

                                {/* <Route exact path="/features">
                                    <Redirect to="/mystocks" />
                                </Route> */}
                                <Route
                                    exact
                                    path="/news"
                                    component={NewsScreen}
                                />

                                <Route
                                    exact
                                    path="/news/:id"
                                    component={NewsDetailsScreen}
                                />
                                <Route
                                    exact
                                    path="/account"
                                    component={AccountsScreen}
                                />
                                <Route
                                    exact
                                    path="/bookmarks"
                                    component={BookmarkedArticlesPage}
                                />
                                <Route
                                    exact
                                    path="/stock/:stock"
                                    component={ShowStockScreen}
                                />
                                <Route
                                    exact
                                    path="/mystocks"
                                    component={StocksScreen}
                                />
                                <Route
                                    exact
                                    path="/accountscreen"
                                    component={AccountScreen}
                                />

                                <Route
                                    exact
                                    path="/premium"
                                    component={PremiumAd}
                                />
                                <Route
                                    exact
                                    path="/privacy-policy"
                                    component={PrivacyPolicy}
                                />
                                <Route exact path="/terms" component={Terms} />
                                <Route exact path="/404" component={Page404} />

                                {/* login & register screen to prevent a flash second of 404 after logout */}
                                <Route
                                    exact
                                    path="/login"
                                    component={LoginScreen}
                                />
                                <Route
                                    exact
                                    path="/register/:email?"
                                    component={RegisterScreen}
                                />
                                <Route component={Page404} />
                            </Switch>
                        )}
                    </Router>
                </ExploreStockNewsContextProvider>
            </NewsContextProvider>
        </PlaidContextProvider>
    );
};

export default App;
