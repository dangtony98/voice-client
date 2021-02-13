import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default () => {
  return (
    <>
      <View style={styles.infoTop}>
        <Image 
          source={{ uri: 'https://external-preview.redd.it/_o7PutALILIg2poC9ed67vHQ68Cxx67UT6q7CFAhCs4.png?auto=webp&s=2560c01cc455c9dcbad0d869116c938060e43212' }}
          style={[styles.infoImage, { marginBottom: 15 }]} 
        />
        <Text style={{ fontWeight: '500' }}>
          Maidul
        </Text>
      </View>
      <View style={styles.infoBar}>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>
            5
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>
            68
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={{ fontWeight: '500' }}>
            72
          </Text>
          <Text>Following</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoTop: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'center'
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
  infoImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(52, 152, 219)'
  }
});