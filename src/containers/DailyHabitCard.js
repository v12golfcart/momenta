// libraries
import React, { Component } from 'react';
import { StyleSheet, Text, } from 'react-native';
import PropTypes from 'prop-types';

// components
import { Card, Row } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
class DailyHabitCard extends Component {
  render() {
    const { user } = this.props;

    return (
      <Card>
        <Row>
          <Text style={styles.title}>{user.name}</Text>
        </Row>
      </Card>
    );
  }
}


DailyHabitCard.propTypes = {
  user: PropTypes.object,
};

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
