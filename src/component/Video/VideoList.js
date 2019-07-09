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
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
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