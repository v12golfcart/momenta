// libraries
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// other
import { colors } from '../themes';

/* Components ==================================================================== */

const Button = (props) => {
  const { children, onPressButton } = props;

  return (
    <TouchableOpacity 
      style={styles.wrapperAdd}
      onPress={onPressButton}
    >
      <LinearGradient 
        colors={[colors.primary1, colors.primary2]} 
        style={styles.linearGradient}
      >
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>    
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  wrapperAdd: {
    flexDirection: 'row', 
    flex: 1,
  },  
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 25 / 2,
    alignItems: 'center',
    padding: 4,
  },  
});

/* Export ==================================================================== */
export { Button };
