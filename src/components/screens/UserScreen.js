import React, { useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioBar from '../audio/AudioBar';

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
      <View style={styles.top}>
        <Image 
          source={{ uri: 'https://external-preview.redd.it/_o7PutALILIg2poC9ed67vHQ68Cxx67UT6q7CFAhCs4.png?auto=webp&s=2560c01cc455c9dcbad0d869116c938060e43212' }}
          style={styles.userImage} 
        />
        <Text style={{ marginTop: 15, fontWeight: '500' }}>Maidul</Text>
      </View>
      <View style={styles.infoBar}>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>5</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>68</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>72</Text>
          <Text>Following</Text>
        </View>
      </View>
      {/* <View style={styles.flipBar}>
        <TouchableOpacity
          onPress={() => setSelected('list')}
        >
          <Icon
            name={selected == 'list' ? 'list' : 'list-outline'}
            size={25}
            color={selected == 'list' ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('grid')}
        >
          <Icon
            name={selected == 'grid' ? 'grid' : 'grid-outline'}
            size={25}
            color={selected == 'grid' ? 'rgb(52, 152, 219)' : 'rgb(127,140,141)'}
          />
        </TouchableOpacity>
      </View> */}
      <FlatList 
        data={DATA}
        renderItem={renderItem}
        numColumns={2}
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
  },
  flipBar: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(255, 255, 255)'
  }
});