import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import TextInput from '../generic/TextInput';

const FEEDS_NAMES = ['Following', 'Trending'];

export default ({
  search,
  setSearch,
  currentFeed,
  setCurrentFeed
}) => {

  return (
    <View style={styles.navBar}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={search}
          placeholder='Try "Cornell"'
          onChangeText={setSearch}
          otherStyles={{flex: 1, marginRight: 15}}
        />
        <TouchableOpacity 
          onPress={() => console.log('Unimplemented')}
        >
          <Icon
            name="notifications-outline"
            size={25}
            color="rgb(127,140,141)"
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {FEEDS_NAMES.map(name => {
          const selected = currentFeed == name.toLowerCase();
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setCurrentFeed(name.toLowerCase())}
              style={[styles.navTouchable, selected && styles.navSelected]}
              key={name}
            >
              <Text style={selected ? styles.textSelected : styles.textUnselected}>
                {name}
              </Text>
            </TouchableOpacity>
          )})}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingTop: 75,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  navSelected: {
    borderBottomColor: 'rgb(52, 152, 219)',
    borderBottomWidth: 2,
  },
  navTouchable: {
    padding: 15,
    alignItems: 'center',
    width: 100
  },
  textSelected: {
    fontWeight: '500',
    color: 'rgb(52, 152, 219)'
  },
  textUnselected: {
    fontWeight: '500',
    color: 'rgb(127,140,141)'
  }
});