import React from 'react';
import { StyleSheet, View } from 'react-native';

interface LoaderProps {
  currentColor: string;
  progress: number;
}
export const Loader = ({ currentColor, progress }: LoaderProps) => {
  return (
    <View style={{ ...styles.loaderContainer, backgroundColor: currentColor }}>
      <View
        style={{
          ...styles.progress,
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
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  progress: {
    height: 10,
    backgroundColor: '#dcdcdc',
  },
});
