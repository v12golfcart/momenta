// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

// components
import { Card, Row } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
class DailyHabitCard extends Component {
  render() {
    return (
      <Card>
        <Row>
          <Text style={styles.title}>Wes Bayer</Text>
        </Row>
      </Card>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  }
});

/* Export ==================================================================== */
export default DailyHabitCard;
