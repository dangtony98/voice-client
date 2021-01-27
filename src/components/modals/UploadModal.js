import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

export default ({ navigation }) => {  
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [recordState, setRecordState] = useState('NOT_STARTED'); // NOT_STARTED, STARTED, FINISHED, PLAYING
  const stepRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  

  useEffect(() => {
    setAudioRecorderPlayer(new AudioRecorderPlayer());
  }, []);

  const path = Platform.select({
    ios: 'hello.m4a',
    android: 'sdcard/hello.mp4',
  });

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };

  const onClosePressed = () => {
    navigation.navigate('Feed');
  }

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordState('STARTED');
      setRecordSecs(e.current_position);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
    });
  };
  
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordState('FINISHED');
    setRecordSecs(0);
  };

  const onStartPlay = async () => {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: 'sdcard/hello.mp4',
    });
    const msg = await audioRecorderPlayer.startPlayer(path);
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

  const renderIcon = () => {
    switch (recordState) {
      case 'NOT_STARTED':
        return <Icon name="mic" size={40} color="rgb(255, 255, 255)" />;
      case 'STARTED':
        return <Icon name="stop" size={40} color="rgb(255, 255, 255)" />;
      case 'FINISHED':
        return <Icon name="play" size={40} color="rgb(255, 255, 255)" />;
      case 'PLAYING':
        return <Icon name="pause" size={40} color="rgb(255, 255, 255)" />;
      case 'PAUSED':
        return <Icon name="play" size={40} color="rgb(255, 255, 255)" />;
    }
  }

  const onHandleReset = () => {
    onStopPlay();
    setRecordState('NOT_STARTED');
    setRecordTime('00:00:00');
  }

  const onHandleDone = () => {
    // TO-DO: pan ScrollView
  }

  const renderTouchable = (text, onPress, styles) => {
    if (recordState == 'FINISHED' || recordState == 'PLAYING' || recordState == 'PAUSED') {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPress()}
        >
          <Text style={[{ fontWeight: '500', fontSize: 20, color: 'rgb(255, 255, 255)'}, styles]}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View />
  }

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: 'red' }}
      horizontal={true}
      pagingEnabled={true}
    >
      <View style={[styles.screen, { width: windowWidth }]}>
        <View></View>
        <Text style={styles.recordTime}>
          {recordTime}
        </Text>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {renderTouchable('Reset', onHandleReset, { marginRight: 25 })}
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => onHandleRecord()}
            style={styles.recordOutside}
          >
            <View style={styles.recordInside}>
              {renderIcon()}
            </View>
          </TouchableOpacity>
          {renderTouchable('Done', onHandleDone, { marginLeft: 25 })}
        </View>
      </View>
      <View style={[styles.screen, { width: windowWidth }]}>
        <View></View>
      </View>
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 100,
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: 'rgb(52, 152, 219)'
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
  }
});