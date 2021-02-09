import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';

export default ({
  navigation
}) => {
  return (
    <View style={{ 
      flex: 1,
      backgroundColor: 'rgb(52, 152, 219)',
      paddingVertical: 75,
      paddingHorizontal: 25,
      justifyContent: 'space-between',
    }}>
      <View></View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.logo}>
          Voice
        </Text>
      </View>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, { 
          backgroundColor: 'rgb(255, 255, 255)', 
          marginBottom: 15 
        }]}>
          <Text style={{ 
            fontWeight: '500', 
            color: 'rgb(52, 152, 219)'
          }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          <Text style={{ 
            fontWeight: '500', 
            color: 'rgb(255, 255, 255)'
          }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: '500',
    color: 'rgb(255, 255, 255)',
    fontSize: 40
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  }
});