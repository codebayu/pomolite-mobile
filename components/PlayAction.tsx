import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ITimer, ITimerStatus } from '../types/timer';

interface PlayActionProps {
  handlePause(): void;
  handleNext(): void;
  timer: ITimer;
  phase: number;
  currentColor: string;
  status: ITimerStatus;
}
export const PlayAction = (props: PlayActionProps) => {
  const { handlePause, handleNext, timer, phase, currentColor, status } = props;
  return (
    <View style={styles.container}>
      <Pressable style={styles.prevButton} disabled>
        <MaterialIcons name="skip-previous" size={40} color="gray" />
      </Pressable>
      <Pressable
        style={{ ...styles.playButton, backgroundColor: currentColor }}
        onPress={handlePause}
      >
        <Ionicons
          name={!timer.pause ? 'pause-outline' : 'play-outline'}
          size={40}
          color="white"
        />
      </Pressable>
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <MaterialIcons
          name={phase === 3 && status === 'longBreak' ? 'replay' : 'skip-next'}
          size={40}
          color="gray"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    borderRadius: 10,
    gap: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  prevButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    opacity: 0,
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});
