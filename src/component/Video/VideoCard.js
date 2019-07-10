import React from "react";
import { Card } from "antd";

export default class VideoCard extends React.Component {
	render() {
		const { video } = this.props;
		console.log(video);
		if (!video.percentage) {
			return (
				<div>
					<div>
						<video width="100%">
							<source src={video.url} type="video/mp4" />
						</video>
					</div>
					<div>
						<h4>{video.title}</h4>
						<h5>{video.uploader.name}</h5>
						<p>Uploaded At: {video.uploadTime}</p>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div>
						<video width="100%">
							<source src={video.video.url} type="video/mp4" />
						</video>
					</div>
					<div>
						<h4>{video.video.title}</h4>
						<h5>{video.video.uploader.name}</h5>
						<p>Last Viewed: {video.lastViewed}</p>
						<p>Viewed: {video.percentage}%</p>
					</div>
				</div>
			);
		}
	}
}
