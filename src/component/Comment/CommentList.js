import React from "react";
import { Card, Button, Avatar, Divider, Comment, Tooltip, List, Form, Input } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;
export default class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addComment: '',
            pageSize: 5,
        }
        this.onChange = this.onChange.bind(this);

    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({
            addComment:e.target.value
        })



    }

    render() {
        const { content, user } = this.props;
        const { pageSize } = this.state;
        console.log(content);
        console.log(user);
        const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions:['5','10','15','20'],
			pageSize,
			onShowSizeChange: (current, pagesize) =>{
				this.setState({
					pageSize:pagesize,
				})
			}
		};
        const Editor = ({ onSubmit, submitting }) => (
            <Comment
                avatar={
                    <UserAvatar user = {user} />
                }
                content={
                    <div>
                        <Form.Item>
                            <textarea style={{"width":"90%"}} rows={3} onChange={this.onChange} value={this.state.addComment} id="textArea" autoFocus/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                            Add Comment
                            </Button>
                        </Form.Item>
                    </div>
                }
            />
          
            
           
        );
        
        const UserAvatar = (user) => {
            return (
                user.avatar ? (
                    <div style={{ marginRight: 20 }}>
                        <Avatar src={user.avatar} />
                    </div>
                ) : (
                    <div style={{ marginRight: 20 }}>
                        <Avatar icon="user" />
                    </div>
                )
            )
        }

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
        )
            
	} 
}