import React from "react";
import { profile } from "../api";
import { Link } from "react-router-dom";
import { Card, Avatar, Spin, Button, Descriptions, Modal, Input } from "antd";
import VideoList from "../component/Video/VideoList";
import SubscriptionList from "../component/Subscription/SubscriptionList";
import moment from "moment";

export default class VideoDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			watchedVideos: [],
			subscriptions: [],
			currentUser: "",
			isLoading: true
		};
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleOk = this.handleOk.bind(this);
	}

	componentDidMount() {
		profile.getProfile().then(response => {
			this.setState({
				currentUser: response
			});
		});
		profile.getSubscribedUser().then(response => {
			this.setState({
				subscriptions: response
			});
		});
		profile.getWatchedVideos().then(response =>
			this.setState({
				watchedVideos: response,
				isLoading: false
			})
		);
	}
	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	render() {
		const {
			currentUser,
			subscriptions,
			watchedVideos,
			isLoading
		} = this.state;
		console.log(subscriptions);

		const EditButton = () => {
			return (
				<div className="video-Info__subscribe">
					<Button
						type="primary"
						shape="circle"
						icon="edit"
                        size="large"
                        onClick={this.showModal}
					/>
				</div>
			);
		};

		const UserAvatar = user => {
			return user.avatar ? (
				<div style={{ marginRight: 20 }}>
					<Avatar src={user.avatar} />
				</div>
			) : (
				<div style={{ marginRight: 20 }}>
					<Avatar icon="user" />
				</div>
			);
		};

		if (isLoading) {
			return (
				<div className="spin">
					<Spin />
				</div>
			);
		} else {
			return (
				<div>
					<Card
						bordered={false}
						title="Your Profile"
						className="content-card"
						extra={<EditButton />}
					>
						<Descriptions
							title={<UserAvatar user={currentUser} />}
							layout="vertical"
						>
							<Descriptions.Item label="UserName">
								{currentUser.name}
							</Descriptions.Item>
							<Descriptions.Item label="UserId">
								{currentUser.id}
							</Descriptions.Item>
							<Descriptions.Item label="Member Since">
								{moment(currentUser.memberSince).format(
									"MMM Do YYYY"
								)}
							</Descriptions.Item>
						</Descriptions>
						<Modal
							title="Edit you profile"
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
						>
							<Input placeholder="name" />
						</Modal>
					</Card>
					<Card
						bordered={false}
						title="Your Subscription"
						className="content-card"
					>
						<SubscriptionList subscriptions={subscriptions} />
					</Card>
					<Card
						bordered={false}
						title="History"
                        className="content-card"
                        extra={<Link to={"/history"}>More</Link>}
					>
						<VideoList videoData={watchedVideos} />
					</Card>
				</div>
			);
		}
	}
}
