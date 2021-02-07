import React from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet 
} from 'react-native';
import moment from 'moment';

export default ({ item }) => {
  return (
    <View style={styles.reply}>
      <View style={{ flexDirection: 'row' }}>
        <Image 
          source={{ uri: item.user.img_location }}
          style={[styles.replyImage, { marginRight: 15 }]} 
        />
        <View style={{ flex: 1 }}>
          <View 
            style={{ 
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 30,
            marginBottom: 15
          }}>
            <Text style={{ fontWeight: '500' }}>
              {item.user.username}
            </Text>
            <Text style={{ color: 'rgb(127,140,141)' }}>
              {moment(item.createdAt).fromNow(true)}
            </Text>
          </View>
          <Text>
            {item.body}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reply: {
    paddingVertical: 15,
    paddingLeft: 70,
    paddingRight: 25
  },
  replyImage: {
    height: 30,
    width: 30,
    borderRadius: 10,
  }
});