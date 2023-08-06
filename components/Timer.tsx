import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITimer } from '../types/timer';

interface TimerProps {
  timer: ITimer;
  status: string;
}

export const Timer = ({ timer, status }: TimerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {'    '}
        {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}
        {''}:{''}
        {timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
        {'    '}
      </Text>
      <Text style={styles.description}>{status} Session</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  timer: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    textTransform: 'capitalize',
  },
});
