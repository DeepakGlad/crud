import React from "react";
import ReactDom from "react-dom/client"
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
const root = document.getElementById("root");

const elRoot = ReactDom.createRoot(root);

elRoot.render(<Provider store={store}><App/></Provider>);

