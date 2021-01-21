import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../generic/TextInput';
import TouchableHighlight from '../generic/TouchableHighlight';

import { register } from '../../service/api/authentication';

export default ({ navigation }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);

  const handleRegister = () => {
    switch (step) {
      case 1:
        if (email != "" && password != "") {
          setStep(2);
        }        
        break;
      case 2:
        console.log('Call reigstration API');
        register({ email, password, username }, () => {
          navigation.navigate("Home");
        });
        break;
    }
  }

  return (
    <View style={styles.page}>
      <Text style={styles.header}>Create an Account</Text>
      {(step == 1) && (
        <View>
          <TextInput 
            value={email}
            placeholder="Email"
            onChangeText={setEmail} 
            otherStyles={{ marginTop: 20 }}
          />
          <TextInput 
            value={password}
            placeholder="Password" 
            onChangeText={setPassword}
            secureTextEntry={true}
            otherStyles={{ marginTop: 10 }}
          />
        </View>  
      )}
      {(step == 2) && (
        <View>
          <TextInput 
            value={username}
            placeholder="Username"
            onChangeText={setUsername} 
            otherStyles={{ marginTop: 20 }}
          />
        </View>
      )}
      <TouchableHighlight
        title={(step == 1) ? "Next" : "Sign Up"}
        onPress={() => handleRegister()}
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