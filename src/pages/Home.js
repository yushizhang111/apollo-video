import React from "react";
import { video } from "../api";
import { profile } from "../api";
import { Card } from "antd";
import VideoList from "../component/Video/VideoList";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendedVideo: [],
			watchedVideos: [],
			subscribedVideo: []
		};
	}

	componentDidMount() {
		video
			.getVideosList()
			.then(response => this.setState({ recommendedVideo: response }));

		profile.getWatchedVideos().then(response =>
			this.setState({
				watchedVideos: response
			})
		);
	}

	render() {
		const { recommendedVideo, watchedVideos } = this.state;

		return (
			<div>
				<Card title="Recommended">
					<VideoList videoData={recommendedVideo} />
				</Card>
				<Card title="History">
					<VideoList videoData={watchedVideos} />
				</Card>
			</div>
		);
	}
}
