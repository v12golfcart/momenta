// libraries
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

/* Components ==================================================================== */
const Spinner = (props) => {
  const { size } = props;
  const { container } = styles;

  return (
    <View style={container}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

/* Export ==================================================================== */
export { Spinner };
