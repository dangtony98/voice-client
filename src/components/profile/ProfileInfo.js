import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default ({
  profileInfo
}) => {
  return (
    <View>
      <View style={styles.infoTop}>
        <Image 
          source={{ uri: profileInfo.img_location }}
          style={[styles.infoImage, { marginBottom: 15 }]} 
        />
        <Text style={{ fontWeight: '500' }}>
          {profileInfo.username}
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
    </View>
  );
}

const styles = StyleSheet.create({
  infoTop: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 25,
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