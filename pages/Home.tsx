import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Timer } from '../components/Timer';
import { PhaseInfo } from '../components/PhaseInfo';
import { PlayAction } from '../components/PlayAction';
import { useAppSelector } from '../redux/store';
import { initialState } from '../types/timer';

export const Home = () => {
  const initialState: initialState = {
    timer: {
      minutes: 25,
      seconds: 0,
      pause: true,
    },
    status: 'focus',
    counter: 0,
    phase: 1,
  };
  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const { focus, longBreak, replay, shortBreak, speed } = useAppSelector(
    (state) => state.timerReducer
  );

  const currentColor =
    state.status === 'focus'
      ? '#6659e4'
      : state.status === 'longBreak'
      ? '#f35256'
      : '#fcce3b';

  function setTimer() {
    setState((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        pause: true,
        minutes:
          state.status === 'focus'
            ? focus
            : state.status === 'shortBreak'
            ? shortBreak
            : longBreak,
        seconds: 0,
      },
    }));
  }

  function handlePause() {
    setState((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        pause: !prev.timer.pause,
      },
    }));
  }

  function handleNext() {
    if (state.status === 'focus' && state.phase < 3) {
      setState((prev) => ({
        ...prev,
        status: 'shortBreak',
      }));
    } else if (state.status === 'shortBreak' && state.phase < 3) {
      setState((prev) => ({
        ...prev,
        status: 'focus',
        phase: state.phase + 1,
      }));
    } else if (state.status === 'focus' && state.phase === 3) {
      setState((prev) => ({
        ...prev,
        status: 'longBreak',
        phase: state.phase + 1,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        status: 'focus',
        phase: 1,
      }));
    }
    setProgress(0);
  }

  function renderStatus() {
    switch (state.status) {
      case 'focus':
        return 'Focus';
      case 'longBreak':
        return 'Long Break';
      case 'shortBreak':
        return 'Short Break';
      default:
        return 'Focus';
    }
  }

  useEffect(() => {
    setTimer();
  }, [state.status, focus, longBreak, replay, shortBreak, speed]);

  useEffect(() => {
    if (!state.timer.pause) {
      if (state.timer.seconds > 0 || state.timer.minutes > 0) {
        const timer = setTimeout(() => {
          if (state.timer.seconds > 0) {
            setState((prev) => ({
              ...prev,
              timer: {
                ...prev.timer,
                seconds: state.timer.seconds - 1,
              },
            }));
          } else if (state.timer.minutes > 0) {
            setState((prev) => ({
              ...prev,
              timer: {
                ...prev.timer,
                minutes: state.timer.minutes - 1,
                seconds: 59,
              },
            }));
          }
        }, (1 / speed) * 1000);
        return () => clearTimeout(timer);
      } else if (state.status === 'focus' && state.counter < replay) {
        setState((prev) => ({
          ...prev,
          status: 'shortBreak',
          timer: {
            ...prev.timer,
            pause: true,
            minutes: shortBreak,
            seconds: 0,
          },
        }));
      } else if (
        state.status === 'shortBreak' ||
        state.status === 'longBreak'
      ) {
        setState((prev) => ({
          ...prev,
          status: 'focus',
          timer: {
            ...prev.timer,
            pause: true,
            minutes: focus,
            seconds: 0,
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: 'longBreak',
          timer: {
            ...prev.timer,
            pause: true,
            minutes: longBreak,
            seconds: 0,
          },
          counter: 0,
        }));
      }
    }
  }, [state.timer]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentColor,
      }}
    >
      <LinearGradient
        colors={
          state.status === 'focus'
            ? ['#7979f0', '#6659e4', '#6659e4']
            : state.status === 'longBreak'
            ? ['#f97679', '#f35256', '#f35256']
            : ['#f9d153', '#fcce3b', '#fcce3b']
        }
        start={[0, 0]}
        end={[1, 1]}
        style={styles.top}
      >
        <Timer timer={state.timer} status={renderStatus()} />
      </LinearGradient>
      <View style={styles.bottom}>
        <PhaseInfo
          {...state}
          currentColor={currentColor}
          renderStatus={renderStatus()}
          progress={progress}
        />
        <View style={styles.phaseCardContainer}>
          <PlayAction
            handlePause={handlePause}
            handleNext={handleNext}
            timer={state.timer}
            phase={state.phase}
            currentColor={currentColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.5,
    backgroundColor: '#fcfcfc',
    width: '100%',
    borderTopLeftRadius: 15,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    gap: 20,
    justifyContent: 'center',
  },
  phaseCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'scroll',
    gap: 10,
    padding: 10,
  },
});
