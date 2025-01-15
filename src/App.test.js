import React from "react"; // Import act from React
import { fireEvent, render } from "@testing-library/react";
import App from "./App";

jest.mock("./Style.css", () => {});

describe("App rendering", () => {
  it("should be Region selected and deleted", async () => {
    const { getByTestId } = render(<App />);

    const region1 = getByTestId("region1");
    fireEvent.click(region1);

    const region2 = getByTestId("region2");
    fireEvent.click(region2);

    const deleteRegion = getByTestId("delete-region0");
    fireEvent.click(deleteRegion);

    const clearBtn = getByTestId("clear-button");
    fireEvent.click(clearBtn);
  });

  it("should be toggle", async () => {
    const { getByTestId } = render(<App />);

    const toggleBtn = getByTestId("toggle-button");
    fireEvent.click(toggleBtn);
  });

  it("should be input on change", async () => {
    const { getByTestId } = render(<App />);

    const input = getByTestId("input");

    fireEvent.change(input, { target: { value: "Brazil" } });
  });
  it("should be input on change", async () => {
    const { getByTestId } = render(<App />);

    const region1 = getByTestId("region1");
    fireEvent.click(region1);

    const input = getByTestId("input");

    fireEvent.change(input, { target: { value: "TEST" } });
  });

  it("should be onKeyDown", async () => {
    const { getByTestId } = render(<App />);

    const toggleBtn = getByTestId("toggle-button");
    fireEvent.click(toggleBtn);

    const region1 = getByTestId("region1");

    fireEvent.mouseEnter(region1);

    const keyDown = getByTestId("keyDown");

    fireEvent.keyDown(keyDown, { key: "ArrowDown" });
    fireEvent.keyDown(keyDown, { key: "ArrowUp" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
  });
  it("should be onKeyDown", async () => {
    const { getByTestId } = render(<App />);
    const toggleBtn = getByTestId("toggle-button");
    fireEvent.click(toggleBtn);
    const keyDown = getByTestId("keyDown");

    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
    fireEvent.keyDown(keyDown, { key: "Enter" });
  });

  it("should be onKeyDown", async () => {
    const { getByTestId } = render(<App />);
    const toggleBtn = getByTestId("toggle-button");
    fireEvent.click(toggleBtn);

    const keyDown = getByTestId("keyDown");

    fireEvent.keyDown(keyDown, { key: "ArrowDown" });
  });
});
