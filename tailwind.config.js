// prettier-ignore
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            // fontFamily: {
            //   'lato': ['lato'],
            //   'sans-pro': ['"Source Sans Pro"', 'sans-serif']
            // },
            fontFamily: {
                sourceSansPro: ['"Source Sans Pro"', "sans-serif"],
                roboto: ['"Roboto"', "sans-serif"],
                Inter: ['"Inter"', "sans-serif"],
                Manrope: ['"Manrope"', "sans-serif"],
            },
            padding: {
                "1/3": "33.33333%",
                "2/3": "67.77777%",
            },
            colors: {
                "regal-blue": "#110F3C",
                "arca-blue": "#0090B9",
                "facebook-blue": "#1877Fe",
                "login-blue": "#3266E3",
                "watchlist-blue": "#151522",
                "arca-red": "#FF413C",
                navy: "#172b85",
                premium: "#ABA400",
                "navy-blue": "#122F89",
                "light-gray": "#B1B1B1",
                "lighter-gray": "#e8e8e8",
                "text-gray": "#4d4d4d",
                "features-section-gray": "#151515",
                "brand-green": "#04CA00",
                link: "#2F9FF8",
            },
            screens: {
                tablet: "840px",
            },
            gridTemplateColumns: {
                // Complex site-specific column configuration
                footer: "200px 1fr 1fr 1fr 360px",
            },
            minHeight: {
                "account-form": "31.75rem",
            },
            height: {
                "hand-icon-h": "32px",
            },
            width: {
                "account-save-btn": "290px",
                "account-grid": "309px",
                "account-input": "265px",
                "hand-icon-w": "32px",
            },
            fontSize: {
                "setting-header": "34px",
            },
            borderWidth: {
                "user-img": "6px",
            },
            boxShadow: {
                "enterprise-card": "0px 0px 5px rgba(30, 105, 255, 0.4)",
                bulletin: "0px 0px 5px rgba(30, 105, 255, 0.2);",
                "nav": "4px 4px 40px rgba(0, 0, 0, 0.06)",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
