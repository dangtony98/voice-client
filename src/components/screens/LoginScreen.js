import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableHighlight from '../generic/TouchableHighlight';

import { login } from '../../service/api/users';

export default ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username != "" && password != "") {
      login({ username, password }, () => {
        navigation.navigate("Main");
      });
    }
  }

  return (
    <View style={styles.page}>
      <Text style={styles.header}>Login</Text>
      <TextInput 
        value={username}
        placeholder="Username"
        onChangeText={setUsername} 
        otherStyles={{ marginTop: 20 }}
      />
      <TextInput 
        value={password}
        placeholder="Password" 
        onChangeText={setPassword}
        secureTextEntry={true}
        otherStyles={{ marginTop: 10 }}
      />
      <TouchableHighlight
        title="Login"
        onPress={() => handleLogin()}
        otherStyles={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "rgb(52, 152, 219)",
    fontSize: 20,
    fontWeight: "700"
  },
  page: {
    paddingVertical: 100,
    paddingHorizontal: 25
  }
});