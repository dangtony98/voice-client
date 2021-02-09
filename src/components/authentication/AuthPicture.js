import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Dimensions,
  StyleSheet 
} from 'react-native';

export default () => {
  return  (
    <View style={{ 
      flex: 1,
      width: Dimensions.get('window').width
    }}>
      <View style={styles.navBar}>
        <View />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('nothing')}
        >
          <Text style={{ 
              fontWeight: '500',
              color: 'rgb(255, 255, 255)' 
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 100, paddingHorizontal: 25 }}>
        <View style={{ height: 125 }}>
          <Text style={[styles.header, { marginBottom: 15 }]}>
            Upload profile picture
          </Text>
          <Text style={{ color: 'rgb(255, 255, 255)' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 100,
    paddingTop: 75,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    color: 'rgb(255, 255, 255)',
    fontSize: 25,
    fontWeight: '700'
  }
});
