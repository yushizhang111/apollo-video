import React from "react";
import { List , Avatar, Button, Icon} from "antd";
import { profile } from "../../api";
export default class SideVideoList extends React.Component {
    constructor(props) {
        super(props);
        this.subscribedUserRef = React.createRef();
        this.unSubscribe = this.unSubscribe.bind(this);
    }

    unSubscribe(event,id) {
        profile.toggleSubscribe(id).then(
            response =>console.log(response)
        )
        this.subscribedUserRef.current.style["display"]="none"
        
    }


	render() {
        const { subscriptions } = this.props;
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
                        <div className="subscribed-user" style={{ "textAlign": "center" }} ref={this.subscribedUserRef} >
                            <div>
                                <UserAvatar user={item} />
                            </div>
                            <h3>{item.name}</h3>
                            <div>
                                <Button type="primary" shape="circle" size="default" onClick={event=>this.unSubscribe(event,item.id)}><Icon type="heart" theme="filled" /></Button>
                            </div>
                            
                        </div>
					</List.Item>
				)}
			/>
		);
	}
}