import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({
  onUploadRecordCancel, // handle modal closing in parent = setModalvisible to false and navigate back to feed
  onUploadRecordDone, // handle scroll by window width in parent
  setAudioUri,
  setImage
}) => {
  const windowWidth = Dimensions.get('window').width;

  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [recordState, setRecordState] = useState('NOT_STARTED');

  useEffect(() => {
    setAudioRecorderPlayer(new AudioRecorderPlayer());
  }, []);

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

  const onHandleReset = () => {
    onStopPlay();
    setRecordState('NOT_STARTED');
    setRecordTime('00:00:00');
    setImage(null);
  }

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

  return (
    <View style={[styles.recordScreen, { width: windowWidth, backgroundColor: 'rgb(52, 152, 219)' }]}>
    <TouchableOpacity 
      activeOpacity={0.5}
      onPress={() => {
        onHandleReset();
        onUploadRecordCancel();
      }}
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
      {renderTouchable('Done', onUploadRecordDone, { marginLeft: 25 })}
    </View>
  </View>
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
  }
});