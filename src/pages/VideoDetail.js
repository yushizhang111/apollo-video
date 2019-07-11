import React from "react";
import { video } from "../api";
import { profile } from "../api";
import { Card , Row, Col} from "antd";
import SideVideoList from "../component/Video/SideVideoList";
import VideoContent from "../component/Video/VideoContent";
import CommentList from "../component/Comment/CommentList";

export default class VideoDetail extends React.Component {
    state = {
        videoDetail: '',
        comments: [],
        recommended:[]
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const length = path.length
        const videoId = path[length - 1];
        console.log(videoId);
        
        profile.getWatchedVideoDetails(videoId).then(
            response => {
                this.setState({
                    videoDetail:response
                })
            }
        )
        video.getVideoComments(videoId).then(
            response => {
                this.setState({
                    comments:response
                })
            }
        )
        video.getVideosList().then(
            response => {
                this.setState({
                    recommended: response
                })
            }
        )
    }
	

	render() {
        const { videoDetail, comments, recommended } = this.state
        console.log(videoDetail)
        console.log(comments)
        console.log(recommended)

		return (
			<div>
				<Row gutter={24}>
                    <Col xl={16} lg={16} md={16} sm={24} xs={24} >
                        <Card>
                            <VideoContent content={videoDetail} />
                        </Card>
                        <Card title="Comments">
                            {/* <CommentList content="comments" /> */}
                        </Card>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                        <Card title="Recommeded">
                            {/* <SideVideoList content="recommended" /> */}
                        </Card>
                    </Col>
                </Row>
			</div>
		);
	}
}
