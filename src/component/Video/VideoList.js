import React from "react";
import { List } from 'antd';
import VideoCard from './VideoCard';

export default class VideoList extends React.Component {
    
    render() {
        const { videoData } = this.props;
        return (
            <List
                grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
                }}
                dataSource={videoData}
                renderItem={item => (
                    <List.Item>
                        <VideoCard video={item} />
                    </List.Item>
                )}
            />
        )
       
        
    }
	
}