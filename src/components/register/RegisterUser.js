import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default () => {
  const [username, setUsername] = useState('');

  const verifyUsername = () => {
    console.log(`verifyUsername() with username ${username}`);
  }

  return (
    <View style={{
        flex: 1,
        width: Dimensions.get('window').width
      }}
    >
      <View style={styles.navBar}>
        <View />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => verifyUsername()}
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
            Create username
          </Text>
          <Text style={{ color: 'rgb(255, 255, 255)' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor
          </Text>
        </View>
        <TextInput 
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="flyingdog"
          style={styles.usernameInput}
        />
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
  },
  usernameInput: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 255, 255)'
  }
});