import React from 'react'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({comment, fetchComments}) => {

const {blog, createdAt, _id} = comment;
const BlogDate= new Date(createdAt);

const {axios} = useAppContext()

const approveComment = async () =>{
  try {
    const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
    if (data.success){
      toast.success(data.message)
      fetchComments()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const deleteComment = async () =>{
  try {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if(!confirm) return;

    const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
    if (data.success){
      toast.success(data.message)
      fetchComments()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

  return (
    <tr className='border-y border-gray-300'>
      <td className='py-4 px-6'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br />
        <br />
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br />
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
      </td>
  <td className='py-4 px-6 max-sm:hidden'> 
    {BlogDate.toDateString()}
  </td>
   <td className='py-4 px-6'>
    <div className="flex items-center gap-2 justify-center">
      {!comment.isApproved ? (
        <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="approve"/>
      ) : (
        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
      )}
      <img onClick={deleteComment} src={assets.bin_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="delete"/>
    </div>
  </td>
    </tr>
  )
}

export default CommentTableItem
