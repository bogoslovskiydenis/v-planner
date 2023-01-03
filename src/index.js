import React from "react"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import "./assets/scss/style.scss"

ReactDOMClient
  .createRoot(document.getElementById("root"))
  .render(<App />)