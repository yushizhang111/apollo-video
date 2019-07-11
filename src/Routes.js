import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Subscription from "./pages/Subscription";
import VideoDetail from "./pages/VideoDetail";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/history" component={History} />
			<Route path="/subscription/:id" component={Subscription} />
			<Route path="/videos/:id" component={VideoDetail} />
		</Switch>
	</main>
);

export default Routes;
