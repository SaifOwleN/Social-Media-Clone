import React from "react";
import CreationForm from "./CreationForm";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("createform", async () => {
  const createBlog = jest.fn();

  const container = render(<CreationForm createBlog={createBlog} />).container;

  const title = container.querySelector(".title");
  const author = container.querySelector(".author");
  const url = container.querySelector(".url");
  fireEvent.change(title, {
    target: { value: "xddMOTS" },
  });
  fireEvent.change(author, {
    target: { value: "xddMOTS" },
  });
  fireEvent.change(url, {
    target: { value: "xddMOTS" },
  });
  const button = screen.getByText("Create");
  fireEvent.click(button);
  expect(createBlog.mock.calls).toHaveLength(1);
});
