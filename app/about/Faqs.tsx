'use client'

import Title from '@/components/Title'
import React from 'react'

interface Faq {
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    question: 'Where can I buy fresh broiler chicken in Watamu?',
    answer:
      'You can order directly from Tapps Broilers Enterprise in Jiwe-leupe, Watamu. We supply both live and dressed broilers with home and business delivery options.',
  },
  {
    question: 'Do you deliver broiler chicken in watamu?',
    answer:
      'Yes. We deliver in, Watamu, and surrounding areas. Delivery is agreed upon at ordering, and we serve families, hotels, restaurants, and butcheries.',
  },
  {
    question: 'How much does a broiler chicken cost in Watamu?',
    answer:
      'Our broilers cost KES 500 each, whether live or dressed. Prices are affordable and transparent, with no hidden charges.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'You can order through our Facebook page, website order form, or simply contact us via WhatsApp or phone (+254 769 751 566).',
  },
  {
    question: 'Is the chicken from Tapps Broilers hygienic and fresh?',
    answer:
      'Yes. All our broilers are farm-raised, hygienically handled, and delivered fresh from our farm to your table.',
  },
]

const FaqSection: React.FC = () => (
  <section className="max-w-4xl mx-auto my-12 p-6 ">
    <Title heading={'Frequently Asked Questions'}/>
   
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3 className="font-semibold text-gray-900 mb-2">
            {index + 1}. {faq.question}
          </h3>
          <p className='text-gray-600'>{faq.answer}</p>
          <hr/>
        </div>
      ))}
    </div>
  </section>
)

export default FaqSection
