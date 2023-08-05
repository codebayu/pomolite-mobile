import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loader } from './Loader';
import { ITimer, ITimerStatus } from '../types/timer';

interface PhaseInfoProps {
  phase: number;
  status: ITimerStatus;
  timer: ITimer;
  counter: number;
  currentColor: string;
  renderStatus: string;
  progress: number;
}

export const PhaseInfo = (props: PhaseInfoProps) => {
  const { phase, status, timer, currentColor, renderStatus, progress } = props;
  function renderPhase() {
    switch (phase) {
      case 1:
        return 'First';
      case 2:
        return 'Second';
      case 3:
        return 'Third';
      case 4:
        return 'Fourth';
      default:
        return 'First';
    }
  }

  function renderNextPhase() {
    if (status === 'shortBreak') {
      switch (phase) {
        case 1:
          return 'Second Phase';
        case 2:
          return 'Third Phase';
        case 3:
          return 'Fourth Phase';
        default:
          return 'First Phase';
      }
    } else if (status === 'focus' && phase === 3) {
      return 'Long Break';
    } else {
      return 'Short Break';
    }
  }
  return (
    <View style={styles.phase}>
      <Text style={{ ...styles.title, color: currentColor }}>
        {renderPhase()} Phase
      </Text>
      <Text style={styles.description}>
        {renderStatus} -{' '}
        {status === 'focus' ? 25 : status === 'shortBreak' ? 5 : 15} minutes
      </Text>
      <View style={styles.progressContainer}>
        <View style={styles.between}>
          <Text style={{ ...styles.remaining, color: currentColor }}>
            {timer.minutes} minutes remaining
          </Text>
          {phase !== 4 && (
            <Text style={styles.description}>Next: {renderNextPhase()}</Text>
          )}
        </View>
        <Loader currentColor={currentColor} progress={progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phase: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    position: 'absolute',
    top: -75,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: 'grey',
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    fontWeight: '200',
    color: 'gray',
    textTransform: 'capitalize',
  },
  progressContainer: {
    marginTop: 30,
    gap: 10,
  },
  remaining: {
    fontSize: 12,
    fontWeight: '400',
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
