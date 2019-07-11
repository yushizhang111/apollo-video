import React from "react";
import { profile } from "../api";
import { video } from "../api";
import { Card, Spin } from "antd";
import VideoList from "../component/Video/VideoList";

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            videoOutcomes: [],
            isLoading: true,
		};
	}

    componentDidMount() {
        const path = window.location.search.split('=');
        const length = path.length
        const title = path[length - 1];
        console.log(title);
        
        video.getVideoListByTitle(title).then(
            response => this.setState({
                videoOutcomes: response,
                isLoading: false
            })
        )
	}

	render() {
        const { videoOutcomes, isLoading } = this.state;
        console.log(videoOutcomes)
        if (isLoading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            )
        } else {
            return (
                <div>
                    <Card title="Results">
                        {videoOutcomes.length === 0  ?
                            <p>No videos found with this title</p>
                            :
                            <VideoList videoData={videoOutcomes} />
                        }
                         
                    </Card>
                </div>
            );
        }
	}
}