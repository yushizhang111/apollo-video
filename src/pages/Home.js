import React from "react";
import { video } from '../api';
import { user } from '../api';
import { Card } from 'antd';
import VideoList from '../component/Video/VideoList'
export default class Home extends React.Component {
    state = {
        recommendedVideo: [],
        watchedVideo: [],
        subscribedVideo: []
    }
    componentDidMount() {
        const uploader = user;
        video.getVideoList()
            .then((data) => {
                let videoData = [];
                data.forEach(
                    async(item) => {
                        let userId = item.userId;
                        const userName = await uploader.getUserName(userId)
                        let video = {
                            uploader: userName,
                            title: item.title,
                            uploadTime: item.uploadedAt,
                            url: item.url,
                        }
                        item = video;
                        videoData.push(item);
                        this.setState({ recommendedVideo: videoData})
                        return item;
                    }
                )
                return data;
            });
        
        
    }

    
    

    render() {
        const { recommendedVideo } = this.state;
        console.log(recommendedVideo);
        return (
            <Card title="Recommended">
                 <VideoList videoData={recommendedVideo} />
            </Card>
        )
       
        
    }
	
}