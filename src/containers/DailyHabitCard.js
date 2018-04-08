// libraries
import React, { Component } from 'react';
import { StyleSheet, Text, } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

// components
import { Card, Row, Daily } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
class DailyHabitCard extends Component {

  renderDailies = () => {
    const { user, tasks } = this.props;

    const arrayOfTasks = _.map(tasks, (val, tid) => {
      return { tid, ...val };
    });
    const userTasks = arrayOfTasks.filter(task => user.uid === task.taskUserId);
    
    return userTasks.map(task => (
      <Daily 
        description={task.taskDesc}
        key={task.tid}
      />
    ));
  }

  render() {
    const { user } = this.props;
    console.log('card props', this.props);
    this.renderDailies();

    return (
      <Card>
        <Row>
          <Text style={styles.title}>{user.name}</Text>
        </Row>

        {this.renderDailies()}

      </Card>
    );
  }
}


DailyHabitCard.propTypes = {
  user: PropTypes.object,
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,  
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  }
});

/* Export ==================================================================== */
export default DailyHabitCard;
