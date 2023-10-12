import { useState } from "react";
import PropTypes from "prop-types";
const creationForm = ({ CreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreation = (e) => {
    e.preventDefault();
    CreateBlog({
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
      <input value={title} onChange={({ target }) => setTitle(target.value)} />
      <br />
      author:{" "}
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
      <br />
      <button type='submit'>Create</button>
    </form>
  );
};
export default creationForm;
