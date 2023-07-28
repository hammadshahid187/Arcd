import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Bookmark,
    BookmarkBorderOutlined,
    Favorite,
    FavoriteBorderOutlined,
    Twitter,
} from "@mui/icons-material";
import StockButton from "./StockButton";
import AddButton from "./AddButton";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import { ExploreStockNewsContext } from "../../services/exploreStocksNews/exploreStocksNews.context";

const sampleData = [
    {
        article_url:
            "https://finance.yahoo.com/news/retail-traders-plowed-more-than-200-million-into-regional-bank-stocks-over-the-last-week-171107308.html",
        description:
            "<p>Individual investors plowed money into regional U.S. bank stocks over the past week despite a cri",
        image_url: "",
        added_utc: 1679680551.0673249,
        source: "Yahoo",
        article_heading:
            "Retail traders plowed more than $200 million into regional bank stocks over the last week",
        article_body:
            '<p>Individual investors plowed money into regional U.S. bank stocks over the past week despite a crisis that continues to rattle markets, betting that certain financial institutions would be able to withstand the current turmoil.</p><p>From March 17 to March 23, according to VandaTrack, these so-called retail investors funneled more than $200 million into five mid-sized lenders that attracted scrutiny following the seizures of Silicon Valley Bank and Signature Bank earlier this month.</p><div></div><p>They include San Francisco bank First Republic (FRC), which attracted $110 million in new bets. Another $36 billion went to PacWest Bancorp (PACW) and Western Alliance Bancorp (WAL), according to VandaTrack. None of those banks performed well over the same period. Shares of First Republic, PacWest and Western Alliance dropped more than 54%, 7%, and 8% respectively.</p><div>This content is not available due to your privacy preferences.Update your settings here to see it.</div><p>Individual traders also put another $67 million into U.S. Bancorp (USB) and Truist Financial (TFC), which are two of the country\'s largest regional banks. U.S. Bancorp was roughly flat over the same period, while Truist rose roughly 5%.</p><p>VandaTrack, in a note, called the buying of regional stocks "unprecedented" and said retail investors are eying "big pay-outs on a return of confidence" for the banking industry. But it expects purchases to wane and warned of more pain ahead for investors.</p><p>"We struggle to see how sentiment for banking stocks can meaningfully recover in this kind of environment."</p><p>Confidence in the regional banking sector has seesawed throughout the week as investors digest a forced marriage of UBS Group and Credit Suisse, another rate hike from the Federal Reserve, comments from Treasury Secretary Janet Yellen about future steps that could be taken if other banks run into trouble and mounting pressure on giant German lender Deutsche Bank.</p><p>This is the second straight week that some individual investors gravitated to banks despite the turmoil. But during the five trading days ending March 16, giant banks attracted the most new money.</p><p>Bank of America (BAC) pulled in almost $232 million on its own during that period. It is the nation\'s second-largest bank by assets. Overall, financial stocks collected almost a billion of net flows over that week, Vanda said.</p><p>Dani Romero is a reporter for Yahoo Finance. Follow her on Twitter @daniromerotv</p><p>Click here for the latest stock market news and in-depth analysis, including events that move stocks</p>',
        tickers: ["BAC", "USB", "FRC"],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/fords-next-gen-project-t3-ev-pickup-is-coming-in-2025-100052782.html",
        description:
            "<p>Ford (F) on Friday unveiled it's gearing up for next step in its EV truck business - the Project ",
        image_url: "",
        added_utc: 1679680552.159858,
        source: "Yahoo",
        article_heading:
            "Ford\u2019s next-gen \u2018Project T3\u2019 EV pickup is coming in 2025",
        article_body:
            '<p>Ford (F) on Friday unveiled it\'s gearing up for next step in its EV truck business - the Project T3.</p><p>Fresh off its "teach-in" describing the new segments of the business, Ford said its preparing to build its next-gen electric truck, code-named Project T3, at its upcoming BlueOval City EV vehicle and battery manufacturing complex. The Project T3 will begin production at the West Tennessee plant in 2025.</p><div></div><p>Project T3 is a once-in-a-lifetime opportunity to revolutionize Americas truck. We are melding 100 years of Ford truck know-how with world-class electric vehicle, software, and aerodynamics talent. It will be a platform for endless innovation and capability, Ford CEO Jim Farley said in a statement. PJ ORourke once described American pickups as a back porch with an engine attached. Well, this new truck is going to be like the Millennium Falcon  with a back porch attached.</p><p>While no other details were given on Project T3s size or specs, Ford did say T3 stood for Trust The Truck  which the development team used as its single guiding principle to create a truck people can trust in the digital age  one thats fully updatable, constantly improving, and supports towing, hauling, exportable power Ford said.</p><figure>Ford\'s BlueOval City site - March 2023</figure><p>The T3 would be the first made from the ground up, pure electric platform that Ford will be using for a truck. The F-150 Lighting EV pickup uses a retrofitted current-generation F-150 pickup platform as its base.</p><p>Ford says when up and running, BlueOval city will employ 6,000 people and will able to produce 500,000 electric trucks a year. Ford and its battery partner SK On are investing $5.6 billion to develop the BlueOval City complex.</p><p>Costs associated with developing EV platforms and building EV and battery assembly plants are why Ford is projecting a $3 billion adjusted EBIT loss for this year in its Model e business unit, Ford said.</p><p>Ford shares on Thursday initially popped on the news of the business unit transformation, though the stock rolled over along with the broader market in late trading.</p><div></div><p>CFRAs Garrett Nelson shared his thoughts on Fords forecast of a big loss in its EV business this year, and the challenges it faces transitioning to pure EVs in a note to clients on Thursday.</p><p>"We think the disclosure from the U.S.\'s second best selling EV manufacturer reveals a couple of ugly industry truths: 1) we believe no U.S. automaker is making EVs profitably aside from Tesla and 2) EVs are likely to be a material drag on near- and intermediate-term earnings, Nelson wrote. Furthermore, with the U.S. EV market likely to become oversaturated in the near future given the number of new models coming to market, sales volumes could disappoint.</p><p>Nelson did say though that Ford reiterating 2023 guidance was a positive, and CFRA views Ford as better positioned than most, with generous dividends" another bonus for investors.</p>',
        tickers: ["F"],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/think-texas-cheaper-tax-burden-161359267.html",
        description:
            "<p>Much was made of the so-called tech exodus from California to lower-tax Texas during the COVID-19",
        image_url: "",
        added_utc: 1679680553.144928,
        source: "Yahoo",
        article_heading:
            "Think Texas has a cheaper tax burden than California? Think again.",
        article_body:
            '<p>Much was made of the so-called tech exodus from California to lower-tax Texas during the COVID-19 pandemic. But a new report finds it\'s not quite as good of a deal as many think.</p><p>Though Texas has no state-level personal income tax, it does levy relatively high consumption and property taxes on residents to make up the difference. Ultimately, it has a higher effective state and local tax rate for a median U.S. household at 12.73% than California\'s 8.97%, according to a new report from WalletHub.</p><p>"When people are like, \'Oh California is so much more expensive than Texas,\' thats the top income tax rate. Thats on people earning over $1 million," says Richard Auxier, senior policy associate in the Urban-Brookings Tax Policy Center. "If youre looking at average people, the income tax burden is never going to be that big. The systems were not designed that way." And Auxier points out there are often deductions and credits that help to lower income tax.</p><p>WalletHub\'s report calculated what the tax burden would be on the median income earner across the country. The report breaks it down by median income in the U.S. and the median income in each state. It also assumes the median earner owns a median-valued home, a car valued at $26,220, and spends "an amount equal to the spending of a household earning the median U.S. income," in order to calculate property tax, vehicle tax, and sales and excise tax burdens.</p><p>The typical Illinois family pays the most state and local taxes, according to the report, at 15.05% of their income. Connecticut, New York, Pennsylvania, and Kansas round out the top five states with the highest effective state and local tax rates for the median resident.</p><p>Meanwhile, Alaska residents pay the least in state and local taxes, percentage-wise, with 6.05% of their income going toward that tax burden. Delaware, Montana, Nevada, and Wyoming are also on the lower end.</p><p>View this interactive chart on Fortune.com</p><p>Of the nine states without a state income tax, five have higher effective state and local tax rates on the median income than California according to WalletHub\'s calculation, including New Hampshire, South Dakota, Tennessee, Texas, and Washington.</p><h2>\'Taxes are inherently difficult to suss out\'</h2><p>Of course, WalletHub\'s calculations aren\'t perfect. There are any number of ways to measure tax burdens, and they will vary significantly from person to person and household to household. WalletHub\'s calculations offer one perspective, but every study omits some variables that will make a difference.</p><p>"Taxes are inherently difficult to suss out because they are inherently personal," says Auxier. Family size, marital status, home ownership, age, number of childrenthere are tons of factors that affect any person\'s actual tax burden.</p><p>Property taxes are especially complicated to calculate. Not everyone owns a home, to start. And property taxes vary widely, even within the same state, depending on when a person bought their home.</p><p>In fact, using U.S. median prices, especially home prices, in every state as WalletHub\'s report does is misleading, says Jared Walczak, vice president of state projects at the Tax Foundation. While California\'s property tax rates are low, its home values are much higher than the national median figure used for the calculations. When comparing effective rates with state-adjusted figures, Walczak says California and Texas actually end up having fairly similar tax burdens: Texas at 11.8%, and California at 11.4%.</p><p>"California has genuinely low property tax rates, period," says Walczak. "But when you look at that and say California\'s effective rates are half of Texas\'s, it doesn\'t take into account that property costs in California are more than double Texass."</p><p>Whether you have a children also makes a huge difference in your tax burden.</p><p>"If you earn $50,000, a single person has a higher tax burden than a married couple with three children earning $50,000," says Auxier. "Theres so much variance within these averages."</p><p>WalletHub\'s report does put some things into perspective: While many people would point to states without a state income tax as "low tax," it\'s largely people on the upper end of the income spectrum who get the most out of it.</p><p>California, New York, and DC have programs like the Earned Income Tax Credit "which, literally send money to low and middle income tax people," says Auxier. "States like Texas don\'t have that."</p><p>Still, the report can provide one snapshot of different tax burdens.</p><p>"It does make sense to think of this holistically, to think about your income, sales, and excise tax together," says Walczak. "But you need to take state-by-state differences in costs into account."</p><p>This story was originally featured on Fortune.com</p><p>More from Fortune:</p><ul><li>5 side hustles where you may earn over $20,000 per yearall while working from home</li><li>Expert advice to keep your money safe during bank failures</li><li>UFB Direct savings account is offering an APY above 5%and with no fees</li><li>This is how much money you need to earn annually to comfortably buy a $600,000 home </li></ul>',
        tickers: [],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/the-fed-gave-stocks-a-reprieve-but-the-all-clear-is-a-ways-off-morning-brief-093016419.html",
        description:
            "<p>This article first appeared in the Morning Brief. Get the Morning Brief sent directly to your inb",
        image_url: "",
        added_utc: 1679680554.293055,
        source: "Yahoo",
        article_heading:
            "The Fed gave stocks a reprieve, but the all-clear is a ways off: Morning Brief",
        article_body:
            "<p>This article first appeared in the Morning Brief. Get the Morning Brief sent directly to your inbox every Monday to Friday by 6:30 a.m. ET. Subscribe</p><p>Friday, March 24, 2023</p><p>Today's newsletter is by Jared Blikre, a reporter focused on the markets on Yahoo Finance. Follow him on Twitter @SPYJared. Read this and more market news on the go with the Yahoo Finance App.</p><div></div><p>Stocks partially clawed back Wednesday's post-Fed losses on Thurday, with the Nasdaq Composite (^IXIC) notching a gain of of 1.0%, while the Russell 2000 (^RUT) settled in the red, down 0.4%.</p><p>On the one hand, investors are weighing Powell's hawkish, inflation-fighting comments. On the other, they're weighing signs that the Fed is de facto entering wait-and-see mode  believing its work is nearly done.</p><p>While Powell said the Fed may still have to raise rates further, he came clear saying the Committee was inches away from a no-hike decision on Wednesday.</p><p>\"[W]e did consider [a pause] in the days running up to the meeting,\" he said.</p><p>This is the closest yet the Fed has come to a change in its uber-hawkish tone since it began its breakneck pace of rate hikes one year ago.</p><p>But don't call it a \"pivot,\" and don't sound the all-clear for investors just yet.</p><p>The major U.S. indices have been in rally mode since the Fed created a new liquidity facility a week ago last Monday to backstop regional banks. Tech stocks have been the biggest beneficiary, with the Nasdaq 100 (^NDX) up 7.6%.</p><figure>Nasdaq 100 Components  9-Day Returns</figure><p>Long-term rates crashed over these nine trading sessions, which fueled rallies in megacaps like Amazon (AMZN), Microsoft (MSFT), Tesla (TSLA), Alphabet (GOOGL, GOOG), and Meta (META)  which all rallied double-digits. Chipmakers Nvidia (NVDA) and Advanced Micro Devices (AMD) led the way  up 19% and 23%, respectively.</p><p>Yet the rally was not broad-based. Not surprisingly, financials suffered additional damage from the bank panic. The S&P 500 Select Financial SPDR Fund (XLF) erased the last of its pandemic gains Thursday. Meanwhile, the SPDR S&P Regional Bank ETF (KRE) sank to a new crisis low  the lowest level since November 2020.</p><p>Putting the narrow breadth of the latest rally aside for a minute, even the technicals on the tech trade are showing some cracks.</p><p>Zooming out on the Nasdaq 100 reveals it has been stuck in a giant trading range over the last year  roughly 10,500 to 13,000. And it is once again testing that upper bound, having failed there as recently as early February.</p><p>The catalyst of lower rates and a weaker dollar are also approaching some big levels, with the U.S. 10-year Treasury-note (^TNX) hugging the 3.4% level by the 2023 lows.</p><p>Even the greatest bellwether stock of all, Apple, is up against some tough technicals that suggest its rally may need a \"pause\" before rallying materially above $165.</p><figure>Apple (AAPL) has rallied to big, long-term levels of interest</figure><p>Without a fresh catalyst and narrative, investors chasing momentum and breakouts are more likely to be punished than rewarded.</p><p>In the meantime, Kenneth Rogoff, Maurits C. Boas chair of International Economics at Harvard University, has a message for investors who are betting on the banking crisis abating.</p><p>\"If we're looking at the world as a whole, I believe we're just experiencing the first wave of this, and there are more to come,\" said Rogoff on Yahoo Finance Live Thursday.</p><h2>What to Watch Today</h2><p>Economy</p><ul><li>Durable goods orders, February; S&P flash U.S. composite PMI</li></ul><p>Earnings</p><ul><li>Express (EXPR)</li></ul>",
        tickers: [
            "TSLA",
            "NVDA",
            "^NDX",
            "AMD",
            "^DJI",
            "^GSPC",
            "^IXIC",
            "GOOG",
            "GOOGL",
            "MSFT",
            "IWM",
            "AMZN",
            "SPY",
            "QQQ",
            "DIA",
            "^RUT",
            "META",
        ],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/stock-market-news-live-updates-march-24-2023-123438023.html",
        description:
            "<p>U.S. stocks pared losses in midday trading on Friday as markets cap off a bumpy week following th",
        image_url: "",
        added_utc: 1679680555.192966,
        source: "Yahoo",
        article_heading:
            "Stock market today: Stocks pare losses but still lower as bank-related fears percolate",
        article_body:
            '<p>U.S. stocks pared losses in midday trading on Friday as markets cap off a bumpy week following the Federal Reserve\'s interest rate decision on Wednesday and further pressure in the banking sector.</p><p>The S&P 500 (^GSPC), which fell as much as 1% in early Friday trading, the most in a week, recovered most losses by mid-afternoon, down just 0.1%. The Dow Jones Industrial Average (^DJI) lost about 35 points, or 0.1%, as of 12 p.m. ET, while the technology-heavy Nasdaq Composite (^IXIC) declined the most in mid-afternoon trading, falling roughly 0.25%.</p><div></div><p>WTI crude oil (CL=F), which was down 3% in earlier trading, pared losses by 2% to trade closer to $69 a barrel, but remained near its lowest level in nearly two years. Brent crude (BZ=F) dipped more than 2% to just around $75 a barrel.</p><p>The pressure in oil comes after Energy Secretary Jennifer Granholm told lawmakers on Thursday refilling the country\'s Strategic Petroleum Reserve (SPR) may take several years and that it will be "difficult" to utilize the current decline in oil prices.</p><p>U.S. government bond yields extended losses by mid-afternoon with the benchmark 10-year Treasury yield falling about 120 basis points to trade near 3.36%.</p><div></div><p>On Wednesday, the Fed raised rates by a 25 basis points, bringing the range for the fed funds rate to 4.75%-5%, the highest since October 2007, in addition to suggesting its aggressive rate hiking campaign to quell inflation was winding down.</p><p>"The Committee anticipates that some additional policy firming may be appropriate in order to attain a stance of monetary policy that is sufficiently restrictive to return inflation to 2% over time," the Fed said in its policy statement, doing away with language for "ongoing rate increases" in interest rates.</p><p>Stocks ended Thursday\'s volatile trading session higher as investors digested the Fed\'s latest move.</p><p>"Powell stuck with the Fed\'s narrative that there is still a path toward a soft-landing or returning inflation to target without pushing the economy into a recession," wrote Ryan Sweet, Chief U.S. economist at Oxford Economics, in a note on Wednesday. "However, that path has become narrower because of the pressure on the banking system."</p><p>On Friday, St. Louis Fed President James Bullard raised his 2023 interest rate projection to 5.625%. This would outpace the Fed\'s latest "dot plot" projections, which suggest rates will continue to tick higher in 2023, but only slightly, with benchmark interest rates seen peaking at 5.1% this year, on par with the Fed\'s previous December projection.</p><figure>Stocks ended Thursday\'s volatile trading session higher as investors digested the Fed\'s latest move</figure><p>Bank sentiment soured on Friday as investor concerns surrounding financial stability remain heightened following the stunning collapse of Silicon Valley Bank, which trigged a ripple effect across the entire financial system.</p><p>Big bank stocks like Bank of America (BAC), JPMorgan Chase (JPM), Wells Fargo (WFC), Citigroup (C), and Goldman Sachs (GS) continued to trade to the downside.</p><p>Regional bank stocks including First Republic Bank (FRC), PacWest Bancorp (PACW), Western Alliance Bancorporation (WAL), and Regions Financial (RF) waffled in midday trading, but mostly recovered from steeper losses earlier in the day.</p><p>Shares of European bank operators Deutsche Bank (DB) and UBS (UBS) also pared losses, but were still down 3% and 2.5%, respectively, as Euro banks continue to feel the aftermath of Credit Suisse\'s downfall. </p><p>According to Reuters, Deutsche Bank\'s credit default swaps, a form of insurance against default, jumped to a four-year high, adding to greater stability concerns overseas.</p><p>However, analysts appeared calm on Friday: "We have no concerns about Deutsches viability or asset marks. To be crystal clear - Deutsche is NOT the next Credit Suisse," Stuart Graham and Leona Li, strategists at Autonomous, a subsidiary of AllianceBernstein, wrote in a new research note.</p><p>Treasury Secretary Janet Yellen announced on Friday she will convene with members of the Financial Stability Oversight Council for a previously unscheduled meeting in an effort to calm banking sector jitters.</p><div>This content is not available due to your privacy preferences.Update your settings here to see it.</div><p>Block (SQ) fell another 3% in mid-afternoon trading on Friday, after falling 15% on Thursday, as Wall Street continued to sift through a new piece of short-seller research out of Hindenburg.</p><p>Hindenburg Research levied accusations of fraud against the company, which was founded and led by billionaire Jack Dorsey. In response, Block said it intended to work with the SEC to "explore legal action against Hindenburg Research for the factually inaccurate and misleading report they shared about our Cash App business today."</p><p>"We had hoped Block\'s response/refutation would be more detailed and believe \'exploring legal action\' will likely not be enough to settle investors\' concerns," Citi analyst Peter Christiansen wrote in reaction to the Hindenburg report, echoing shareholder sentiment.</p><p>Coinbase (COIN) bounced back on Friday, with shares up about 3%, after slumping 14% on Thursday following the company\'s disclosure it received a Wells Notice from the SEC, which warns companies of pending action from the regulator.</p><p>Netflix (NFLX), which led the S&P 500 on Thursday with the stock surging more than 9%, saw shares settle in early trading on Friday, up about 2%.</p><p>Activision Blizzard (ATVI) climbed 6.7% at the open, the most since January 2022, after European Union regulators said on Friday it was narrowing the scope of its probe into Microsoft\'s planned $75 billion takeover of the video game developer. By 12 p.m. ET, the stock was still up, climbing roughly 5.5%.</p><p>Shares of Silvergate Capital Corporation (SI) soared more than 60% on elevated trading volume. The move represents the highest intraday jump since February 2.</p><p>Alexandra is a Senior Reporter at Yahoo Finance. Follow her on Twitter @alliecanal8193 and email her at alexandra.canal@yahoofinance.com</p><p>Click here for the latest stock market news and in-depth analysis, including events that move stocks</p>',
        tickers: ["BAC", "^IXIC", "^GSPC", "^DJI"],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/nvidia-ceo-were-seeing-an-acceleration-in-demand-because-of-generative-ai-143741028.html",
        description:
            "<p>While the broader tech industry continues to deal with declining sales and slowing consumer deman",
        image_url: "",
        added_utc: 1679680556.0786932,
        source: "Yahoo",
        article_heading:
            "Nvidia CEO: 'We're seeing an acceleration in demand... because of generative AI'",
        article_body:
            "<p>While the broader tech industry continues to deal with declining sales and slowing consumer demand, graphics giant Nvidia (NVDA) is going in the opposite direction.</p><p>According to founder and CEO Jensen Huang, the company is seeing demand for its platforms increase as customers seek to get in on the explosion in artificial intelligence.</p><div></div><p>We are seeing an acceleration in demand, Huang told Yahoo Finance Live during an interview Wednesday. Were seeing an acceleration of demand for our DGX AI supercomputers. Were seeing an acceleration of demand for inference, because of generative AI.</p><p>Fresh off of delivering the keynote address at Nvidias GTC developer conference on Tuesday, Huang said that AI has reached an inflection point where the technology is both accessible and easy to use. And the immense interest in OpenAIs ChatGPT has only pushed the interest in the technology further.</p><figure>Nvidia CEO Jensen Huang at the GTC developer conference. (Image: Nvidia)</figure><p>In just a couple of months, [ChatGPT] reached 100 million users, and the number of startups, the number of applications that youre now starting to see on generative AI is just growing extraordinarily, Juang said. So this is definitely the beginning of a new computing platform.</p><p>Nvidia has been banking on the growth of the AI industry for years, and its paid off handsomely for the company. The chip makers data center arm, which includes its AI efforts, grew from $2.98 billion in annual revenue in 2019 to $15 billion in 2022. The business now makes up the lions share of Nvidias sales, supplanting its gaming division, which served as the firms breadwinner for years.</p><div></div><p>Over the past 12 months, Nvidias stock price has easily outpaced its industry peers. While shares are only up 2.5%, the company is well ahead of the broader S&P 500, down 12.7%; AMD (AMD), off 14.9%; and Intel (INTC), which has dropped 41.8%.</p><figure>Sign up for Yahoo Finance's tech newsletter.</figure><p>While Nvidia is riding high on AI growth, Huang said that the company also offers an opportunity for its customers to save cash at a time when companies are looking to reduce their spending.</p><p>Everybody wants to do more, but they have to find a way to do it with less, Huang said. Accelerated computing is really the best path forward to do so. The ability to roll up your sleeves and re-factor your software...and once you re-factor that software, you could save extraordinary amounts of money.</p><p>The use of GPUs, Huang added, could help companies cut down on the amount of power they need compared to CPUs, allowing them to both save on computing and lower their carbon footprint.</p><p>With the use of AI only expanding further into various industries, Nvidia and its ilk appear to be well positioned moving forward.</p><p>Got a tip? Email Daniel Howley at dhowley@yahoofinance.com. Follow him on Twitter at @DanielHowley.</p><p>Click here for the latest stock market news and in-depth analysis, including events that move stocks</p>",
        tickers: ["NVDA", "AMD", "INTC"],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/treasury-bills-popularity-booming-fed-191025440.html",
        description:
            "<p>In its second meeting of the year, the Federal Open Market Committee (FOMC) raised the federal fu",
        image_url: "",
        added_utc: 1679680556.8292532,
        source: "Yahoo",
        article_heading:
            "Treasury bills\u2019 popularity is booming after the Fed raised rates. Here\u2019s what you need to know, and how to buy them",
        article_body:
            '<p>In its second meeting of the year, the Federal Open Market Committee (FOMC) raised the federal funds rate by 25 basis points, marking one year of consistent rate increases.</p><p>This most recent announcement sent investors into a frenzy, with many panic-selling their investments to avoid incurring fed-induced losses. For investors who cant stomach the roller coaster that is investing in the stock market in a high-inflation environment, theyre turning to safe haven assets like treasury billsand it may pay off in the short-term.</p><h2>Investors may be able to generate \'attractive returns\' as rates continue to rise </h2><p>Treasury bills, sometimes referred to as T-bills, are short-term securities issued by the U.S. treasury that are backed by the U.S. government with terms ranging from four weeks to 52 weeks.</p><p>For the duration of your term, youre agreeing to lend the U.S. government money in the form of this bill, which is usually sold in increments of $100. When your treasury bill reaches maturity at the end of your term, youll get your money backplus interest. And, unlike other savings vehicles like certificates of deposit (CDs), you can sell a treasury bill before it matures. For savers who value liquidity, this could be a key selling point.</p><p>T-bills are sold at face value or at a discount. And once they mature, you get the face value in return. The difference between the face value and the discounted price you initially paid is "interest." That discount represents the rate of return you can expect once your T-bill reaches maturity.</p><p>Say a $1,000 52-week (one-year) bill sells for a discount rate of 0.04%. To see what the purchase price will be for a particular discount rate, use the formula:</p><p>Price = Face value (1  (discount rate x time)/360)</p><p>In this example it would be: Price = 1000 (1-(.04 x 365)/360</p><p>Giving us $959.44</p><p>In this example, the bill sells for $959.44, giving you a discount of $40.56. So when you get $1,000 after a year, you have earned $40.56 in "interest."</p><p>"T-Bills are an attractive option for investors today because their yields are higher than longer Treasuries that have maturities ranging from 2 to 30 years. Depending on the length of the T-Bill investors can get yields approaching 5%, says Kevin Nicholson, Global CIO of Fixed Income at RiverFront Investment Group. For example, a 6-month T-Bill is currently yielding 4.75% while the 10-year Treasury is yielding 3.47%. Therefore, investors do not have to tie up their money for a long period of time to get an attractive return.</p><h2>How to invest in T-bills and what to consider before you do </h2><p>You can invest in treasury bills directly from the U.S. government via the TreasuryDirect portal, although treasury bills can also be purchased and sold through your bank or brokerage.</p><p>Experts say there are a few considerations you should make before taking the leap.</p><ul><li>Rising interest rates: The Feds recent interest rate increase likely wont be the last, which could influence the T-bill term you select. Investors should consider their interest rate expectations over the next year given that the Fed has raised interest rates to fight inflation, says Nicholson. Investors must weigh the possibility of facing reinvestment risk, that is the potential that yields could be lower when the T-Bill matures, especially if they choose to invest in shorter maturity T-Bills as a substitute for long maturing treasuries today.</li><li>Youll still owe (some) taxes: T-bills are exempt from state and local taxes, although they are still subject to taxes at the federal level.</li><li>T-bills wont reward you with regular interest payments: If youre looking for a pick-me-up in the form of a regular interest payment, T-bills arent for you. Because T-bills are short-term investments, you wont receive frequent interest payments the way you would with a bond or high-yield savings account.</li></ul><h2>The takeaway</h2><p>If youre new to investing, or simply looking for a low-risk way to grow your money in a volatile market, you might consider buying treasury bills. Although, its important to make sure that you understand how they work, how much you stand to gain at maturity, and determine whether this type of investment fits into your investment strategy.</p><p>This story was originally featured on Fortune.com</p><p>More from Fortune:</p><ul><li>5 side hustles where you may earn over $20,000 per yearall while working from home</li><li>Expert advice to keep your money safe during bank failures</li><li>UFB Direct savings account is offering an APY above 5%and with no fees</li><li>This is how much money you need to earn annually to comfortably buy a $600,000 home </li></ul>',
        tickers: [],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/goldman-sachs-should-it-be-punished-for-its-role-in-the-silicon-valley-bank-debacle-140455869.html",
        description:
            "<p>We journalists usually write articles about how problems like how the collapse of Silicon Valley ",
        image_url: "",
        added_utc: 1679680558.554267,
        source: "Yahoo",
        article_heading:
            "Goldman Sachs: Should it be punished for its role in the Silicon Valley Bank debacle?",
        article_body:
            "<p>We journalists usually write articles about how problems like how the collapse of Silicon Valley Bank (SVB) happened. But because so much has been written about SVB since it became the second-biggest bank failure in U.S. history two weeks ago, Id like to depart from form.</p><p>Instead of chewing over the SVBs collapse, Id like to make some suggestions that I think could help forestall future SVB-like problems by instilling in Wall Street the fear of making unseemly profits on the financial distress of others.</p><div></div><p>As part of this, Id like to suggest a non-traditional and constructive approach for our political leaders to take during public hearings next week examining the role that Goldman Sachs (GS) played in the collapse of SVB. Theres no date set for those hearings, but you can be sure that well have them.</p><p>Rather than use the upcoming U.S. Senate Banking Committee hearings to posture and make speeches, which are Congressional specialties, it would be great if the people running the show use them to extract the information from Goldman that will allow us to figure out how much money Goldman made by buying $24 billion of securities from SVB at a below-market price.</p><p>And then to demand that Goldman turn over that profit to the federal government as compensation for the financial damage caused by SVBs collapse and the subsequent aftereffects.</p><p>You can be sure that if that happened, Wall Street firms would hesitate before taking massive advantage of Main Street firms that are in financial distress and in need of financing and good advice, as SVB was.</p><p>Heres the deal, based on my reading of documents, conversations with knowledgeable people who declined to talk on the record and more than 50 years of parsing numbers and explaining them in what I call a language approaching English.</p><p>SVB, which had foolishly loaded its balance sheet with long-term federal government securities yielding less than 2% back when interest rates were mega-low, needed to convert those securities to cash to try to avoid a credit downgrade from Moodys and to raise cash to pay off depositors who were starting to take their money out of the bank.</p><p>On Mar. 8, SVB ended up getting about $21.5 billion from Goldman for securities that were valued at about $24 billion on its books. The bank took a $2.5 billion loss on the sale. But it painted the most optimistic picture of the deal, stressing that its loss was $1.8 billion after taxes, a number that you see a lot, rather than $2.5 billion, a number that you rarely if ever see.</p><p>The securities were selling for less than SVB paid for them because their average yield was fixed at a pathetic 1.79% and the yield on 10-year Treasury securities was about 3.8%. This meant that SVBs 1.79% securities were valued in the financial markets at less than face value.</p><figure>Did Goldman Sachs dole out bad advice to Silicon Valley Bank? And if so, profit from it? A Goldman exec at the firm's investor day in NYC in February. REUTERS/Brendan McDermid</figure><p>However, because of bookkeeping rules, SVB was carrying its portfolio of so-called available for sale securities at cost, not at their market value. Thats why the $1.8 billion loss that SVB announced on the sale of the securities to Goldman came as a shock to SVB depositors and was a key element in starting a massive deposit outflow that caused the FDIC to take over the bank.</p><p>That takeover, combined with the failure of Silvergate Bank and Signature Bank, both of which specialized in what I call craptocurrency (and most people call cryptocurrency), threatened to turn into a total financial panic. That prompted the federal government to say that all deposits in three banks were fully guaranteed, not just those up to the $250,000 limit.</p><p>Goldman profited in two ways from its purchase of SVBs securities.</p><p>First, because it was one of the few buyers capable of cutting a check of $21.5 billion in an overnight transaction, it got to buy the $24 billion of securities for less than their market price because it was dealing with a desperate seller that was in a big hurry.</p><p>Its not clear how big that discount was. The number that emanates from Goldman is 0.26%which works out to something in the $50 million to $60 million range. If the right questions get asked by lawmakers, well be able to get the right number.</p><p>Now, for the second source of profit. With interest rates falling as the result of the turmoil in financial markets, the market prices of the securities Goldman bought from SVB rose. Goldmans intention was to sell most (if not all) of the SVB securities as quickly as possible, but we dont know how many of those securities it sold or at what prices. Again, if the right questions are asked, we can find out Goldmans profit on that part of the deal, too.</p><p>Then theres a whole other, complicated question of whether it was SVBs managers or Goldman that screwed up the timing and that precipitated the announcement of the $1.8 billion loss before Goldman had lined up buyers for $2.25 billion of new SVB stock. That announcement touched off the bank run that led the FDIC and the state of California to close SVB.</p><p>We need to know if SVB came to Goldman saying that it wanted to sell it the assets for sale and to also raise new capital to offset its losses, or whether Goldman suggested the securities sale and capital raising as a package deal.</p><figure>Customers line up outside of the Silicon Valley Bank headquarters, waiting to speak with representatives, in Santa Clara, California, U.S., March 13, 2023. REUTERS/Brittany Hosea-Small</figure><p>Why does this matter? Because if SVB had raised the $2.25 billion of capital that it was seeking before it did the asset sale and announced its $1.8 billion after-tax loss, depositors would have had nothing to be frightened about and wed probably be talking about SVB in the current tense, not the past tense.</p><p>But announcing the loss, combined with SVB CEO Greg Becker announcing that the bank was seeking to sell $2.25 billion of new stock and urging the banks depositors not to worry, made it impossible to raise the capital and doomed the bank.</p><p>If the timing of the asset sale and the failed capital sale is SVB's fault, then we cant blame Goldman for SVBs collapse. However, if SVB came to Goldman for advice and Goldman advised it to sell assets and raise capital, then doing the asset sale and disclosing the loss before raising the capital is the fault of bad advice from Goldman.</p><p>It would be great if lawmakers use the upcoming hearings to find out how much the government should seek to claw back from Goldman on the money it made on the assets it purchased from SVB. It would be even greater if in addition to that, we could find out whether to blame Goldman or SVBs managers about the terrible timing of SVB announcing a big loss on the asset sale to Goldman before lining up investors to buy the $2.25 billion of new SVB stock the bank wanted to sell.</p><p>Will either of these things happen? It seems unlikelybut we can always hope.</p><p>Allan Sloan, who has written about business for more than 50 years, is a seven-time winner of the Gerald Loeb Award, business journalisms highest honor. Hes won Loebs in four different categories over four different decades.</p>",
        tickers: ["GS"],
    },
    {
        article_url:
            "https://finance.yahoo.com/news/this-week-in-bidenomics-hating-on-the-fed-162057836.html",
        description:
            "<p>President Biden promised to stay mum on the Federal Reserve, unlike his predecessor, Donald Trump",
        image_url: "",
        added_utc: 1679680559.368238,
        source: "Yahoo",
        article_heading: "This week in Bidenomics: Hating on the Fed",
        article_body:
            "<p>President Biden promised to stay mum on the Federal Reserve, unlike his predecessor, Donald Trump, who routinely hectored the Fed when he disagreed with its policies. Biden has stayed trued to his word.</p><p>But Bidens vow of silence doesnt apply to Fed critics who seem to be piling on as the Fed struggles with overheated inflation and, now, a banking crisis thats partly a result of its own policies. After the Fed raised interest rates by another quarter point on March 22, Bernard Baumohl of the Economic Outlook Group decried an act of folly by the Fed. In a sarcastic note to clients, Baumohl said, All they have managed to unleash with today's decision is to weaken employment conditions, push the nation closer to recession and place additional stress on the banking sector. Bravo!</p><div></div><p>Fed critics in Congress, mostly Democrats, charge the Fed with trying to put millions of Americans out of work as its main way to corral inflation. Committees in both the House and Senate will soon hold hearings on the early March failure of Silicon Valley Bank, which was the Feds responsibility to regulate. Through the twin challenges of inflation and bank instability, the Fed now holds the near-term fate of the U.S. economy in its polished hands, and with it Bidens political future.</p><p>Before the March 22 quarter-point hike, the Fed had already raised interest rates by 4.5 percentage points in 12 months, one of the fastest paces of monetary tightening ever. That contributed to the trouble at Silicon Valley Bank, or SVB, which held billions of dollars worth of securities purchased before the Fed started raising rates, with much lower interest rates than current bonds. When deposits dropped off, the bank had to sell those securities to cover the outflows, booking losses. That created a vortex in which depositors got worried and withdrew more money, SVB sold more securities locking in bigger losses, and the government finally had to seize the bank to stop the run and prevent contagion to other banks.</p><p>SVBs bankers should have hedged against the interest-rate shock, as many other banks did. But the Fed made their job harder by pushing rates up rapidly during the last year. And that came after the Fed was slow to recognize inflation taking root in the first place, forcing it to hike rates quickly, to catch up. The question now is how many other banks are trapped the way SVB was, and subject to deep losses if too many customers withdraw their money.</p><figure>U.S. Federal Reserve Board Chair Jerome Powell holds a news conference after the Fed raised interest rates by a quarter of a percentage point following a two-day meeting of the Federal Open Market Committee (FOMC) on interest rate policy in Washington, U.S., March 22, 2023. REUTERS/Leah Millis</figure><p>[Drop Rick Newman a note, follow him on Twitter, or sign up for his newsletter.]</p><p>Baumohl argues that the Fed could have simply paused for a brief spell, to stop tightening the screws on vulnerable banks. Another hike only adds to the stress of regional banks, he wrote. It would not have been catastrophic if the Fed had simply paused this one time to allow banks a breather. A brief halt in the interest rate cycle would not have detonated a hyper-inflationary environment.</p><p>Some economists disagree, and think the Fed needs to keep the pressure on inflation. Economist Michael Strain of the conservative American Enterprise Institute argues that significant market events should not knock the Fed off course, and it should keep hiking until inflation abates.</p><p>The Fed may also be able to gauge the level of (in)stability in the regional banking sector, through data it monitors, such as the amount of emergency borrowing from Fed accounts by banks that might be in trouble. That type of activity moderated recently, after a worrisome spike in the immediate aftermath of SBVs failure. So the Fed may have had an inside peek at reassuring data before it hiked on March 22.</p><p>At the same time, there are signs inflation, still too high at 6%, is headed lower. Supply chains are nearly back to normal, after three years of COVID-related disruption. Shipping costs are falling, and wholesale prices declined from January to February. Year-over-year energy inflation will soon turn negative, since current prices will almost certainly be lower than year-ago levels that were driven higher by Russias invasion of Ukraine.</p><p>A key uncertainty is the the lag time between inflationary or deflationary forces, and their impact on the real economy. New research, for instance, suggests supply-chain snafus from 2020 through 2022 are still causing excessive inflation, because producers havent yet lowered the prices they charge, even though their own costs have declined. It can also take a year or more for Fed interest-rate hikes to slow economic growth and lower inflation, as the Fed wants. That means it is possible the Fed has already done enough, and may even have overshot, making a recession more likely.</p><p>Biden has been notably quiet about all of this. On March 13, he insisted the banking system is stable, but otherwise hes left most of the talking to deputies such as Treasury Secretary Janet Yellen, who adjusts her remarks as needed to settle financial markets. Stocks and bonds have gyrated anyway, with investors unsure whether they should prepare for a crash or get in on a recovery.</p><p>Biden most certainly knows, however, that whats playing out now will directly affect his reelection odds, assuming he decides to run again. The timing could end up very good for him. If bank runs and over-tightening generate a recession, it will probably happen by the end of this year, which means a recovery could be gathering steam by the time voters are deciding who they prefer in 2024. If the Feds going to blow it, the sooner the better for Biden.</p><p>Rick Newman is a senior columnist for Yahoo Finance. Follow him on Twitter at @rickjnewman</p><p>Click here for politics news related to business and money</p>",
        tickers: [],
    },
];

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

const News = ({
    publisher_name,
    title,
    author,
    published_utc,
    article_url,
    tickers,
    image_url,
    description,
    id,
    history,
    likesRandom,
    isLoading,
}) => {
    const date = moment.unix(published_utc).toDate().toUTCString();

    const [num, setNum] = useState(0);
    const [tickersData, setTickersData] = useState([]);
    const { height, width } = useWindowDimensions();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [hover, setHover] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likeHover, setLikeHover] = useState(false);
    const [bookmarkHover, setBookmarkHover] = useState(false);
    const [uid, setUid] = useState("");
    const { fetchTickerPercentage } = useContext(ExploreStockNewsContext);

    useEffect(() => {
        async function func() {
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    setUid(user.uid);
                    await getBookmarked();
                }
            });
            await getLiked();
            await getTickers();
        }
        func();
    }, []);

    const getLiked = async () => {
        var likesCount = await firebase
            .firestore()
            .collection("likes")
            .where("id", "==", id)
            .get();
        setLikes(likesCount.size);

        if (uid) {
            var ref = db.collection("likes").doc(`${uid}-${id}`);
            var data = await ref.get();
            if (data.exists) {
                setLiked(true);
            }
        }
    };

    const getBookmarked = async () => {
        if (uid) {
            var ref = db.collection("bookmarks").doc(`${uid}-${id}`);
            var data = await ref.get();

            if (data.exists) {
                setBookmarked(true);
            }
        }
    };

    const getTickers = async () => {
        var tickersArray = [];
        var screenNum = 2;

        if (width >= 1024) {
            screenNum = 2;
        } else {
            screenNum = 1;
        }
        for (let i = 0; i < Math.min(screenNum, tickers.length); i++) {
            const per = await fetchTickerPercentage(tickers[i]);
            console.log("fetchTickerPercentage per", per);
            tickersArray.push({
                ticker: tickers[i],
                percentage: per,
            });
        }
        setNum(tickers.length > screenNum ? tickers.length - screenNum : 0);
        setTickersData(tickersArray);
    };

    const setTickers = async () => {
        var screenNum = 2;

        if (width >= 1024) {
            screenNum = 2;
        } else {
            screenNum = 1;
        }

        const arr = [];

        for (
            var ticker = 0;
            ticker < Math.min(screenNum, tickers.length);
            ticker++
        ) {
            const functionRef = firebase
                .app()
                .functions("us-central1")
                .httpsCallable("stockSnapshot");
            var tickerData = "";

            try {
                tickerData = await functionRef({
                    stockName: tickers[ticker],
                });
                tickerData["data"] = JSON.parse(tickerData.data);

                if (tickerData.day.o == 0) {
                    throw "error";
                }

                console.log("firebase", tickerData, tickers[ticker]);

                arr.push({
                    ticker: tickers[ticker],
                    percent: tickerData.data.ticker.todaysChangePerc.toFixed(2),
                });
            } catch (error) {
                console.log("firebase error snap", error, tickers[ticker]);

                const functionRef = firebase
                    .app()
                    .functions("us-central1")
                    .httpsCallable("lastDayClose");
                var lastDayClose = "";

                lastDayClose = await functionRef({
                    stockName: tickers[ticker],
                });
                lastDayClose["data"] = JSON.parse(lastDayClose.data);

                var data = {
                    Close: lastDayClose.data.results[0].c.toFixed(2),
                };

                // get open-close data for date before lastDayClose.data.results[0].t\
                // var days_behind = 1;
                var dayBefore = "";
                const functionRef2 = firebase
                    .app()
                    .functions("us-central1")
                    .httpsCallable("stockOpenClose");
                var dayBefore = "";
                dayBefore = await functionRef2({
                    stockName: tickers[ticker],
                    time: lastDayClose.data.results[0].t,
                });
                dayBefore["data"] = JSON.parse(dayBefore.data);

                data["Prev Close"] = dayBefore.data.close.toFixed(2);
                var percent = (
                    ((data.Close - data["Prev Close"]) / data["Prev Close"]) *
                    100
                ).toFixed(2);

                arr.push({
                    ticker: tickers[ticker],
                    percent: percent,
                });
            }
        }

        setNum(tickers.length > screenNum ? tickers.length - screenNum : 0);
        setTickersData(arr);
    };

    const likeHandle = async () => {
        var ref = db.collection("posts").doc(id);
        var doc = await ref.get();

        if (!doc.exists) {
            ref.set({
                id: id,
                article_url: article_url || "",
                author: author || "",
                image_url: image_url || "",
                tickers: tickers || "",
                description: description || "",
                publisher: publisher_name || "",
                title: title || "",
                published_utc: published_utc || "",
            });
        }
        if (liked) {
            db.collection("likes").doc(`${uid}-${id}`).delete();
            setLikes(likes - 1);
            setLiked(false);
        } else {
            console.log(id);
            db.collection("likes").doc(`${uid}-${id}`).set({
                user: uid,
                id: id,
            });
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    const bookmarkHandle = async (uidIn) => {
        console.log("UID");
        console.log(uidIn);
        var ref = db.collection("posts").doc(id);
        var doc = await ref.get();

        if (!doc.exists) {
            ref.set({
                id: id,
                article_url: article_url,
                author: author,
                image_url: image_url,
                tickers: tickers,
                description: description,
                publisher: publisher_name,
                title: title,
                published_utc: published_utc,
            });
        }
        if (bookmarked) {
            db.collection("bookmarks").doc(`${uidIn}-${id}`).delete();
            setBookmarked(false);
        } else {
            db.collection("bookmarks").doc(`${uidIn}-${id}`).set({
                user: uid,
                id: id,
            });
            setBookmarked(true);
        }
    };

    return (
        <div className="text-left relative justify-between">
            <div className="mb-4">
                <div className="flex justify-between">
                    <div className="flex gap-1 mb-2 pt-1">
                        <p className="text-xs text-gray-700">
                            {date.toString().split(" ")[1]}{" "}
                        </p>
                        <p className="text-xs text-gray-700">
                            {date.toString().split(" ")[2]},{" "}
                        </p>
                        <p className="text-xs text-gray-700">
                            {date.toString().split(" ")[3]}{" "}
                        </p>
                    </div>
                    <div className="mb-4 space-x-2 flex">
                        {!isLoading
                            ? tickersData.map((ticker3) => {
                                  return (
                                      <StockButton
                                          stock={ticker3.ticker}
                                          percent={parseFloat(
                                              ticker3.percentage
                                          )}
                                          key={ticker3.ticker}
                                          history={history}
                                      />
                                  );
                              })
                            : [...Array(2)].map((key, i) => {
                                  return (
                                      <div className="rounded-md w-16 h-6 mx-auto">
                                          <div className="animate-pulse w-full h-full space-x-4">
                                              <div className="bg-gray-300 w-full h-full mb-2 rounded"></div>
                                          </div>
                                      </div>
                                  );
                              })}
                        {num === 0 ? <></> : <AddButton num={num} />}
                    </div>
                </div>
                <div
                // className="cursor-pointer"
                // onClick={() => {
                //     window.open(article_url);
                // }}
                >
                    <div className="relative h-0 pb-2/3 mb-2 w-full h-full">
                        <img
                            className="absolute inset-0 object-cover rounded-lg object-contain w-full h-full"
                            src={image_url}
                            alt={title}
                        />
                    </div>

                    <div>
                        <Link to={`news/${id}`}>
                            <h1 className="text-lg md:text-xl lg:text-2xl mb-2 font-bold font-sourceSansPro">
                                {title}
                            </h1>

                            <div>
                                <p className="text-sm text-gray-500 line-clamp-3">
                                    ({publisher_name}) --{" "}
                                    {description.replace("<p>", "")}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 cursor-pointer">
                <div
                    className="cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        likeHandle();
                    }}
                >
                    <div>
                        {liked ? (
                            <Favorite />
                        ) : (
                            <FavoriteBorderOutlined
                                sx={{ "&:hover": { color: "gray" } }}
                            />
                        )}
                        <span className="text-xs ml-1">
                            {likes + likesRandom}
                        </span>
                    </div>
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        bookmarkHandle(uid);
                    }}
                >
                    {bookmarked ? (
                        <Bookmark />
                    ) : (
                        <BookmarkBorderOutlined
                            sx={{ "&:hover": { color: "gray" } }}
                        />
                    )}
                </div>

                <div
                    className="cursor-pointer"
                    onMouseOver={() => {
                        setHover(true);
                    }}
                    onClick={(e) => {
                        window.open(
                            `https://twitter.com/intent/tweet?text=${article_url}`
                        );
                        e.stopPropagation();
                    }}
                >
                    <Twitter style={{ fill: "#1DA1F2" }} />
                </div>
            </div>
        </div>
    );
};

export default News;
