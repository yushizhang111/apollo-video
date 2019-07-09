import React from 'react';
import BasicLayout from './component/Layout/BasicLayout';
import Home from './pages/Home';
import 'antd/dist/antd.css';

export default class App extends React.Component{
	render() {
		
		return (
			<BasicLayout pageContent={<Home />} id= "components-layout-demo-custom-trigger"/>
			
		);

	}
}


