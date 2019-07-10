import React from "react";
import { Card } from 'antd';

export default class VideoCard extends React.Component {
	
    render() {
        const { video } = this.props;
        return (
            <Card>
                <div>
                    <iframe src={video.url} title={video.title} ></iframe>
                </div>
                <div>
                    <h4>{video.title}</h4>
                    <h5>{video.uploader}</h5>
                    <p>{video.uploadTime}</p>
                </div>
            </Card>
        )
    }
}