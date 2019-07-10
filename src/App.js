import React from "react";
import BasicLayout from "./component/Layout/BasicLayout";
import Routes from "./Routes";
import "antd/dist/antd.css";
import { profile } from "./api";

export default class App extends React.Component {
	state = {
		user: "",
	};
	componentDidMount() {
		
		profile.getProfile().then(response =>
			this.setState({
				user: response
			})
		);
	}

	render() {
		return (
			<BasicLayout
				pageContent={<Routes />}
				currentUser={this.state.user}
				id="components-layout-demo-custom-trigger"
			/>
		);
	}
}
