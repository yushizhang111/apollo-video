import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Subscription from "./pages/Subscription";
import SearchPage from "./pages/SearchPage";
import VideoDetail from "./pages/VideoDetail";
import Profile from "./pages/Profile";

const Routes = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/history" component={History} />
			<Route path="/subscription/:id" component={Subscription} />
			<Route path="/video" component={SearchPage} />
			<Route path="/videos/:id" component={VideoDetail} />
			<Route path="/profile" component={Profile} />
		</Switch>
	</main>
);

export default Routes;
