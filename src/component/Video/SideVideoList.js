import React from "react";
import { List } from "antd";
import VideoCard from "./VideoCard";

export default class SideVideoList extends React.Component {
	render() {
		const { videoData } = this.props;
		return (
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 1,
					md: 3,
					lg: 1,
					xl: 1,
					xxl: 1
				}}
				dataSource={videoData}
				renderItem={item => (
					<List.Item>
						<VideoCard video={item} />
					</List.Item>
				)}
			/>
		);
	}
}
