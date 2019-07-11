import React from "react";
import { video } from "../api";
import { profile } from "../api";
import { Card, Spin} from "antd";
import VideoList from "../component/Video/VideoList";
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendedVideo: [],
			watchedVideos: [],
            subscribedVideo: [],
            isLoading: true,
		};
	}

	componentDidMount() {
		video
			.getVideosList()
            .then(response => this.setState({
                recommendedVideo: response,
                isLoading: false
            }));

		profile.getWatchedVideos().then(response =>
			this.setState({
                watchedVideos: response
                
			})
        );
        

        
	}

	render() {
		const { recommendedVideo, watchedVideos, isLoading } = this.state;
        if (isLoading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            )
        } else {
            return (
                <div>
                   
                    
                    <Card bordered={false} title="Recommended" className="content-card" >
                        <VideoList videoData={recommendedVideo} />
                    </Card>
                    <Card bordered={false} title="History" className="content-card">
                        <VideoList videoData={watchedVideos} />
                    </Card>
                   
                </div>
            );
        }
	}
}
