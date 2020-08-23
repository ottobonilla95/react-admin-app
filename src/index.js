import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux";

// Save a reference to the root element for reuse
const rootEl = document.getElementById("root");

// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require("./App").default;
  ReactDOM.render(
    <Provider store={configureStore()}>
      <MainApp />
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(
      <Provider store={configureStore()}>
        <NextApp />
      </Provider>,
      rootEl
    );
  });
}

render();
