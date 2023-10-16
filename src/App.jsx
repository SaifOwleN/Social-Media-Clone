import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggleable from "./components/Toggelable";
import CreationForm from "./components/CreationForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.Token);
    }
  }, []);

  useEffect(() => {
    const Get = async () => {
      if (user != "") {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }
    };
    Get();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.Token);
    } catch (err) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setUser("");
  };

  const handleCreation = async (blogToAdd) => {
    try {
      const blog = await blogService.create(blogToAdd);
      setBlogs(blogs.concat(blog));
      setErrorMessage(`a new blog has been added: ${blog.author}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    } catch (err) {
      setErrorMessage(`an error has occured`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        username:{" "}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />{" "}
        <br />
        password:
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />{" "}
        <br />
        <button type='submit'>login</button>
      </form>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage}

      {user === "" ? (
        loginForm()
      ) : (
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
          <br />
          <Toggleable buttonLabel='add blog'>
            <CreationForm createBlog={handleCreation} />
          </Toggleable>
          <br />
          {blogs.sort(byLikes).map((blog) => (
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
