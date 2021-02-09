import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNumber from '../authentication/AuthNumber';
import AuthOTP from '../authentication/AuthOTP';
import AuthUser from '../authentication/AuthUser';
import AuthPicture from '../authentication/AuthPicture';

import { 
  sendOTP,
  verifyOTP,
  registerUsername 
} from '../../service/api/authentication';

export default () => {
  const stepRef = useRef(null);
  const width = Dimensions.get('window').width; 
  
  const [dialCode, setDialCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTPCode, setOTPCode] = useState('');

  // error-handling
  const [authNumberError, setAuthNumberError] = useState('');
  const [authOTPError, setAuthOTPError] = useState('');
  const [authUserError, setAuthUserError] = useState('');

  const handleScroll = (x) => {
    stepRef.current.scrollTo({x, y: 0, animated: true})
  };

  const onAuthNumberBack = () => {
    // TO-DO: navigate to root login/register
    setDialCode('');
    setPhoneNumber('');
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
    // check OTP
    verifyOTP(`${dialCode}${phoneNumber}`, code,
      () => {
        // case: success
        handleScroll(width * 2);
      }, error => {
        // case: fail
        setAuthOTPError(error);
      });
  }

  const onAuthOTPResend = () => {
    setOTPCode('');
    handleOTP(dialCode, phoneNumber);
  }

  const onAuthUserNext = (username) => {    
    registerUsername(username,
      () => {
        // case: success (registered user with username)
        // handleScroll(width * 4);
        // navigate to newsfeed
      }, error => {
        // case: fail
        switch (error.status) {
          case 401:
            console.log('sdf2');
            // case: session has expired
            setAuthNumberError(error.data.msg);
            handleScroll(0);
            break;
          case 422:
            // case: username is taken
            setAuthUserError(error.data.message);
            break;
        }
      });
  }

  // TO-DO:
  // const onAuthPictureNext = () => {
  //   // package profile picture and upload
  // }
  
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
        scrollEnabled={true}
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
        <AuthUser 
          onAuthUserNext={onAuthUserNext}
          authUserError={authUserError}
        />
        <AuthPicture />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});