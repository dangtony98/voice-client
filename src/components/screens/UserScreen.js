import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { setCurrentFeed } from '../../actions/feed';
import ProfileInfo from '../profile/ProfileInfo';
import FeedFeed from '../feed/FeedFeed'

export const userScreen = ({ 
  navigation,
  setCurrentFeed
}) => {
  const isFocused = useIsFocused();
  
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        // get and set user profile from AsyncStorage
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setProfileInfo(user);
        console.log('AA');
        // setCurrentFeed('profile');
      }
    })();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255, 0, 0)' }}>
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
  }
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFeed: (name) => dispatch(setCurrentFeed(name)),
});

export default connect(null, mapDispatchToProps)(userScreen);