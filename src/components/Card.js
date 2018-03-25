// libraries
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// other
import { colors } from '../themes';

/* Components ==================================================================== */

const Card = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      {children}
    </View>    
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
  }
});

/* Export ==================================================================== */
export { Card };
