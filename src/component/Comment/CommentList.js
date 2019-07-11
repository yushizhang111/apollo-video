import React from "react";
import { Button, Avatar, Comment, List, Form } from "antd";
import { video } from "../../api";

export default class CommentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addComment: "",
			pageSize: 5
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = e => {
		this.setState({
			addComment: e.target.value
		});
	};
	onSubmit = e => {
		const body = this.state.addComment;
		const { user, videoDetail } = this.props;
		const userId = user.id;
		const videoId = videoDetail.id;
		video.submitComment(videoId, userId, body).then(response => {
			console.log(response);
			alert("Success Submit");
		});
	};

	render() {
		const { content, user } = this.props;
		const { pageSize } = this.state;
		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ["5", "10", "15", "20"],
			pageSize,
			onShowSizeChange: (current, pagesize) => {
				this.setState({
					pageSize: pagesize
				});
			}
		};
		const Editor = ({ onSubmit, submitting }) => (
			<Comment
				avatar={<UserAvatar user={user} />}
				content={
					<div>
						<Form.Item>
							<textarea
								style={{ width: "90%" }}
								rows={3}
								onChange={this.onChange}
								value={this.state.addComment}
								id="textArea"
								autoFocus
							/>
						</Form.Item>
						<Form.Item>
							<Button
								htmlType="submit"
								loading={submitting}
								onClick={this.onSubmit}
								type="primary"
							>
								Add Comment
							</Button>
						</Form.Item>
					</div>
				}
			/>
		);
		const UserAvatar = user => {
			return user.avatar ? (
				<div style={{ marginRight: 20 }}>
					<Avatar src={user.avatar} />
				</div>
			) : (
				<div style={{ marginRight: 20 }}>
					<Avatar icon="user" />
				</div>
			);
		};
		return (
			<List
				className="comment-list"
				header={<Editor />}
				itemLayout="horizontal"
				pagination={paginationProps}
				dataSource={content}
				renderItem={item => (
					<li>
						<Comment
							author={item.user.name}
							avatar={<UserAvatar user={item.user} />}
							content={item.body}
							datetime={item.relatedDate}
						/>
					</li>
				)}
			/>
		);
	}
}
