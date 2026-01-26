import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-3xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>
          <p className='text-gray-600'>54709 william station <br /> 350 root colony</p>
          <p className='text-gray-600'>Tel : 6394055817 <br />Email : vanubhav9293@gamil.com</p>
          <p className='font-semibold text-xl text-gray-600'>careers at forever</p>
          <p className='text-gray-600'>Learn more about our team and grow</p>
          <button className='hover:bg-black  hover:text-white transition ease-in px-8 py-3 text-sm border border-black'>Exprore jobs</button>
          
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default Contact
