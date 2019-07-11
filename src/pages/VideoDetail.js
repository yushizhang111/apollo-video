import React from "react";
import { video } from "../api";
import { profile } from "../api";
import { Link } from "react-router-dom";
import { Card, Row, Col, Collapse, Spin } from "antd";
import SideVideoList from "../component/Video/SideVideoList";
import VideoContent from "../component/Video/VideoContent";
import CommentList from "../component/Comment/CommentList";

const { Panel } = Collapse;
export default class VideoDetail extends React.Component {
	state = {
		videoDetail: "",
		comments: [],
		recommended: [],
		currentUser: "",
		isLoading: true
	};

	componentDidMount() {
		const path = window.location.pathname.split("/");
		const length = path.length;
		const videoId = path[length - 1];

		profile.getWatchedVideoDetails(videoId).then(response => {
			this.setState({
				videoDetail: response
			});
		});
		profile.getProfile().then(response => {
			this.setState({
				currentUser: response
			});
		});
		video.getVideoComments(videoId).then(response => {
			this.setState({
				comments: response
			});
		});
		video.getVideosList(3).then(response => {
			this.setState({
				recommended: response,
				isLoading: false
			});
		});
	}

	render() {
		const {
			videoDetail,
			comments,
			recommended,
			currentUser,
			isLoading
		} = this.state;
		console.log(recommended);
		if (isLoading) {
			return (
				<div className="spin">
					<Spin />
				</div>
			);
		} else {
			return (
				<div>
					<Row gutter={24}>
						<Col xl={16} lg={16} md={24} sm={24} xs={24}>
							<Card>
								<VideoContent content={videoDetail} />
							</Card>
							<Collapse
								style={{
									marginLeft: "20px",
									marginRight: "20px"
								}}
							>
								<Panel header="Comments">
									<CommentList
										content={comments}
										user={currentUser}
									/>
								</Panel>
							</Collapse>
						</Col>
						<Col xl={8} lg={8} md={24} sm={24} xs={24}>
							<Card
								title="Recommeded"
								extra={<Link to={"/video?title="}>More</Link>}
							>
								<SideVideoList videoData={recommended} />
							</Card>
						</Col>
					</Row>
				</div>
			);
		}
	}
}
