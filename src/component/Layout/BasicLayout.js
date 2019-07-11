import React from "react";
import { Layout, Menu, Icon, Avatar, Input } from "antd";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { profile } from "../../api";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const history = createBrowserHistory();
export default class BasicLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
			subscriptions: [],
			searchContent: ""
		};
		this.onSearch = this.onSearchVideo.bind(this);
	}

	componentDidMount() {
		this.setState({
			searchContent: ""
		});
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

	onSearchVideo(value) {
		history.push({
			pathname: "/video",
			search: "?title=" + value
		});
		window.location.href = "/video?title=" + value;
	}

	render() {
		const { pageContent, currentUser } = this.props;
		const { subscriptions } = this.state;

		return (
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					style={{ paddingTop: "10px" }}
					theme="light"
				>
					
					<Menu theme="light" mode="inline">
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
									<Menu.Item key={item.id}>
										<Link to={"/subscription/" + item.id}>
											<div
												style={{
													display: "inline-flex"
												}}
											>
												{item.avatar ? (
													<div
														style={{
															marginRight: 20
														}}
													>
														<Avatar
															src={
																currentUser.avatar
															}
														/>
													</div>
												) : (
													<div
														style={{
															marginRight: 20
														}}
													>
														<Avatar>
															<Icon type="user" />
														</Avatar>
													</div>
												)}
												{item.name}
											</div>
										</Link>
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
						<Link to={"/profile"}>
							<div
								style={{
									display: "inline-flex"
								}}
							>
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
							</div>
						</Link>
						<Search
							placeholder="Exp: Whales"
							enterButton="Search"
							size="default"
							onSearch={value => this.onSearchVideo(value)}
							style={{ width: "50%", margin: "auto" }}
						/>
					</Header>
					<Content style={{ minHeight: "1080px" }}>
						{pageContent}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
