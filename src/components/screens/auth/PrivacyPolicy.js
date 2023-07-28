import React from 'react'
import { useHistory, Link } from "react-router-dom";

function PrivacyPolicy() {
    let history = useHistory();
    return (
        <div>
            <div className="flex justify-center">
            <div
          className="items-center cursor-pointer mt-10"
          onClick={() => {
            history.push("/");
          }}
        >
                <img src="/arcafeed.png" alt="ARCAFEED" width={200} />
                </div>
            </div>
        <div className='font-roboto container mx-auto w-4/5'>

<h1 className='mt-16 font-extrabold text-center text-6xl'>Privacy Policy</h1>
<p className='mt-8'> Effective Date: <strong>15 JAN, 2022</strong></p>

<p className='mt-14'>At Arcafeed, we respect the privacy of the information you entrusted to us. </p>

{/* <!-- Section 1 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>I. Acknowledgement and Acceptance of Terms</h2>

<div className='mt-8'>The following privacy policy (“Privacy Policy”) explains how Arcafeed LLC collects, uses, and discloses your personal information when you or your computer interact with <a className='text-blue-600 underline' href="https://www.arcafeed.com"> www.arcafeed.com </a> This Privacy Policy applies to our website, mobile application, all other Arcafeed websites, advertising services, products, services or technologies (collectively as “Services”). By accessing our Website, you acknowledge and fully understand our Privacy Policy and freely consent to the information collection and use practices described in this Privacy Policy.</div>

{/* <!-- Section 2 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>II. Information Collection</h2>
<p className='mt-8'> Arcafeed collects certain information from and about its users three ways: directly from our Web Server logs, from the user, and with cookies.</p>

<p className='mt-8'>When you visit our Website, we may automatically log your IP address, computer operating system type,wser type,wser language, the websites you visited before visiting our Website, pages you viewed, how long you spent on a page, access times and information about your use of and actions on our Website. For example:</p>

<div className='pl-16'>-Our Website uses Google Ads’ free conversion tracking features on certain pages. If you contact us online, the destination page will have a code on it that will help us understand the path you took to arrive on that page.
</div>

<div className='pl-16'>-Our Website also uses Google Ads remarketing codes to log when users view specific pages or take specific actions on a website.</div>

<p className='mt-8'>We may collect personally identifiable information from you, such as names, email addresses, phone numbers, and demographic information, as well as other information you directly and voluntarily give us on our Website. For example:</p>

<div className='mt-8 pl-16'>-In order to use some features of this Website, users must first complete the registration form. During registration, users are required to give their contact information (name and e-mail address).</div>

<p className='mt-8'>We may log your information using “cookies.” Cookies are small data files that are automatically created by yourwser and stored on your hard drive when you use our Services. No personally identifiable information (e-mail address, name, etc.) is collected with the cookies that we set.</p>

{/* <!-- Section 3 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>III. Information Use</h2>

<p className='mt-8'>We use your information in multiple ways. As used in this policy, “using” and “processing” information may include using cookies on a computer, subjecting the information to statistical or other analysis and using or handling information in any way, including, but not limited to collecting, storing, evaluating, modifying, deleting, using, combining, disclosing and transferring information within our organization or among our affiliates within the United States or internationally.</p>

<p className='mt-8'>We use your information to operate, maintain, and improve our Website and Services.</p>

<p className='mt-8'>We use your information to administer the Website and analyze its usage for the purpose of serving our users, visitors and customers better.</p>

<p className='mt-8'>We use your information to provide targeted advertising.
</p>

<p className='mt-8'>We use your personally identifiable information, such as name and email, to contact users about the topics on our Website for which they have expressed interest, to enable users to retrieve lost passwords, and to provide customer service such as responses to comments and questions, support and administrative messages, and updates about our Services</p>

<p className='mt-8'>We use IP addresses to analyze trends, administer the Website, track user movement, and gatherad demographic information for aggregate use for reporting and sponsorship purposes. IP addresses are not linked to personally identifiable information.</p>

{/* <!-- Section 4 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>IV. Information Disclosure</h2>

<p className='mt-8'>We will not disclose personally identifiable information we collect from you to third parties without your permission except to the extent necessary including:</p>

<div className='mt-8 pl-16'>-To fulfill your requests for our Services;</div>

<div className='mt-8 pl-16'>-To enforce our legal rights and protect ourselves and our property against legal claims and from liability;
</div>

<div className='mt-8 pl-16'>-To use in marketing and advertising;</div>

<div className='mt-8 pl-16'>-To comply with court orders, subpoenas, lawful discovery requests or other legal or regulatory requirements, where permitted or required by law;</div>

<div className='mt-8 pl-16'>-To respond to legal process or comply with the law in connection with a merger, acquisition, or liquidation of the company.
</div>

<p className='mt-8'>We may share aggregated demographic information with our partners, sponsors, and donors. This is not linked to any personally identifiable information. We only share this information so that we can secure funding to continue providing Services at a reasonable price.</p>


{/* <!-- Section 5 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>V. Third Parties</h2>

<p className='mt-8'>The following third-party companies may use cookies and other technologies to collect, use, and disclose information from you when you interact with our Website and use our Services.</p>

<p className='mt-8'>Plaid. Arcafeed uses Plaid, to link the user’s stock portfolio to their Arcafeed account. Arcafeed will then use that data to personalize the user’s newsfeed. It is important to be familiar with <a className='text-blue-600 underline' href="https://plaid.com/legal/#end-user-privacy-policy"> Plaid's Privacy Policy. </a> Plaid may use cookies to remember if users have logged in while on our Website. This allows Website users to avoid logging in more than once, thereby saving time. Accepting cookies while on the Plaid site will not put the user at risk for marketing to other sites. For more insight on Plaid's use of data and cookies, you may read <a className='text-blue-600 underline' href="https://plaid.com/legal/"> Plaid's Privacy and Cookie Policy here. </a></p>

<p className='mt-8'>Stripe. For transaction purposes, Arcafeed uses Stripe as the payment processor. Stripe may use cookies for authentication, fraud prevention and detection, security, and functionality. For more insight on Stripe’s use of cookies, you may read <a className='text-blue-600 underline' href="https://stripe.com/privacy"> Stripe’s Privacy and Cookie Policy here.</a> Stripe uses the information they collect and processes your payment in compliance with <a className='text-blue-600 underline' href="https://stripe.com/privacy"> Stripe’s Privacy Policy.</a> </p>


{/* <!-- Section 6 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>VI. Links</h2>

<p className='mt-8'>This Website contains links to other sites. Please be aware that Plaid and Stripe do not claim any responsibility for the privacy practices of such other sites. We encourage our users to be aware when they leave our Website and to read the privacy statements of each and every website that collects personally identifiable information. This Privacy Policy applies solely to information collected by this Website.</p>


{/* <!-- Section 7 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>VII. Security</h2>

<p className='mt-8'>This Website takes every precaution to protect our users’ information, and we have security measures in place to protect the loss, misuse, and alteration of the information under our control.
</p>


{/* <!-- Section 8 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>VIII. Surveys</h2>

<p className='mt-8'>Occasionally, our site requests information from users via Web surveys. Participation in these surveys or contests is completely voluntary and the user therefore has a choice whether or not to disclose this information. Information requested may include demographic data (such as zip code and age), but nothing that can identify any individual person will be collected. Survey results will be used for purposes of monitoring or improving the use and satisfaction of this site. </p>


{/* <!-- Section 9 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>IX. Updates</h2>

<p className='mt-8'>We may also send the user Website and Services announcements and updates. Users are not able to unsubscribe from Website and Services announcements that contain important information about Website and Services. We communicate with users to provide requested services and to discuss issues relating to their accounts via e-mail or phone.</p>


{/* <!-- Section 10 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>X. Correction/Updating Personal Information</h2>

<p className='mt-8'>If a user's personally identifiable information changes (such as name or e-mail address), or if a user no longer desires our Services, we will endeavor to provide a way to correct, update, or remove that the personal data that was provided to us. Users can use the "My Personal Info" link from their homepage or they can e-mail our Help Desk to change, correct, or remove information.
</p>


{/* <!-- Section 11 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>XI. Choice/Opt-in</h2>

<p className='mt-8'>Our users are given the opportunity to "opt-in" to newsletters and site update e-mail messages. To unsubscribe from mailings, please see that section above. If you unsubscribe, we may still send you nonmarketing emails. Non-marketing emails include emails about your account and our business dealings with you. To unsubscribe from any updates, users can visit the "My Account” page.
</p>

<p className='mt-8'>You can remove and reject cookies from our Website, Plaid, and Stripe with yourwser settings. Differentwsers have different cookie settings. With Netscape, you can ask thewser to allow, warn you, or completely disable cookies. Internet Explorer has an additional feature where you can specify different settings for different security zones. You can choose to allow websites to create cookies for you in your “trusted sites” (like Plaid), to warn you before you create them in your local Intranet zone, and to give you an option to never allow them in a “restricted zone.” See the “Help” section of your particularwser for more information on working with cookies. </p>

<p className='mt-8'>If users opt to disable cookies, they will still be able to use our Website. However, they will not be able to use some functionality or post to the message boards. Users of our Website who refuse cookies assume all responsibility for any resulting loss of functionality of the Website.</p>


{/* <!-- Section 12 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>XII. Children</h2>

<p className='mt-8'>The Website is not intended for children under 13 years of age. Arcafeed does not knowingly collect personal information from children under 13.</p>


{/* <!-- Section 13 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>XIII. Notification of Changes</h2>

<p className='mt-8'>Arcafeed reserves the right to modify, alter, or update the Privacy Policy. If we decide to change our Privacy Policy, we will post those changes on our home page so our users are always aware of what information we collect, how we use it, and under what circumstances, if any, we disclose it. If at any point we decide to use personally identifiable information in a manner different from that stated at the time it was collected, we will notify users by e-mail. Users will have a choice as to whether or not we use their information in this different manner. We will use information in accordance with the privacy policy under which the information was collected. </p>


{/* <!-- Section 14 --> */}
<h2 className='mt-14 font-extrabold text-3xl'>XIV. How to Contact Us</h2>

<p className='mt-8 pb-20'>For any questions or concerns regarding this privacy policy, or any other questions, you may contact us by emailing <a className='text-blue-600 underline' href = "mailto:support@arcafeed.com">support@arcafeed.com</a> </p>


</div>
</div>
    )
}

export default PrivacyPolicy
