import React from 'react';
import BasicLayout from './component/Layout/BasicLayout';
import Home from './pages/Home';
import 'antd/dist/antd.css';
import { profile } from './api';
import default_avatar from './image/default-avatar.png';

const avatar = default_avatar;
export default class App extends React.Component{
	state = {
		user: '',
		watchedVideo: [],
		subscription: []
	}
	componentDidMount() {
		profile.getWatchedVideos().then(
			response => this.setState({
				watchedVideo:response
			})
		)
		profile.getProfile().then(
			response => this.setState({
				user:response
			})
		)
	}

	render() {
		const { watchedVideo, subscription } = this.state;
		console.log(watchedVideo);
		console.log(subscription);
		return (
			<BasicLayout pageContent={<Home watchedVideo={watchedVideo} subscription={subscription} /> } currentUser={this.state.user} id= "components-layout-demo-custom-trigger"/>
			
		);

	}
}


