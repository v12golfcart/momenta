// libraries
import React, { Component } from 'react';
import { StyleSheet, Text, } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Daily } from '../components';

// other
import { colors } from '../themes';

/* Redux ==================================================================== */
const mapDispatchToProps = {
  toggleTask: Actions.toggleTask,
  updateDailyStreak: Actions.updateDailyStreak,
  deleteTask: Actions.deleteTask,
  editTaskDesc: Actions.editTaskDesc,
  editTaskId: Actions.editTaskId,
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class DailyHabitCard extends Component {

  renderDailies = () => {
    const { 
      user, 
      tasks, 
      dates, 
      resolved,
      toggleTask, 
      updateDailyStreak,
      deleteTask, 
      editTaskDesc,
      editTaskId,
      openModal,
    } = this.props;

    const arrayOfTasks = _.map(tasks, (val, tid) => {
      return { tid, ...val };
    });
    const userTasks = arrayOfTasks.filter(task => user.uid === task.taskUserId);
    
    return userTasks.map(task => {
      let binaryIsResolved = 0;
      if (resolved[dates.today] && resolved[dates.today][task.tid]) {
        binaryIsResolved = resolved[dates.today][task.tid].binaryIsResolved;
      }

      return (
        <Daily 
          task={task}
          tasks={tasks}
          resolved={resolved}
          dates={dates}
          binaryIsResolved={binaryIsResolved}
          key={task.tid}
          toggleTask={toggleTask}
          updateDailyStreak={updateDailyStreak}
          deleteTask={deleteTask}
          editTaskDesc={editTaskDesc}
          editTaskId={editTaskId}
          openModal={openModal}
        />
      );
    });
  }

  render() {
    const { user } = this.props;
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
  dates: PropTypes.object.isRequired, 
  resolved: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired, 
  updateDailyStreak: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTaskDesc: PropTypes.func.isRequired,
  editTaskId: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
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
export default connect(null, mapDispatchToProps)(DailyHabitCard);
