import React from "react";
import { Card } from 'antd';

export default class VideoCard extends React.Component {
	
    render() {
        const { video } = this.props;
        console.log(video)
        if (!video.percentage) {
            return (
                <div>
                    <div>
                        <iframe src={video.url} title={video.title} ></iframe>
                    </div>
                    <div>
                        <h4>{video.title}</h4>
                        <h5>{video.uploader.name}</h5>
                        <p>{video.uploadTime}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <iframe src={video.video.url} title={video.video.title} ></iframe>
                    </div>
                    <div>
                        <h4>{video.video.title}</h4>
                        <h5>{video.video.uploader.name}</h5>
                        <p>Last Viewed: {video.lastViewed} {video.percentage}%</p>
                    </div>
                </div>
            )
        }
    }
}