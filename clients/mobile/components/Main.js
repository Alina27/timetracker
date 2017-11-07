import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';
import {PATH} from "../constants";

export default class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		return fetch('http://www.mocky.io/v2/5a020e89330000e910f6ee36')
			.then((response) => response.json())
			.then((responseJson) => {
				let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				this.setState({
					isLoading: false,
					dataSource: ds.cloneWithRows(responseJson),
				}, function() {
					// do something with new state
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<View style={{flex: 1, paddingTop: 20}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData.id}, {rowData.name}</Text>}
				/>
			</View>
		);
	}
}