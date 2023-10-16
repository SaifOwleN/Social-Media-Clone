import { useState } from "react";
import PropTypes from "prop-types";
const CreationForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreation = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
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
