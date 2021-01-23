import React, { Component } from 'react';
import { View } from 'react-native';

export default class UploadScreen extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate("Modal");
  }
  
  render() {
    return (
      <View></View>
    );
  }
}