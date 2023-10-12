import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false);
  const [user, setuser] = useState("");
  const [Blikes, setBlikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    const xddMOTS = async () => {
      if (blog.user) {
        const xddMOTS = await blogService.getUsers(blog.user);
        setuser(xddMOTS);
      }
    };
    xddMOTS();
  }, []);

  const addLike = async () => {
    const blogToUpdate = { ...blog, likes: Blikes + 1 };
    await blogService.incLikes(blogToUpdate, blog.id);
    const addi = Blikes + 1;
    setBlikes(addi);
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      const ID = blog.id;
      setBlogs(blogs.filter((blog) => blog.id != ID));
    }
  };

  const toggleVisibilty = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibilty}>show</button>
      </div>
      <div style={{ display: visible == false ? "none" : "" }}>
        <a href={blog.url}>{blog.url}</a> <br /> likes: {Blikes}{" "}
        <button onClick={addLike}>like</button> <br /> {user} <br />
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
