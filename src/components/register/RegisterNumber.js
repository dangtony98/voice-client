import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Keyboard,
  Dimensions,
  StyleSheet 
} from 'react-native';
import Modal from 'react-native-modal';
import Flag from 'react-native-flags';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

import countryValues from '../../service/static/countryValues.json';
import countryCodes from '../../service/static/countryCodes.json';

export default () => {
  const [dialCode, setDialCode] = useState('1');
  const [showPicker, setShowPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onCountryCode = () => {
    Keyboard.dismiss();
    setShowPicker(prevState => !prevState);
  }

  return (
    <View 
      style={{ 
        width: Dimensions.get('window').width
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log('Nothing yet')}
          >
            <Icon 
              name="chevron-back-outline" 
              size={25} 
              color="rgb(255, 255, 255)" 
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log('Nothing yet')}
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
          <View style={{ marginBottom: 50 }}>
            <Text style={[styles.header, { marginBottom: 15 }]}>
              Mobile Verification
            </Text>
            <Text style={{ color: 'rgb(255, 255, 255)' }}>
              Please enter your mobile number to verify your account
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => onCountryCode()}
              style={[styles.countryCodeButton, { marginRight: 15 }]}
            >
              <View style={{ width: 50, marginRight: 5 }}>
                <Text>
                  {`+ ${dialCode}`}
                </Text>
              </View>
              <Flag
                code={countryCodes[dialCode]}
                size={24}
              />
            </TouchableOpacity>
            <TextInput 
              style={[styles.phoneNumberInput, { flex: 1 }]}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              placeholder="2408832985"
              keyboardType="numeric"
              onFocus={() => setShowPicker(false)}
            />
          </View>
        </View>
      </View>
      <Modal
        isVisible={showPicker}
        backdropOpacity={0}
        onBackdropPress={() => setShowPicker(false)}
        style={{ margin: 0, justifyContent: 'flex-end' }}
      >
        <Picker
          selectedValue={dialCode}
          style={styles.countryCodePicker}
          itemStyle={{ color: 'rgb(0, 0, 0)'}}
          onValueChange={(itemValue, itemIndex) =>
            setDialCode(itemValue)
          }>
          {countryValues.data.map(country => (
            <Picker.Item 
              label={country.label} 
              value={country.value} 
              key={country.value}
            />
          ))}
        </Picker>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingTop: 75,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    fontWeight: '700'
  },
  countryCodeButton: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  countryCodePicker: {
    height: 300, 
    width: Dimensions.get('window').width,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  phoneNumberInput: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  bottom: { 
    flex: 1,
    paddingTop: 25, 
    justifyContent: 'space-between'
  }
});