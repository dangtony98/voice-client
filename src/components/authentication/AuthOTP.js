import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Dimensions, 
  Keyboard,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export default ({
  heading,
  description,
  onAuthOTPBack,
  onAuthOTPNext,
  onAuthOTPResend,
  OTPCode,
  setOTPCode,
  authOTPError
}) => {

  return (
    <View style={{ 
        flex: 1,
        width: Dimensions.get('window').width
      }}
    >
      <View style={styles.navBar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onAuthOTPBack()}
        >
          <Icon 
            name="chevron-back-outline" 
            size={25} 
            color="rgb(255, 255, 255)" 
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 100, paddingHorizontal: 25 }}>
        <View style={{ height: 125 }}>
          <Text style={[styles.header, { marginBottom: 15 }]}>
            {heading}
          </Text>
          <Text style={{ color: 'rgb(255, 255, 255)' }}>
            {description}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25, marginBottom: 25 }}>
        <OTPInputView 
          style={styles.OTP}
          codeInputFieldStyle={styles.OTPCell}
          pinCount={6} 
          code={OTPCode}
          onCodeChanged = {code => setOTPCode(code)}
          onCodeFilled = {(code => onAuthOTPNext(code))}
        />
      </View>
      <View style={{ paddingHorizontal: 25, height: 50 }}>
        <Text style={{ color: 'rgb(255, 255, 255)' }}>
          {authOTPError}
        </Text>
      </View>
      <View style={{ marginTop: 25, alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onAuthOTPResend()}
        >
          <Text style={{ 
              fontWeight: '500',
              color: 'rgb(255, 255, 255)' 
            }}
          >
            Resend
          </Text>
        </TouchableOpacity>
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
  OTP: { 
    width: '100%', 
    height: 47
  },
  OTPCell: {
    height: '100%',
    padding: 15,
    borderRadius: 10,
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)'
  }
});