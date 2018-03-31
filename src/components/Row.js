// libraries
import React from 'react';
import { StyleSheet, View } from 'react-native';

/* Components ==================================================================== */

const Row = (props) => {
  const { children, additionalStyles } = props;

  return (
    <View style={[styles.container, additionalStyles]}>
      {children}
    </View>    
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'relative',
    padding: 8,
  }
});

/* Export ==================================================================== */
export { Row };
