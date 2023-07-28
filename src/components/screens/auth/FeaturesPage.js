import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { NavBeforeLogin } from "../../components/NavBeforeLogin";

function FeaturesPage(props) {
  let history = useHistory();

  const [modal, setModal] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const redirectHandler = (path) => {
    history.push(path);
  };

  return (
    <>
      <div className="h-screen">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
          @import
          url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap');
        </style>

        {/* Navbar */}

        <NavBeforeLogin modal={modal} setModal={setModal} />

        {/* Header */}
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-32">
            <div className="flex items-start flex-col w-full">
              <h2 className="font-sourceSansPro text-4xl lg:text-5xl  2xl:text-[80px] 2xl:leading-none text-navy-blue">
                Your One-Stop-Shop <br />
                for the{" "}
                <span className="font-bold text-arca-blue">Stock Market</span>
              </h2>
              <div className="flex items-center justify-center flex-col flex-grow">
                <div>
                  <p className="font-Manrope my-4 text-xl mt-4 text-navy-blue">
                    Arcafeed scours the web for relevant, credible, and reliable news articles and market discrepencies.
                  </p>

                  <div className="w-full mt-8">
                    <div className="flex justify-center md:justify-start">
                      <Button
                        className="w-1/2 md:w-1/3"
                        variant="contained"
                        onClick={() => {
                          setModal("signup");
                        }}
                        style={{
                          height: "55px",
                          color: "white",
                          backgroundColor: "#0090B9",
                          borderRadius: "100px",
                        }}
                      >
                        Get Started
                      </Button>

                      <Button
                        className="w-1/2 md:w-1/3"
                        variant="contained"
                        onClick={() => {
                          redirectHandler("/news");
                        }}
                        style={{
                          marginLeft: "2%",
                          height: "55px",
                          color: "white",
                          backgroundColor: "#000066",
                          borderRadius: "100px",
                        }}
                      >
                        Go To News
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="md:w-9/12 w-full mx-auto mt-12 lg:mt-0"
              src="/new_design/landing-page-img1.svg"
            />
          </div>

          {/* Section 1 body */}

          <section>
            <div className="px-2 lg:px-5 mx-auto mt-64 text-center text-navy-blue">
              <h2 className="font-sourceSansPro font-semibold text-3xl lg:text-[56px] lg:leading-6">
                Arcafeed is a stock community for everyone
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 lg:mt-24">
                <div className="font-Manrope text-[60px] leading-[88px] font-bold lg:text-start">
                  <div className="inline-block text-center">
                    1,000+
                    <div className="font-Manrope font-medium text-3xl leading-[88px] lg:text-4xl text-center mt-10">
                      Active users
                    </div>
                  </div>
                </div>
                <div className="font-Manrope text-[60px] leading-[88px] font-bold mt-12 lg:mt-0 ">
                  <div className="inline-block">
                    190+
                    <div className="font-Manrope font-medium text-3xl leading-[88px] lg:text-4xl mt-10">
                      Influencers
                    </div>
                  </div>
                </div>
                <div className="font-Manrope text-[60px] leading-[88px] font-bold mt-12 lg:mt-0 lg:text-end">
                  <div className="inline-block text-center">
                    12,000+
                    <div className="font-Manrope font-medium text-3xl leading-[88px] lg:text-4xl text-center mt-10">
                      Brokerages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-48 text-center">
            <div className="text-navy-blue font-sourceSansPro font-bold text-3xl lg:text-[85px] lg:leading-[107px]">
              Know Your Stocks
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-14 lg:mt-44">
              <img
                src="/new_design/stockImg2.svg"
                alt=""
                className="w-10/12 lg:w-8/12 mx-auto"
              />
              <div className="flex justify-center items-center flex-col">
                <div className="w-full lg:w-4/5 mx-auto text-navy-blue mt-12 lg:mt-0">
                  <div className="font-sourceSansPro text-3xl lg:text-[56px] lg:leading-[72px] font-bold ">
                    Connect Your Brokerage
                  </div>
                  <div className="mt-11 font-Manrope font-bold text-xl opacity-50">
                    Plaid let's you reliably connect your investment accounts to
                    Arcafeed so you can view your data in real time.
                  </div>
                  <Button
                    className="block border-black mx-auto p-3 px-6 pt-2"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setModal("signup");
                    }}
                    style={{
                      boxShadow: "none",
                      borderRadius: "8px",
                      marginTop: "44px",
                      color: "black",
                      backgroundColor: "#F5F5F5",
                      border: "1px solid black",
                    }}
                  >
                    <b className="p-4 normal-case font-sourceSansPro font-bold text-xl">
                      Learn more
                    </b>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-14 lg:mt-36 items-center">
              <img
                src="/new_design/stockImg3.svg"
                alt=""
                className="w-10/12 lg:w-11/12 mx-auto lg:order-2"
              />
              <div className="flex justify-center items-center flex-col">
                <div className="w-full lg:w-4/5 mx-auto text-navy-blue mt-12">
                  <div className="font-sourceSansPro text-3xl lg:text-[56px] lg:leading-[72px] font-bold ">
                    Your stocks
                  </div>
                  <div className="mt-11 font-Manrope font-bold text-xl opacity-50">
                    Gain insight into your companies. Access a personalized newsfeed and market indicators based on your trading portfolio (includes options trading).
                  </div>
                  <Button
                    className="block border-black mx-auto p-3 px-6 pt-2"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setModal("signup");
                    }}
                    style={{
                      boxShadow: "none",
                      borderRadius: "8px",
                      marginTop: "44px",
                      color: "black",
                      backgroundColor: "#F5F5F5",
                      border: "1px solid black",
                    }}
                  >
                    <b className="p-4 normal-case font-sourceSansPro font-bold text-xl">
                      Learn more
                    </b>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 lg:mt-36">
              <img
                src="/new_design/stockImg4.svg"
                alt=""
                className="w-10/12 lg:w-3/5 mx-auto"
              />
              <div className="flex justify-center items-center flex-col">
                <div className="w-full lg:w-4/5 mx-auto text-navy-blue">
                  <div className="font-sourceSansPro text-3xl lg:text-[56px] lg:leading-[72px] font-bold ">
                    Secure
                  </div>
                  <div className="mt-11 font-Manrope font-bold text-xl opacity-50">
                    Your data is powerful—and no one should access it without your permission. For that reason, our information security practices are designed to meet or exceed industry standards.
                  </div>
                  <Button
                    className="block border-black mx-auto p-3 px-6 pt-2"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setModal("signup");
                    }}
                    style={{
                      boxShadow: "none",
                      borderRadius: "8px",
                      marginTop: "44px",
                      color: "black",
                      backgroundColor: "#F5F5F5",
                      border: "1px solid black",
                    }}
                  >
                    <b className="p-4 normal-case font-sourceSansPro font-bold text-xl">
                      Learn more
                    </b>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-48 text-center">
            <div className="text-navy-blue font-bold text-3xl font-sourceSansPro lg:text-[85px] lg:leading-1.5">
              Why Choose Arcafeed
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-14 lg:mt-40">

              <div className="mx-auto w-10/12 ">
                <div className="h-full rounded-xl text-black border-2 border-black p-8">
                  <img
                    src="/new_design/WCA_img2.svg"
                    className="mx-auto w-3/12"
                  />
                  <h1 className="font-sourceSansPro text-2xl text-center font-bold mt-10">
                    Daily News Updates
                  </h1>
                  <p className="font-Manrope font-medium mt-4 text-sm text-center mt-6">
                    Our advanced article filteration algorithim makes sure you
                    are making the most out of your precious time.
                  </p>
                </div>
              </div>
              <div className="mx-auto w-10/12 mt-12 lg:mt-0">
                <div className="h-full rounded-xl text-black border-2 border-black p-8">
                  <img
                    src="/new_design/WCA_img3.svg"
                    className="mx-auto w-3/12"
                  />
                  <h1 className="font-sourceSansPro text-2xl text-center font-bold mt-10">
                    Secure
                  </h1>
                  <p className="font-Manrope font-medium mt-4 text-sm text-center mt-6">
                    Your data is powerful—and no one should access it without
                    your permission.
                  </p>
                </div>
              </div>
              <div className="mx-auto w-10/12 mt-12 lg:mt-0">
                <div className="h-full rounded-xl text-black border-2 border-black p-8">
                  <img
                    src="/new_design/WCA_img1.svg"
                    className="mx-auto w-3/12"
                  />
                  <h1 className="font-sourceSansPro text-2xl text-center font-bold mt-10">
                    Trading Community
                  </h1>
                  <p className=" font-Manrope font-medium mt-4 text-[21px] leading-[22px] text-center mt-6">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="block border-black mx-auto p-3 px-6 pt-2 rounded-full"
              type="submit"
              variant="contained"
              onClick={() => {
                setModal("signup");
              }}
              style={{
                boxShadow: "none",
                borderRadius: "8px",
                marginTop: "120px",
                fontSize: "32px",
                color: "black",
                backgroundColor: "#F5F5F5",
                border: "1px solid black",
              }}
            >
              <b className="px-4 normal-case font-sourceSansPro font-bold ">
                Get Started
              </b>
            </Button>
          </div>

          <div className="mt-48 text-center">
            <div className="hidden md:block  text-navy-blue font-sourceSansPro font-bold text-3xl lg:text-6xl">
              Official <img className="max-w-[30%] inline" src="./image.png" alt="" /> Partner
            </div>
            <div className="block md:hidden  text-navy-blue font-sourceSansPro font-bold text-4xl lg:text-6xl">
              <img className="max-w-[60%] mx-auto" src="./image.png" alt="" />
              Official Partner
            </div>
            {/* <div className="grid grid:cols-1 lg:grid-cols-4 mt-12 lg:mt-40">
              <img src="/new_design/TrustBest_img1.svg" />
              <img
                src="/new_design/TrustBest_img2.svg"
                className="mt-12 lg:mt-0"
              />
              <img
                src="/new_design/TrustBest_img3.svg"
                className="mt-12 lg:mt-0"
              />
              <img
                src="/new_design/TrustBest_img4.svg"
                className="mt-12 lg:mt-0"
              />
            </div> */}
          </div>

          <div className="bg-navy rounded-3xl mt-40 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="w-10/12 lg:w-full mx-auto lg:ml-auto text-center lg:text-start lg:pl-32">
                <h2 className="font-sourceSansPro font-bold text-3xl xl:text-4xl 2xl:text-[56px] 2xl:leading-[42px] mt-20 text-white">
                  Ready To Get Started?
                </h2>
                <p className="font-Manrope my-4 text-xl xl:text-2xl 2xl:text-3xl text-white">
                  Sign up today and access a whole <br /> world of financial
                  infomation.
                </p>
                <div className="mt-12 2xl:mt-20">
                  <Button
                    className="block border-black mx-auto p-3 px-6 pt-2 rounded-full text-navy-blue"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setModal("signup");
                    }}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                  >
                    <b className="font-sourceSansPro font-bold text-xl capitalize text-navy-blue px-5">
                      Sign Up
                    </b>
                  </Button>
                </div>
              </div>
              <div className="mt-14 lg:mt-0">
                <img src="/new_design/SecondFooterImg.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 body */}

        <div className="flex flex-col items-center justify-center block md:hidden">
          <div className="mt-20 mb-20">
            <img src="/new_design/footerButton.svg" onClick={scrollToTop} />
          </div>
        </div>

        {/* <img src="img/logo-white.svg" className="h-8" alt="" /> */}
        {/* <Footer history={history} ad={true} /> */}

        <footer className="bg-white m-h-[75vh]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-6 sm:px-8 px-5 py-16 h-4/6">
              <div className="col-span-2 flex flex-col justify-between">
                <img src="/arcafeed.png" alt="" width={150} />
                <div className="mt-12 lg:mt-0">
                  <div className="text-navy-blue font-sourceSansPro font-bold text-[32px] leading-[32px]">
                    Be a smarter, better informed investor
                  </div>
                  <div className="text-[#8E8E93] text-sm mt-5">
                    Subscribe to Arcafeed premium for $4.99/month
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="w-full lg:w-9/12 ml-auto mt-12 lg:mt-0">
                  <div className="text-navy-blue font-medium text-xl">
                    Contact Us
                  </div>
                  <div className="mt-8 text-[#8E8E93] font-Manrope text-base">
                    Boston, MA 02118
                  </div>
                  <div className="mt-4 text-[#8E8E93] font-Manrope text-base">
                    (857)-348-9205
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="w-full lg:w-9/12 ml-auto mt-12 lg:mt-0">
                  <div className="text-navy-blue font-medium text-xl">
                    Social Media
                  </div>
                  <div className="mt-8 text-[#8E8E93] font-Manrope text-base" onClick={() => window.location.href = "https://www.linkedin.com/company/76675564/admin/"}>
                    Linkedin
                  </div>
                  <div className="mt-4 text-[#8E8E93] font-Manrope text-base" onClick={() => window.location.href = "http://facebook.com/Arcafeed"}>
                    Facebook
                  </div>
                  <div className="mt-4 text-[#8E8E93] font-Manrope text-base" onClick={() => window.location.href = "http://twitter.com/arcafeed"}>
                    Twitter
                  </div>
                  <div className="mt-4 text-[#8E8E93] font-Manrope text-base" onClick={() => window.location.href = "http://instagram.com/Arcafeed"}>
                    Instagram
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 hidden md:block">
                <div className="w-9/12 ml-auto">
                  <img
                    src="/new_design/footerButton.svg"
                    onClick={scrollToTop}
                  />
                </div>
              </div>
            </div>
            <div className="h-2/6 flex flex-col justify-end text-center lg:text-start pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 px-5">
                <div className="col-span-2">
                  <div className="font-roboto font-medium text-[12px] leading-[24px] text-[#8E8E93]">
                    © 2023 Arcafeed. All rights reserved
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0 font-Manrope text-[#8E8E93] text-[13px] leading-[24px]" onClick={() => redirectHandler('/terms')}>
                    Terms & Conditions
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0 font-Manrope text-[#8E8E93] text-[13px] leading-[24px]" onClick={() => redirectHandler('/privacy-policy')}>
                    Privacy
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0 font-Manrope text-[#8E8E93] text-[13px] leading-[24px]">
                    Site by AcraFeed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FeaturesPage;
