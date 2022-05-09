import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import LaunchPage from "./LaunchPage";

let rootContainer;

beforeEach(() => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);
});

afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
});

describe("App Component Testing", () => {
    it("Renders Hello World Title", () => {
        
          ReactDOM.render(<LaunchPage />, rootContainer);
        // assert that h1 contains Hello World
        const h1 = rootContainer.querySelector("h1");
        expect.
      });
});