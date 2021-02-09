import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Keyboard, StyleSheet } from 'react-native';
import AuthNumber from '../authentication/AuthNumber';
import AuthOTP from '../authentication/AuthOTP';

import { 
  sendOTP,
  login 
} from '../../service/api/authentication';

export default ({
  navigation
}) => {
  const stepRef = useRef(null);
  const width = Dimensions.get('window').width; 
  
  const [dialCode, setDialCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTPCode, setOTPCode] = useState('');

  // error-handling
  const [authNumberError, setAuthNumberError] = useState('');
  const [authOTPError, setAuthOTPError] = useState('');

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handleScroll = (x) => {
    stepRef.current.scrollTo({x, y: 0, animated: true})
  };

  const onAuthNumberBack = () => {
    // TO-DO: navigate to root login/register
    setDialCode('');
    setPhoneNumber('');
    navigation.navigate('Welcome');
  }

  const onAuthNumberNext = (dialCode, phoneNumber) => {
    // send OTP to phoneNumber
    setDialCode(dialCode);
    setPhoneNumber(phoneNumber);
    handleOTP(dialCode, phoneNumber);
  }

  const onAuthOTPBack = () => {
    setOTPCode('');
    handleScroll(0);
  }

  const onAuthOTPNext = (code) => {
    login(`${dialCode}${phoneNumber}`, code,
      () => {
        // case: success
        navigation.navigate('Main');
      }, error => {
        // case: fail
        switch (error) {
          case 401:
            // case: user is not yet registered, please sign up
            setAuthNumberError(error.data.msg);
            handleScroll(0);
            break;
          case 410:
            // case: code expired
            setAuthOTPError(error.data.msg);
            break;
          case 422:
            // case: incorrect code
            setAuthOTPError(error.data.msg);
            break;
        }
      })
  }

  const onAuthOTPResend = () => {
    setOTPCode('');
    handleOTP(dialCode, phoneNumber);
  }
  
  const handleOTP = (dialCode, phoneNumber) => {
    sendOTP(`${dialCode}${phoneNumber}`, 
      () => {
        // case: success
        setOTPCode('');
        handleScroll(width);
    }, error => {
        // case: fail
        setOTPCode('');
        setAuthNumberError(error);
    });
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'rgb(52, 152, 219)' }}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        ref={stepRef}
      >
        <AuthNumber 
          heading="Enter mobile number"
          description="By entering your number, you're agreeing to our Terms of Service and Privacy Policy"
          onAuthNumberBack={onAuthNumberBack}
          onAuthNumberNext={onAuthNumberNext}
          authNumberError={authNumberError}
        />
        <AuthOTP 
          heading="Enter verification code"
          description={`Please type the verification code sent to +${dialCode}${phoneNumber}`}
          onAuthOTPBack={onAuthOTPBack}
          onAuthOTPNext={onAuthOTPNext}
          onAuthOTPResend={onAuthOTPResend}
          OTPCode={OTPCode}
          setOTPCode={setOTPCode}
          authOTPError={authOTPError}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});