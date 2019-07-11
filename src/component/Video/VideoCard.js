import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

export default class VideoCard extends React.Component {
	render() {
        const { video } = this.props;
		if (!video.percentage) {
			return (
				<div>
					<div>
						<Link to={"/videos/" + video.id}>
							<video width="100%">
								<source src={video.url} type="video/mp4" />
							</video>
						</Link>
					</div>
					<div>
						<h4>{video.title}</h4>
						<h5>{video.uploader?video.uploader.name:null}</h5>
						<p>{video.relateUploadTime?('Published '+video.relateUploadTime):('Uploaded At '+moment(video.uploadedAt).format("MMM Do YYYY HH:MM:SS"))} </p>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div>
						<Link to={"/videos/" + video.video.id}>
							<video width="100%">
								<source
									src={video.video.url}
									type="video/mp4"
								/>
							</video>
						</Link>
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
