import React from "react";
import { List , Avatar, Button, Icon} from "antd";

export default class SideVideoList extends React.Component {
	render() {
        const { subscriptions } = this.props;
        const SubscribeButton = () => {
            return (
                <div className='video-Info__subscribe' >
                    <Button type="primary" shape="circle" icon="heart" size="large" />
                </div>
            )
        }
        const UserAvatar = (user) => {
            return (
                user.avatar ? (
                    <div >
                        <Avatar src={user.avatar} />
                    </div>
                ) : (
                    <div >
                        <Avatar icon="user" />
                    </div>
                )
            )
        }
		return (
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 3,
					md: 6,
					lg: 6,
					xl: 8,
					xxl: 8
				}}
				dataSource={subscriptions}
				renderItem={item => (
                    <List.Item>
                        <div style={{ "textAlign":"center"}}>
                            <div>
                                <UserAvatar user={item} />
                            </div>
                            <h3>{item.name}</h3>
                            <div>
                                <Button type="primary" shape="circle" size="default" ><Icon type="heart" theme="filled" /></Button>
                            </div>
                            
                        </div>
					</List.Item>
				)}
			/>
		);
	}
}