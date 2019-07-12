import React from "react";
import { Button, Avatar, Divider, Icon, Collapse } from "antd";
import { profile } from "../../api";

const { Panel } = Collapse;
export default class VideoContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filled: "",
			subscribed: "",
			isLoading: ""
		};
		this.toggleSubscribed = this.toggleSubscribed.bind(this);
	}

	componentDidMount() {
		const { content } = this.props;
		const { video } = content;
		const userId = video.uploader.id;
		profile.isSubscribed(userId).then(response => {
			if (response.isSubscribed) {
				this.setState({
					filled: true
				});
				this.setState({
					subscribed: true
				});
			}
		});
	}

	toggleSubscribed(event, id) {
		profile.toggleSubscribe(id).then(response => {
			console.log(response);
			this.setState(prevState => ({
				filled: !prevState.filled
			}));
			this.setState(prevState => ({
				subscribed: !prevState.subscribed
			}));
			alert("Success Change Subscription");
		});
	}

	render() {
		const { content } = this.props;
		const { video } = content;

		return video ? (
			<div>
				<div>
					<div className="video-content">
						<iframe
							src={video.url}
							width="100%"
							title={video.title}
							className="video-content__frame"
						/>
					</div>
					<h3>{video.title}</h3>
					<p>Last Viewed {content.lastViewed}</p>
				</div>
				<Divider />
				<div className="video-info">
					<div>
						{video.uploader.avatar ? (
							<div className="video-info__avatar">
								<Avatar src={video.uploader.avatar} />
							</div>
						) : (
							<div className="video-info__avatar">
								<Avatar icon="user" />
							</div>
						)}
					</div>
					<div className="video-info__upload">
						<h3>
							{video.uploader
								? video.uploader.name
								: "You Know Who"}
						</h3>
						<p>Published {video.relateUploadTime}</p>
					</div>
					<div className="video-info__subscribe">
						<Button
							type="primary"
							shape="round"
							size="large"
							onClick={event =>
								this.toggleSubscribed(event, video.uploader.id)
							}
							className="complete-subscribe-btn"
						>
							<Icon
								type="heart"
								theme={this.state.filled ? "filled" : ""}
							/>
							{this.state.subscribed ? "Subscribed" : "Subscribe"}
						</Button>
						<Button
							type="primary"
							shape="circle"
							size="default"
							onClick={event =>
								this.toggleSubscribed(event, video.uploader.id)
							}
							className="simple-subscribe-btn"
						>
							<Icon
								type="heart"
								theme={this.state.filled ? "filled" : ""}
							/>
						</Button>
					</div>
				</div>
				<Divider />
				<div className="video-description">
					<h3>Details</h3>
					<Collapse bordered={false}>
						<Panel header="More" class="video-description__panel">
							<div>
								<p>{video.description}</p>
							</div>
						</Panel>
					</Collapse>
				</div>
			</div>
		) : null;
	}
}
