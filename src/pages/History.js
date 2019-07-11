import React from "react";
import { profile } from "../api";
import { Card, Spin } from "antd";
import VideoList from "../component/Video/VideoList";

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            watchedVideos: [],
            isLoading: true,
            pageSize:2,
		};
	}

	componentDidMount() {
		profile.getWatchedVideos().then(response =>
			this.setState({
                watchedVideos: response,
                isLoading: false
			})
		);
	}

	render() {
        const { watchedVideos, isLoading, pageSize } = this.state;
        const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions:['2','3','6','12', '24', '30'],
			pageSize,
			onShowSizeChange: (current, pagesize) =>{
				this.setState({
					pageSize:pagesize,
				})
			}
		};
        if (isLoading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            )
        } else {
            return (
                <div>
                    <Card title="History">
                        <VideoList videoData={watchedVideos} paginationProps={paginationProps}/>
                    </Card>
                </div>
            );
        }
	}
}
