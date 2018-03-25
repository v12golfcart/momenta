// libraries
import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

/* Components ==================================================================== */
const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>    
  );
};


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    height: 100,
  }
});

/* Export ==================================================================== */
export { Header };
