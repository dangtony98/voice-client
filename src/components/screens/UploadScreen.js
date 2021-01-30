import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import UploadModal from '../modals/UploadModal';
import { useIsFocused } from "@react-navigation/native";

export default ({ navigation, testing }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    setModalVisible(true);
  },[isFocused]);

  return (
    <View style={styles.screen}>
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        style={{ flex: 1 }}
      >
        <UploadModal 
          navigation={navigation}
          setModalVisible={setModalVisible} 
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgb(52, 152, 219)'
  }
});