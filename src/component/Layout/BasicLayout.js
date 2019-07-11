import React from "react";
import { Layout, Menu, Icon, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";
import { profile } from "../../api";
const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;
export default class BasicLayout extends React.Component {
	state = {
		collapsed: true,
		subscriptions: []
	};
	componentDidMount() {
		profile.getSubscribedUser().then(response => {
			this.setState({
				subscriptions: response
			});
		});
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		const { pageContent, currentUser } = this.props;
		const { subscriptions } = this.state;
		return (
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo" />
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={["1"]}
					>
						<Menu.Item key="1">
							<Link to="/">
								<Icon type="home" />
								<span>Home</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/history">
								<Icon type="history" />
								<span>History</span>
							</Link>
						</Menu.Item>
						{subscriptions ? (
							<SubMenu
								key="3"
								title={
									<span>
										<Icon type="heart" />
										<span>Subscription</span>
									</span>
								}
							>
								{subscriptions.map(item => (
									<Menu.Item
										key={item.id}
										style={{ display: "inline-flex" }}
									>
										{item.avatar ? (
											<div style={{ marginRight: 20 }}>
												<Avatar
													src={currentUser.avatar}
												/>
											</div>
										) : (
											<div style={{ marginRight: 20 }}>
												<Avatar icon="user" />
											</div>
										)}
										{item.name}
									</Menu.Item>
								))}
							</SubMenu>
						) : null}
					</Menu>
				</Sider>
				<Layout>
					<Header
						style={{
							background: "#fff",
							padding: 0,
							display: "inline-flex"
						}}
					>
						<Icon
							className="trigger"
							type={
								this.state.collapsed
									? "menu-unfold"
									: "menu-fold"
							}
							onClick={this.toggle}
						/>
						{currentUser.avatar ? (
							<div style={{ marginRight: 20 }}>
								<Avatar src={currentUser.avatar} />
							</div>
						) : (
							<div style={{ marginRight: 20 }}>
								<Avatar icon="user" />
							</div>
						)}
						<div>{currentUser.name}</div>
					</Header>
					<Content style={{ minHeight: "1080px" }}>
						{pageContent}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
