import React from "react";
import { profile } from "../api";
import { Card, Spin } from "antd";
import VideoList from "../component/Video/VideoList";

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            watchedVideos: [],
            isLoading: true,
		};
	}

	componentDidMount() {
		profile.getWatchedVideos().then(response =>
			this.setState({
                watchedVideos: response,
                isLoading: false
			})
		);
	}

	render() {
		const { watchedVideos, isLoading } = this.state;
        if (isLoading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            )
        } else {
            return (
                <div>
                    <Card title="History">
                        <VideoList videoData={watchedVideos} />
                    </Card>
                </div>
            );
        }
	}
}
