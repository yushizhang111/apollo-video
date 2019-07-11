import React from "react";
import { user, profile } from "../api";
import { Card, Spin, Button, Avatar,Icon } from "antd";
import VideoList from "../component/Video/VideoList";

export default class Subscription extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploader:'',
            subscribedVideo: [],
            filled: true,
            subscribed:true,
            isLoading: true,
        };
        this.toggleSubscribed=this.toggleSubscribed.bind(this)
	}

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const length = path.length
        const uploaderId = path[length - 1];
        user.getUser(uploaderId).then(
            response => this.setState({uploader:response})
        );
        user.getVideosUploadedByUser(uploaderId).then(
            response => this.setState({
                subscribedVideo: response,
                isLoading: false,
            })
            
        );
    }
    
    toggleSubscribed(event,id) {
        profile.toggleSubscribe(id).then(
            response => {
                console.log(response);
                this.setState(prevState => ({
                    filled: !prevState.filled,
                }));
                this.setState(prevState => ({
                    subscribed: !prevState.subscribed,
                }));
                alert("Success Change Subscription")
            }
        )
        
    }


	render() {
        const { uploader, subscribedVideo, isLoading } = this.state;
        const SubscribeButton = () => {
            return (
                <div className='video-Info__subscribe' >
                    <Button type="primary" shape="round" size="large" onClick={(event)=>this.toggleSubscribed(event, uploader.id)}><Icon type="heart" theme={this.state.filled?"filled":""} />{this.state.subscribed?"Subscribed":"Subscribe"}</Button>
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
        const Title = () => {
            return (
                <div >
                    <UserAvatar user={uploader} />
                    <h3>{uploader.name}</h3>
                </div>
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
                    <Card bordered={false} title={<Title />} className="content-card" extra={<SubscribeButton />} >
                        <VideoList videoData={subscribedVideo} />
                    </Card>
                    
                </div>
            );
        }
	}
}