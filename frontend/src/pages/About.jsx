import React from 'react'
import Title from '../components/Title';
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className='w-full text-center text-3xl pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'PAGE'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquid. Eligendi, quas qui. Libero nobis, debitis quibusdam aperiam id doloribus tenetur exercitationem facilis accusantium consectetur illum cum asperiores itaque natus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui ipsa perferendis, id velit consequatur accusamus magni quis voluptatem deserunt aliquam delectus vitae? Officia praesentium et veritatis molestias, quod quibusdam.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, culpa, atque eius facere voluptates asperiores qui veniam repudiandae quam facilis laborum non quae recusandae esse, ab a repellendus aperiam cupiditate.</p>
        </div>
      </div>

      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border border-gray-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl'>Quality Assurance</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo omnis officiis iste quis, aut recusandae deleniti porro optio sint voluptatem.</p>
        </div>

        <div className='border border-gray-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl'>Convienience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo omnis officiis iste quis, aut recusandae deleniti porro optio sint voluptatem.</p>
        </div>

        <div className='border border-gray-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl'>Exception customer service</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo omnis officiis iste quis, aut recusandae deleniti porro optio sint voluptatem.</p>
        </div>

      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About
