import { Divider } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Instagram, LinkedIn, Twitter } from "@material-ui/icons";
import { Link } from "react-router-dom";
const Footer = ({ history, ad }) => {
    const useStyles = makeStyles((theme) => ({
        dividerColor: {
            backgroundColor: "white",
        },
    }));

    const getPremium = () => {
        history.push("/premium");
    };
    const toTermsPage = () => {
        history.push("/terms");
    };

    const toPrivacyPolicy = () => {
        history.push("/privacy-policy");
    };
    return (
        <footer className="w-screen">
            <div className="bg-regal-blue overflow-x-initial ">
                <div className="pt-4 pb-10 pl-10 pr-10 text-left container mx-auto">
                    {ad && (
                        <>
                            <div className="flex mb-4 pt-8">
                                <p className="text-lg font-bold text-gray-300">
                                    Be a smarter, better informed investor
                                </p>
                            </div>
                            <div className="mb-8">
                                <div className="md:flex md:justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-500 ">
                                            Subscribe to Arcafeed premium for
                                            $4.99/month
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => getPremium()}
                                        className="pt-1 pb-1 pl-6 pr-6 rounded-3xl bg-white"
                                    >
                                        <p className="text-xs text-regal-blue font-bold">
                                            GO PREMIUM
                                        </p>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white h-px" />
                        </>
                    )}

                    <div className="ml-2 mr-2 md:ml-4 md:mr-4 mt-6">
                        <div className="justify-between flex">
                            <div>
                                <img
                                    src="/logo-all-white.png"
                                    alt="ARCAFEED"
                                    width={130}
                                />
                            </div>
                            <div className="space-x-4 mb-6">
                                {/* create react Link to facebook */}

                                <a
                                    href="https://linkedin.com/company/arcafeed"
                                    target="_blank"
                                >
                                    <LinkedIn className="text-white" />
                                </a>
                                <a
                                    href="https://twitter.com/arcafeed"
                                    target="_blank"
                                >
                                    <Twitter className="text-white" />
                                </a>
                                <a
                                    href="https://instagram.com/arcafeed"
                                    target="_blank"
                                >
                                    <Instagram className="text-white" />
                                </a>
                            </div>
                        </div>

                        <div className="justify-between flex">
                            <div>
                                <p className="text-gray-600 text-xs">
                                    © 2023 Arcafeed. All rights reserved
                                </p>
                            </div>

                            <div className="flex space-x-2 md:space-x-4 pr-1">
                                <button
                                    className="text-gray-600 text-xs"
                                    onClick={toTermsPage}
                                >
                                    Terms & Conditions
                                </button>
                                <button
                                    className="text-gray-600 text-xs"
                                    onClick={toPrivacyPolicy}
                                >
                                    Privacy Policy
                                </button>
                                <button
                                    className="text-gray-600 text-xs"
                                    onClick={toPrivacyPolicy}
                                >
                                    About Us
                                </button>
                                <a
                                    className="text-gray-600 text-xs"
                                    href="mailto:support@arcafeed.com"
                                >
                                    Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
