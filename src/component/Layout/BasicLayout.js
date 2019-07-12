import React from "react";
import { Layout, Menu, Icon, Avatar, Input } from "antd";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { profile } from "../../api";

const { Header, Sider, Content, Footer } = Layout;
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
					theme="light"
					className="sider"
				>
					<div className="logo">
						<h1>
							<strong>Apollo</strong>
						</h1>
					</div>
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
								className="sider-submenu"
							>
								{subscriptions.map(item => (
									<Menu.Item key={item.id}>
										<Link to={"/subscription/" + item.id}>
											<div
												className="subscription-submenu"
												style={{
													display: "inline-flex",
													color: "deeppink"
												}}
											>
												{item.avatar ? (
													<div className="user-avatar">
														<Avatar
															src={
																currentUser.avatar
															}
														/>
													</div>
												) : (
													<div
														className="user-avatar"
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
					<Header className="header">
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
							<div className="header-profile">
								{currentUser.avatar ? (
									<div className="user-avatar">
										<Avatar src={currentUser.avatar} />
									</div>
								) : (
									<div className="user-avatar">
										<Avatar icon="user" />
									</div>
								)}
								<div>{currentUser.name}</div>
							</div>
						</Link>
						<Search
							className="header-search"
							placeholder="Exp: Whales"
							enterButton="Search"
							size="default"
							onSearch={value => this.onSearchVideo(value)}
						/>
					</Header>
					<Content
						className="page-content"
						style={{ minHeight: "1080px" }}
					>
						{pageContent}
					</Content>
					<Footer className="footer">
						Apollo Video Test©2019 Created by Yushi Zhang
					</Footer>
				</Layout>
			</Layout>
		);
	}
}
