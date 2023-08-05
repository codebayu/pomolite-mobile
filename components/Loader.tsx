import React from 'react';
import { StyleSheet, View } from 'react-native';

interface LoaderProps {
  currentColor: string;
  progress: number;
}
export const Loader = ({ currentColor, progress }: LoaderProps) => {
  return (
    <View style={styles.loaderContainer}>
      <View
        style={{
          ...styles.progress,
          backgroundColor: currentColor,
          width: `${progress}%`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: 10,
    borderRadius: 20,
    backgroundColor: '#dcdcdc',
  },
  progress: {
    height: 10,
    borderRadius: 20,
  },
});
