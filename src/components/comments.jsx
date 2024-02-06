import { useEffect, useState } from 'react'
import BlogService from '../services/blogs'
import { AiOutlineLike } from 'react-icons/ai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getUser } from '../util'
const Comments = ({ comment, id }) => {
  const [user, setUser] = useState('')
  const loggedUser = getUser()
  useEffect(() => {
    const fetchUser = async () => {
      if (comment.user) {
        const user = await BlogService.getUsers(comment.user)
        setUser(user)
      }
    }
    fetchUser()
  }, [])

  const queryClient = useQueryClient()

  const likeCommentMutation = useMutation({
    mutationFn: BlogService.likeComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const likeComment = () => {
    if (comment.likes.includes(loggedUser.id)) {
      const arrayLikes = comment.likes.filter((item) => item != loggedUser.id)
      const updatedComment = {
        ...comment,
        likes: arrayLikes,
      }
      likeCommentMutation.mutate({ id, comment: updatedComment })
    } else {
      const arrayLikes = comment.likes?.concat(loggedUser.id)
      const updatedComment = {
        ...comment,
        likes: arrayLikes,
      }
      likeCommentMutation.mutate({ id, comment: updatedComment })
    }
  }

  return (
    <li>
      <div className="flex items-center ">
        <label tabIndex={0} className=" w-10 avatar mt-2 ">
          <div className="rounded-full ">
            <img src={user.img} />
          </div>
        </label>
        <a className="p-2 font-inter font-semibold">{user.name}</a>
      </div>
      <div className="flex items-center">
        <p className="m-4 flex-1">{comment.content}</p>
        <button className="flex-col" onClick={likeComment}>
          <AiOutlineLike className="mx-2 text-lg" />
          <span className="mt-2 text-sm">{comment.likes?.length}</span>
        </button>
      </div>
    </li>
  )
}
export default Comments
