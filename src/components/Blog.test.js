import React from "react";
import Blog from "./Blog";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("testing rendering blog content and autor", () => {
  const blog = {
    title: "xddMOTS",
    author: "ahmedxdd",
    likes: 110,
    url: "www.dssdasadsad.com",
  };

  const container = render(<Blog blog={blog} />).container;
  const Found = container.querySelector(".TitleAndAuthor");
  const notFound = container.querySelector(".urlAndLikes");

  expect(Found).toHaveStyle("display: block");
  expect(notFound).toHaveStyle("display: none");
});

test("testing rendering blog content and autor", async () => {
  const blog = {
    title: "xddMOTS",
    author: "ahmedxdd",
    likes: 110,
    url: "www.dssdasadsad.com",
  };

  const container = render(<Blog blog={blog} />).container;

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  const notFound = container.querySelector(".urlAndLikes");

  expect(notFound).toHaveStyle("display: block");
});

test("testing like button ", async () => {
  const blog = {
    title: "xddMOTS",
    author: "ahmedxdd",
    likes: 0,
    url: "www.dssdasadsad.com",
  };

  const xddMOTS = jest.fn();

  render(<Blog blog={blog} addLike={xddMOTS} />);

  const button = screen.getByText("show");
  fireEvent.click(button);
  const button2 = screen.getByText("like");
  fireEvent.click(button2);
  fireEvent.click(button2);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
