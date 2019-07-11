import React from "react";
import { Card, Button, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";

export default class VideoContent extends React.Component {
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
                            <Button type="primary" shape="round" icon="heart" size="large" >Subscribe</Button>
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
