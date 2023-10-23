import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const CreationForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
  const handleCreation = async (e) => {
    e.preventDefault();
    addBlogMutation.mutate({ title, author, url });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreation}>
      <h3>Create blog</h3>
      title:{" "}
      <input
        className='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:{" "}
      <input
        className='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:{" "}
      <input
        className='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type='submit' className='Create'>
        Create
      </button>
    </form>
  );
};
export default CreationForm;
