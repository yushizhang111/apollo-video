import React from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { Link } from 'react-router-dom'

import '../../style/main.scss';

const { Header, Sider } = Layout;

export default class BasicLayout extends React.Component {
	state = {
		collapsed: true,
		
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		const { pageContent, currentUser } = this.props;
	
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
							<Link to='/'>
								<Icon type="home" />
								<span>Home</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to='/history'>
								<Icon type="history" />
								<span>History</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload" />
							<span>nav 3</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: "#fff", padding: 0 }}>
						<Icon
							className="trigger"
							type={
								this.state.collapsed
									? "menu-unfold"
									: "menu-fold"
							}
							onClick={this.toggle}
						/>
						<Avatar>

						</Avatar>
						<span>{currentUser.name}</span>
					</Header>
					{pageContent}
				</Layout>
			</Layout>
		);
	}
}
