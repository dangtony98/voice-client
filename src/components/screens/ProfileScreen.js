import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileInfo from '../profile/ProfileInfo';
import FeedFeed, { feedFeed } from '../feed/FeedFeed';
import { setCurrentFeed, setFeed } from '../../actions/feed';
import { 
  getUserWithId,
  getUserFeedWithId
} from '../../service/api/users';
import { handleGetFeed } from '../../service/feed/feed'; 

export const profileScreen = (props, { 
  navigation,
  currentFeed,
  setCurrentFeed
}) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [fetchingFeed, setFetchingFeed] = useState(true);

  useEffect(() => {
    const { id } = props.route.params;
    // get and set user profile using request
    // TO-DO: FIX
    getUserWithId(id, user => {
      setProfileInfo(user);
      setCurrentFeed('profile');
    })
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
      <View style={styles.navBar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()} // TO-DO: Fix .goBack() from UserScreen
        >
          <Icon 
            name="chevron-back-outline" 
            size={25} 
            color="rgb(127, 140, 141)" 
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('Unimplemented')}
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

const mapStateToProps = ({feed}) => ({
  currentFeed: feed.currentFeed,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFeed: (name) => dispatch(setCurrentFeed(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(profileScreen);