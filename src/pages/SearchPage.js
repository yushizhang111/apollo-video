import React from "react";
import { video } from "../api";
import { Card, Spin } from "antd";
import VideoList from "../component/Video/VideoList";

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videoOutcomes: [],
			isLoading: true,
			pageSize: 2
		};
	}

	componentDidMount() {
		const path = window.location.search.split("=");
		const length = path.length;
		const title = path[length - 1];
		video.getVideoListByTitle(title).then(response =>
			this.setState({
				videoOutcomes: response,
				isLoading: false
			})
		);
	}

	render() {
		const { videoOutcomes, isLoading, pageSize } = this.state;
		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ["2", "3", "6", "12", "24", "30"],
			pageSize,
			onShowSizeChange: (current, pagesize) => {
				this.setState({
					pageSize: pagesize
				});
			}
		};
		if (isLoading) {
			return (
				<div className="spin">
					<Spin />
				</div>
			);
		} else {
			return (
				<div>
					<Card title="Results">
						{videoOutcomes.length === 0 ? (
							<p>No videos found with this title</p>
						) : (
							<VideoList
								videoData={videoOutcomes}
								paginationProps={paginationProps}
							/>
						)}
					</Card>
				</div>
			);
		}
	}
}
