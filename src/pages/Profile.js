import React from "react";
import { profile } from "../api";
import { Card, Avatar, Spin, Button, Descriptions } from "antd";
import VideoList from "../component/Video/VideoList";
import SubscriptionList from "../component/Subscription/SubscriptionList";
import moment from "moment";

export default class VideoDetail extends React.Component {
    state = {
        
        watchedVideos: [],
        subscriptions: [],
        currentUser: '',
        isLoading: true,
    }

    componentDidMount() {
        profile.getProfile().then(
            response => {
                this.setState({
                    currentUser:response
                })
            }
        )
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
	

	render() {
        const { currentUser, subscriptions, watchedVideos, isLoading } = this.state;
        console.log(subscriptions);
        

        const EditButton = () => {
            return (
                <div className='video-Info__subscribe' >
                    <Button type="primary" shape="circle" icon="plus" size="large" />
                </div>
            )
        }

        const UserAvatar = (user) => {
            return (
                user.avatar ? (
                    <div style={{ marginRight: 20 }}>
                        <Avatar src={user.avatar} />
                    </div>
                ) : (
                    <div style={{ marginRight: 20 }}>
                        <Avatar icon="user" />
                    </div>
                )
            )
        }
        
        if (isLoading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            )
        } else {
            return (
                <div>
                    <Card bordered={false} title="Your Profile" className="content-card" extra={<EditButton />} >
                        <Descriptions title={<UserAvatar user={currentUser}/>} layout="vertical">
                            <Descriptions.Item label="UserName">{currentUser.name}</Descriptions.Item>
                            <Descriptions.Item label="UserId">{currentUser.id}</Descriptions.Item>
                            <Descriptions.Item label="Member Since">{moment(currentUser.memberSince).format("MMM Do YYYY")}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Card bordered={false} title="Your Subscription" className="content-card">
                        <SubscriptionList subscriptions={subscriptions} />
                    </Card>
                    <Card bordered={false} title="History" className="content-card">
                        <VideoList videoData={watchedVideos} />
                    </Card>
                </div>
            );
        }
	}
}