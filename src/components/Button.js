// libraries
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// other
import { colors } from '../themes';

/* Components ==================================================================== */

const Button = (props) => {
  const { buttonText } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>    
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.primary1,
    borderWidth: 1,
    margin: 8,
  },
  buttonText: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 15,
    color: colors.primary1,
  }
});

/* Export ==================================================================== */
export { Button };
