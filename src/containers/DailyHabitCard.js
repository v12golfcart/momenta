// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

// components
import { Card } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
class DailyHabitCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.wrapperCardContent}>
            <Text style={styles.title}>Wes Bayer</Text>
          </View>
        </Card>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
  },
  wrapperCardContent: {
    padding: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  }
});

/* Export ==================================================================== */
export default DailyHabitCard;
