'use client'

import React from 'react'
import Title from '../../components/Title'

const Faqs = () => {
    return (
      <section className="max-w-2xl mx-auto my-12 p-6 ">
        <Title heading="Frequently Asked Questions" />
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">
              1. Where can I buy fresh broiler chicken in Watamu?
            </h3>
            <p>
              You can order directly from Tapps Broilers Enterprise in
              Jiwe-leupe, Watamu. We supply both live and dressed broilers with
              home and business delivery options.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              2. Do you deliver broiler chicken to Malindi?
            </h3>
            <p>
              Yes. We deliver to Malindi, Watamu, and surrounding areas.
              Delivery is agreed upon at ordering, and we serve families,
              hotels, restaurants, and butcheries.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              3. How much does a broiler chicken cost in Watamu?
            </h3>
            <p>
              Our broilers cost KES 500 each, whether live or dressed. Prices
              are affordable and transparent, with no hidden charges.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">4. How do I place an order?</h3>
            <p>
              You can order through our Facebook page, website order form, or
              simply contact us via WhatsApp or phone (+254 769 751 566).
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              5. Is the chicken from Tapps Broilers hygienic and fresh?
            </h3>
            <p>
              Yes. All our broilers are farm-raised, hygienically handled, and
              delivered fresh from our farm to your table.
            </p>
          </div>
        </div>
      </section>
    )
}

export default Faqs
