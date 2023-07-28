import React from 'react'
import { useHistory, Link } from "react-router-dom";

const Terms = () => {
    let history = useHistory();
    return (
        <div>
            <div className="flex justify-center mt-10">
            <div
          className="items-center cursor-pointer"
          onClick={() => {
            history.push("/");
          }}
        >
                <img src="/arcafeed.png" alt="ARCAFEED" width={200} />
                </div>
            </div>
        <div className='font-roboto container mx-auto w-4/5'>

<h1 className='mt-16 font-extrabold text-center text-6xl'>Terms of Service</h1>

<p className='mt-8'> Effective Date: <strong>15 JAN, 2022</strong></p>

<p className='mt-8'>These Terms of Service (“TOS”) reflect we, Arcafeed LLC, provide products and services to you and the laws that apply to our company. These Terms of Service govern your use of arcafeed.com (“Website”) and our mobile applications, all other Arcafeed websites, advertising services, products, services or technologies (collectively as “Services”). It is important to establish what you can expect from us and what we expect from you, as you access our Website and use our Services, so please read these TOS carefully. </p>

<p className='mt-8'>By clicking “I Agree” or accessing our Website or using any part of the Website, you agree to be legally bound by these TOS, as well as our Privacy Policy [hyperlink]. If you do not agree with these TOS and/or the Privacy Policy, you are prohibited from accessing this Website.</p>

{/* <!-- Section 1 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>I. Use of Services</h2>

{/* <!-- link to website” -->  */}
<p className='mt-8'>TRegistration. As a condition of using our Services, you are required to have an account with Arcafeed, select a password and username and provide other information about your identity and your investments. You agree to provide accurate, current and complete information and promptly update such information. You agree and understand that you are responsible for maintaining the confidentiality of your account with Arcafeed and related data.</p>

<p className='mt-8'>Financial News Services. Arcafeed provides you with financial news and stock tickers that are relevant to your investment portfolio. Arcafeed uses Plaid to link your stock portfolio to your Arcafeed Account and locates your own individualized information.
</p>

<p className='mt-8'>Paid Products. Arcafeed may offer you some paid products or services. If you choose to purchase any paid products or services, you are responsible for paying the applicable prices for each product or service. The prices for these products or services will be listed on our Website. We may change our prices from time to time by posting the changes on the Website. We may not offer advance notice for temporary promotions or either reduction or increase of prices. Our purchase process is powered by our third party payment processor, Stripe. The processing of payments will be subject to the term and conditions and privacy policies of the Stripe, in addition to these TOS.</p>

<p className='mt-8'>Refund Policy. Unless otherwise required by law, Arcafeed will not refund you any amounts that you pay for our products or services. You assume full responsibility for your decision to purchase any of our products or services.  Arcafeed will not refund you based on your allegation that your purchase is accidental, unintentional, or in any other ways against your will. </p>

{/* <!-- Section 2 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>II. Prohibited Conduct</h2>

<p className='mt-8'>In exchange for providing you our Services, we require that:</p>

<div className='mt-8 pl-16'>-You are not under the age 13 when you use our Services </div>

<div className='mt-8 pl-16'>-You will not violate any applicable local, state, national or international law, including, but not limited to, regulations promulgated by the U.S. Securities and Exchange Commission, or any rules of any national or other securities exchange</div>

<div className='mt-8 pl-16'>-You will not post, provide, or make available in any other ways materials that are obscene, lewd, lascivious, filthy, excessively violent, harassing, or otherwise objectionable</div>

<div className='mt-8 pl-16'>-You will not violate any applicable local, state or national law while using our Services, including but not limited to, rules and regulations promulgated under the Securities and Exchange Act of 1933 and 1934, rules and regulations promulgated by the Securities and Exchange Commission, or any other rules of any national or other securities exchange.</div>

{/* <!-- Section 3 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>III. Intellectual Property Rights</h2>

<p className='mt-8'>We grant you a limited, nonexclusive, non transferable, revocable license, subject to this TOS, to access and use our Website, Services, and related content, materials, information (collectively, the "Content") solely for your own personal use. Any other use of the Website, Services or Content is expressly prohibited and all other right, title, and interest in the Website, Services or Content is exclusively the property of Arcafeed and its licensors. You agree you will not aggregate, copy, transmit, distribute, sell, license, modify, publish, or participate in the transfer or sale of, create derivative works from, or in any other way exploit the Content, without the prior written consent of Arcafeed. You also agree that you will not use data mining, crawlers, robots, spiders, or similar data gathering and extraction tools for any purpose unless expressly permitted by Arcafeed in writing.</p>

{/* <!-- Section 4 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>IV.  DMCA Policy</h2>

<p className='mt-8'>Arcafeed respects the intellectual property rights of others and expects our users to do the same. Arcafeed may remove content that in its sole discretion appears to infringe intellectual property rights of others and may terminate the accounts of users who infringe the intellectual property rights of others. If you believe that your intellectual property rights have been infringed, please notify Arcafeed’s at:</p>

<div className='mt-8 pl-16'>Raunaq Mokha</div>
<div className='pl-16'>1 Windsong Way,</div>
<div className='pl-16'>Hopkinton, MA</div>
<div className='pl-16'>raunaq@arcafeed.com</div>

{/* <!-- Section 5 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>V. Third Parties</h2>

<p className='mt-8'>Our Website may provide access to other websites, apps, products or services provided by third-party providers. For example, as part of our Services, Arcafeed uses Plaid to link your stock portfolio to your Arcafeed Account and uses Stripe as the payment processor. We do not control, review, or endorse any third-party provider and any information or materials contained on any third-party provider’s website. You accept express liability for any and all consequences of accessing and using the services provided by third-party providers.</p>

{/* <!-- Section 6 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>VI. Advertising</h2>

<p className='mt-8'>Our Website may include advertisements provided by third parties. You agree that Arcafeed may place advertisements on our Website. Arcafeed disclaims any and all liability as a result of the illegality, error, inaccuracy or other problems’ in such third parties advertiser’s materials. You accept express liability for any and all consequences of clicking on the advertisement links.</p>

{/* <!-- Section 7 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>VII. Disclaimers and Limitation of Liability</h2>

<p className='mt-8'>provide any legal, financial or investment advice through providing our Services. Our Website and Services are intended for informational purposes only. Arcafeed makes no representations of warranties whatsoever about the nature, content, accuracy, or benefits, either when posted or as a result of the passage of time, of the information, content, materials or products included on the Website. 
</p>

<p className='mt-8'>We hereby disclaim all warranties, express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, title, and noninfringement. No oral advice or written information given by Arcafeed, nor its affiliates, nor any of their officers, directors, employees, agents, or any other related personnel, shall create a representation or warranty. In addition, we make no representations, warranties, or guarantees that this Website will be secure, accessible continuously and without interruption, or error-free.</p>

<p className='mt-8'>Arcafeed will not be liable for any consequential, incidental, punitive or special damages, including but not limited to any lost profits, revenues, business opportunities, or anticipated saving, as well as any personal injury or death, arising from the use of our Services and interaction with this Website. Our Website and Services may be temporarily unavailable from time to time for maintenance or other reasons and Arcafeed assumes no responsibility for any interruption and delay in the availability of our Website and Services to you.</p>

<p className='mt-8'>Because some states do not allow the exclusion or limitation of liability for consequential or incidental damages, in such states, liability is limited to the fullest extent permitted by law.</p>

<p className='mt-8'>In the event of any conflict between this section and other terms or provisions of these TOS, this section shall be construed to take precedence.</p>

{/* <!-- Section 8 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>Arbitration Agreement</h2>

<p className='mt-8'>You and Arcafeed agree that any controversy or claim arising out of or relating to these TOS, or the breach thereof, as well as the validity of this Arbitration Agreement provision, shall be settled by arbitration administered by the American Arbitration Association in accordance with its Rules. The arbitrator’s award will be binding and may be entered as a judgment in any court of competent jurisdiction.</p>

{/* <!-- Section 9 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>IX. Governing Law</h2>

<p className='mt-8'>Massachusetts law shall govern all disputes arising out of or relating to these TOS, our Website, and our Services, regardless of conflict of laws rules, provided that the Federal Arbitration Act shall govern the interpretation and enforcement of the Arbitration Agreement in the previous section. You and Arcafeed consent to personal jurisdictions of the courts located in Massachusetts.</p>

{/* <!-- Section 10 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>X. Modification</h2>

<p className='mt-8'>Arcafeed may amend or modify these TOS at any time by posting the revised TOS on the Website . The revised TOS shall be effective as of the time it is posted but will not apply retroactively. We will do our best to provide a copy of any revised TOS if we make any material amendment or modification to our TOS. By continuing to use our Services after an amendment or modification of these TOS, you agree to accept such revised TOS. If you do not agree with any such amendment and modification, your sole and exclusive remedy is to terminate your use of the Services and close your account.
</p>

{/* <!-- Section 11 --> */}
<h2 className='mt-16 font-extrabold text-3xl'>XI. Additional Assistance</h2>
{/* <!-- link to email -->  */}
<p className='mt-8 pb-20'>If you have any questions regarding these TOS, please contact us at <a className='text-blue-600 underline' href = "mailto:support@arcafeed.com">support@arcafeed.com</a> </p>


        </div>
        </div>
    )
}

export default Terms
