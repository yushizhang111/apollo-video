import React from "react";
import { Button, Avatar, Divider, Icon } from "antd";
import { profile } from "../../api";

export default class VideoContent extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            filled: '',
            subscribed:'',
            isLoading: '',
        };
        this.toggleSubscribed=this.toggleSubscribed.bind(this)
    }

    componentDidMount() {
        const { content } = this.props;
        const { video } = content;
        const userId = video.uploader.id;
        profile.isSubscribed(userId).then(
            response => { 
                if (response.isSubscribed) {
                    this.setState({
                        filled: true
                    })
                    this.setState({
                        subscribed: true
                    })
                }
            }
        )
    }
    
    toggleSubscribed(event,id) {
        profile.toggleSubscribe(id).then(
            response =>console.log(response)
        )
        this.setState(prevState => ({
            filled: !prevState.filled,
        }));
        this.setState(prevState => ({
            subscribed: !prevState.subscribed,
        }));
    }
    
    render() {
        const { content } = this.props;
        const { video } = content;
		
        return (
            video ? 
                <div>
                    <div>
                        <div className='video-content'>
                            <iframe src={video.url} width="100%" style={{height:"300px"}} title={video.title} className='video-content__frame'>
                            </iframe>
                        </div>
                        <h3>{video.title}</h3>
                        <p>Last Viewed {content.lastViewed}</p>
                    </div>
                    <Divider />
                    <div className='video-Info' style={{ display: "inline-flex",width:"100%"}}>
                        <div className='video-Info__avatar'>
                            {video.uploader.avatar ? (
                                <div style={{ marginRight: 20}}>
                                    <Avatar src={video.uploader.avatar} />
                                </div>
                            ) : (
                                <div style={{ marginRight: 20}}>
                                    <Avatar icon="user" />
                                </div>
                            )}
                        </div>
                        
                        <div className='video-Info__upload' style={{"flexGrow":"8"}}>
                            <h3>{video.uploader ? video.uploader.name : "You Know Who"}</h3>
                            <p>Published {video.relateUploadTime}</p>
                        </div>
                        <div className='video-Info__subscribe' >
                        <Button type="primary" shape="round" size="large" onClick={(event)=>this.toggleSubscribed(event, video.uploader.id)}><Icon type="heart" theme={this.state.filled?"filled":""} />{this.state.subscribed?"Subscribed":"Subscribe"}</Button>
                        </div>
                    </div>
                    <Divider />
                    <div className='video-Description'>
                        <h3>Details</h3>
                        <div>
                            {video.description}
                        </div>
                    </div>
                </div>
            : null
		);
	} 
}
