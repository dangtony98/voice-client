import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileInfo from '../profile/ProfileInfo';
import { getUserWithId } from '../../service/api/users';

import FeedProfile from '../feed/FeedProfile';

export default ({ route, navigation }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    getUserWithId(id, user => {
      setProfileInfo(user);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navBar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Icon 
            name="chevron-back-outline" 
            size={25} 
            color="rgb(127, 140, 141)" 
          />
        </TouchableOpacity>
        <></>
      </View>
      {profileInfo && (
        <>
          <ProfileInfo 
            profileInfo={profileInfo}
          />
          <FeedProfile 
            id={id}
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
    justifyContent: 'space-between',
    backgroundColor: 'rgb(255, 255, 255)'
  }
});