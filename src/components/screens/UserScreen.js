import React from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { login } from '../../service/api/users';

const DATA = [
  { key: 'a', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, 
  { key: 'b', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, 
  { key: 'c', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, 
  { key: 'd', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, 
  { key: 'e', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { key: 'f', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { key: 'g', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
];

export default ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 2;
  const tileDimension = screenWidth / numColumns;
  const renderItem = ({ item }) => (
    <View style={{ 
      height: tileDimension, 
      width: tileDimension, 
      padding: 2
    }}>
      <View style={{ backgroundColor: 'rgb(52, 152, 219)', padding: 25, flex: 1 }}>
        <Text>{item.caption}</Text>
      </View>
    </View>
  )

  return (
    <View>
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
      <View >
        <FlatList 
            data={DATA}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={item => item.id}
            refreshing={false}
            onRefresh={() => console.log('Refresh triggered')}
          />
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  top: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {

  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
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