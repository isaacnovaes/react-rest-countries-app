import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
