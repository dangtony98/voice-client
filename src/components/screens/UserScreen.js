import React, { useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import AudioBar from '../audio/AudioBar';
import ProfileInfo from '../profile/ProfileInfo';

const DATA = [
  { id: 'a', caption: 'Lorem ipsum dolor sit adipiscing elit1' }, 
  { id: 'bsa', caption: 'Lorem ipsum dolor sit adipiscing elit2' }, 
  { id: 'cd', caption: 'Lorem ipsum dolor sit adipiscing elit3' }, 
  { id: 'de', caption: 'Lorem ipsum dolor sit adipiscing elit4' }, 
  { id: 'e', caption: 'Lorem ipsum dolor sit adipiscing elit5' },
  { id: 'f', caption: 'Lorem ipsum dolor sit adipiscing elit6' },
  { id: 'g', caption: 'Lorem ipsum dolor sit adipiscing elit7' },
  { id: 'h', caption: 'Lorem ipsum dolor sit adipiscing elit8' }
];

export default ({ navigation }) => {
  const [selected, setSelected] = useState('list');
  const [isFetching, setIsFetching] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const tileDimension = windowWidth / numColumns;

  const renderItem = ({ item }) => (
    <View style={{ 
      height: tileDimension, 
      width: tileDimension, 
      padding: 1,
    }}>
      <View style={{ flexGrow: 1, backgroundColor: 'rgba(52, 152, 219, 0.25)', padding: 15 }}>

      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ProfileInfo />
      <FlatList 
        data={DATA}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={item => item.id}
        refreshing={isFetching}
        onRefresh={() => console.log('Refresh triggered')}
        style={{ flexGrow: 1 }}
      />
      <AudioBar />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(52, 152, 219)'
  },
  infoBar: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  infoGroup: {
    width: 100,
    alignItems: 'center'
  }
});