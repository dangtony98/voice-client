import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { 
  View, 
  Text,
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { setCurrentFeed } from '../../actions/feed';
import ProfileInfo from '../profile/ProfileInfo';
import FeedFeed from '../feed/FeedFeed'

export const userScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        // get and set user profile from AsyncStorage
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setProfileInfo(user);
        setCurrentFeed('profile');
      }
    })();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
      <View style={styles.navBar}>
        <View />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('Unimplemented')}
        >
          <Icon 
            name="menu-outline" 
            size={25} 
            color="rgb(127, 140, 141)" 
          />
        </TouchableOpacity>
      </View>
      {profileInfo && (
        <>
          <ProfileInfo 
            profileInfo={profileInfo}
          />
          <FeedFeed 
            navigation={navigation}
          />
        </>
      )}
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
  top: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(52, 152, 219)'
  },
  infoBar: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  infoGroup: {
    width: 100,
    alignItems: 'center'
  }
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFeed: (name) => dispatch(setCurrentFeed(name)),
});

export default connect(null, mapDispatchToProps)(userScreen);