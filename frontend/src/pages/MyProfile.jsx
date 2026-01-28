import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useCallback } from 'react'
import Title from '../components/Title'

const MyProfile = () => {

  const { token, backendUrl } = useContext(ShopContext)
  const [profile, setProfile] = useState({})

  const myProfile = useCallback(async () => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+'/api/user/profile',{},{headers:{token}})
      console.log(response.data.user)
      setProfile(response.data.user)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  },[token, backendUrl])

  useEffect(() => {
    myProfile()
  },[myProfile]);

  return (
     <div className="border-t pt-10 px-6 md:px-20">

      <div className='text-3xl py-4 w-full flex justify-center'>
        <Title text1={'My'} text2={'Profile'}/>
      </div> 

      {/* PROFILE SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-start pt-5">

        {/* LEFT IMAGE */}
        <div className='flex justify-center items-center text-center'>
          <img
            src="https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg"
            alt="profile"
            className="w-[50%] lg:w-[40%] max-w-md rounded-md object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6 text-gray-700">

          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-md sm:text-sm text-gray-500">{profile.email}</p>
          </div>

          <p>
            Welcome to your profile dashboard. You can view your personal
            details, manage your orders, and track your shopping activity.
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Phone</p>
              <p>{profile.phone || 'Not Added'}</p>
            </div>

            <div>
              <p className="font-semibold">Joined On</p>
              <p>{new Date(profile.createdAt).toDateString()}</p>
            </div>
          </div>

        </div>
      </div>

      {/* WHY CHOOSE US STYLE SECTION */}
      <div className="mt-20">

        <h2 className="text-xl font-medium mb-8">
          WHY SHOP WITH <span className="font-bold">US</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border p-6">
            <h3 className="font-semibold mb-2">Quality Assurance</h3>
            <p className="text-sm text-gray-600">
              We ensure premium quality products with strict quality checks.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Quick and reliable delivery at your doorstep.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-sm text-gray-600">
              24/7 customer support for a smooth shopping experience.
            </p>
          </div>

        </div>
         </div>

    </div>
  )
}
 

export default MyProfile
