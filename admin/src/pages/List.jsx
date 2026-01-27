import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])
  const [page,setPage] = useState(2)

  const fetchList = async (page=1) =>{
    try {

      const response = await axios.get(backendUrl + '/api/product/list?page='+page)
      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id)=>{
    try {
      
      const response = await axios.post(backendUrl+'/api/product/remove', {id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    console.log("object")
    fetchList(page)
  },[page])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* -------List Table Title ------ */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <img className='w-15' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>{removeProduct(item._id)}} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              
            </div>
          ))
        }
      </div>
    <div className='flex justify-center gap-2 mt-4'>
      <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1}
        className='px-4 py-2 bg-gray-300 disabled:opacity-50 cursor-pointer'
      >
        Previous
      </button>
      <p className='px-4 py-2'>{page}</p>
      <button 
        onClick={() => setPage(page + 1)}
        className='px-4 py-2 bg-gray-300 cursor-pointer'
      >
        Next
      </button>
    </div>
    </>
  )
}

export default List
