import React from "react";
import { profile } from "../api";
import { Card } from "antd";
import VideoList from "../component/Video/VideoList";

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			watchedVideos: []
		};
	}

	componentDidMount() {
		profile.getWatchedVideos().then(response =>
			this.setState({
				watchedVideos: response
			})
		);
	}

	render() {
		const { watchedVideos } = this.state;

		return (
			<div>
				<Card title="History">
					<VideoList videoData={watchedVideos} />
				</Card>
			</div>
		);
	}
}
