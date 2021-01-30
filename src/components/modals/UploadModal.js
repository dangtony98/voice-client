import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Platform, Dimensions, ActionSheetIOS, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { post_audio } from '../../service/api/posts';

export default ({ navigation, setModalVisible }) => {  
  const windowWidth = Dimensions.get('window').width;

  // recorder state
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [audioUri, setAudioUri] = useState(null);
  const [recordState, setRecordState] = useState('NOT_STARTED');

  // edit state
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const stepRef = useRef(null);

  useEffect(() => {
    setAudioRecorderPlayer(new AudioRecorderPlayer());
  }, []);

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordState('STARTED');
      setRecordSecs(e.current_position);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
    });
  };
  
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioUri(result);
    setRecordState('FINISHED');
    setRecordSecs(0);
  };

  const onStartPlay = async () => {    
    const msg = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.setVolume(1.0);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
        setRecordState('FINISHED');
      }
      setCurrentPositionSec(e.current_position);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    await audioRecorderPlayer.removePlayBackListener();
  };

  const onHandleRecord = () => {
    switch (recordState) {
      case 'NOT_STARTED':
        onStartRecord();
        setRecordState('STARTED');
        break;
      case 'STARTED':
        onStopRecord();
        setRecordState('FINISHED');
        break;
      case 'FINISHED':
        onStartPlay();
        setRecordState('PLAYING');
        break;
      case 'PLAYING':
        onPausePlay();
        setRecordState('PAUSED');
        break;
      case 'PAUSED':
        onResumePlay();
        setRecordState('PLAYING');
        break;
    }
  }

  const renderIcon = (size) => {
    switch (recordState) {
      case 'NOT_STARTED':
        return <Icon name="mic" size={size} color="rgb(255, 255, 255)" />;
      case 'STARTED':
        return <Icon name="stop" size={size} color="rgb(255, 255, 255)" />;
      case 'FINISHED':
        return <Icon name="play" size={size} color="rgb(255, 255, 255)" />;
      case 'PLAYING':
        return <Icon name="pause" size={size} color="rgb(255, 255, 255)" />;
      case 'PAUSED':
        return <Icon name="play" size={size} color="rgb(255, 255, 255)" />;
    }
  }

  const onHandleReset = () => {
    onStopPlay();
    setRecordState('NOT_STARTED');
    setRecordTime('00:00:00');
    setImage(null);
  }

  const onHandleCancel = () => {
    onHandleReset();
    setModalVisible(false);
    navigation.navigate('Feed');
  }

  const onHandleDone = () => {
    handleScroll(windowWidth);
  }

  const renderTouchable = (text, onPress, styles) => {
    if (recordState == 'FINISHED' || recordState == 'PLAYING' || recordState == 'PAUSED') {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPress()}
        >
          <Text style={[{ fontWeight: '500', color: 'rgb(255, 255, 255)'}, styles]}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View />
  }

  const onHandleChooseImage = () => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Library"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // case: cancel
          } else if (buttonIndex === 1) {
            // case: take photo with camera
            const options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            launchCamera(options, (response) => {
              setImage(response);
            });
          } else if (buttonIndex === 2) {
            // case: chose from library
            const options = {
              noData: true,
              mediaType: 'photo'
            }
        
            launchImageLibrary(options, response => {
              if (response.uri) {
                setImage(response);
              }
            });
          }
        });
    }
  };

  const onHandleSharePressed = () => {
    // TO-DO: Add image upload capability once backend is done
    if (caption != '' && recordState != 'NOT_STARTED') {
        let formData = new FormData();
        formData.append('caption', caption);
        formData.append('audio_file', {
          uri: audioUri,
          name: 'sound.m4a',
          type: 'audio/m4a',
        });
        post_audio(formData, () => {
          onHandleReset();
          navigation.navigate('Home');
        });
    }
  }

  const handleScroll = (x) => {
    stepRef.current.scrollTo({x, y: 0, animated: true})
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: 'red' }}
      horizontal={true}
      pagingEnabled={true}
      scrollEnabled={false}
      ref={stepRef}
    >
      <View style={[styles.recordScreen, { width: windowWidth, backgroundColor: 'rgb(52, 152, 219)' }]}>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={() => onHandleCancel()}
          style={{ alignSelf: 'stretch' }}
        >
          <Text style={{ fontWeight: '500', color: 'rgb(255, 255, 255)'}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={styles.recordTime}>
          {recordTime}
        </Text>
        <View style={styles.recordGroup}>
          {renderTouchable('Reset', onHandleReset, { marginRight: 25 })}
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => onHandleRecord()}
            style={styles.recordOutside}
          >
            <View style={styles.recordInside}>
              {renderIcon(40)}
            </View>
          </TouchableOpacity>
          {renderTouchable('Done', onHandleDone, { marginLeft: 25 })}
        </View>
      </View>
      
      <View style={[styles.editScreen, { width: windowWidth, backgroundColor: 'rgb(255, 255, 255)' }]}>
          <View style={styles.editTop}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleScroll(0)}
          >
            <Icon name="chevron-back-outline" size={25} color="rgb(127,140,141)" />
          </TouchableOpacity>
          <Text style={[{ fontWeight: '500', fontSize: 15, color: 'rgb(52,152,219)'}]}>
            New Post
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onHandleSharePressed()}
          >
            <Text style={{ fontWeight: '500', color: 'rgb(52, 152, 219)'}}>Share</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.editAudio}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onHandleRecord()}
            >
              {renderIcon(25)}
            </TouchableOpacity>
            <Text style={{ fontWeight: '500', color: 'white' }}>{recordTime}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onHandleChooseImage()}
            style={{ marginTop: 15 }}
          >
            {(image == null) ? (
              <View style={[styles.editImage, { 
                backgroundColor: 'rgba(52, 152, 219, 0.25)', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }]}>
                <Icon name="image" size={40} color="rgb(255, 255, 255)" />
              </View>
            ) : (
              <Image 
                source={{ uri: image.uri }}
                style={styles.editImage}
              />
            )}
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
          >
            <TextInput
              value={caption}
              onChangeText={text => setCaption(text)}
              placeholder="Write a caption..."
              multiline={true}
            />
          </KeyboardAvoidingView>
      </View>
    </ScrollView>

  ); 
}

const styles = StyleSheet.create({
  recordScreen: {
    paddingVertical: 75,
    paddingHorizontal: 25,
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  recordTime: {
    fontSize: 60,
    color: 'rgb(255, 255, 255)'
  },
  recordGroup: { 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  recordOutside: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  recordInside: {
    height: 90,
    width: 90,
    borderRadius: 50,
    backgroundColor: 'rgb(52, 152, 219)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editScreen: {
    paddingVertical: 75,
    paddingHorizontal: 25,
    flex: 1
  },
  editTop: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
  },
  editAudio: { 
    height: 50, 
    width: '100%', 
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(52, 152, 219)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(52, 152, 219)',
    marginTop: 25
  },
  editImage: {
    height: 350,
    width: '100%', 
    borderRadius: 10
  }
});