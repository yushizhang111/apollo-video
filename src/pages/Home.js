import React from "react";
import { video } from '../api';
import VideoList from '../component/Video/VideoList'
export default class Home extends React.Component {
    state = {
        recommendedVideo: [],
        watchedVideo: [],
        subscribedVideo: []
    }

    componentDidMount() {
        
        video.getVideoList().then(item => {
            console.log(item);
			
		});
	}

    render() {
        return (
            <Card title="Recommended">
                <VideoList 
            </Card>
        )
       
        
    }
	
}