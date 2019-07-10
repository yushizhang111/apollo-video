import React from "react";
import { video } from "../api";
import { user } from "../api";
import { Card, Layout } from "antd";
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
	}

	render() {
		const { recommendedVideo, watchedVideos } = this.state;
		const { watchedVideo, subscription } = this.props;

		return (
			<div>
				<Card title="Recommended">
					<VideoList videoData={recommendedVideo} />
				</Card>
				<Card title="History">
					<VideoList videoData={watchedVideo} />
				</Card>
			</div>
		);
	}
}
