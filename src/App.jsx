import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("password", password);
    const user = await loginService.login({ username, password });
    setUser(user);
    console.log("user", user);
    setUsername("");
    setPassword("");
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
      {loginForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
