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
const mapStateToProps = state => {
  let resolvedToday = {};
  let resolvedYesterday = {};
  if (state.task.resolved) { 
    resolvedToday = state.task.resolved[state.workspace.dates.today] || {};
    resolvedYesterday = state.task.resolved[state.workspace.dates.resolvedYesterday] || {};
  }

  return {
    resolvedToday,
    resolvedYesterday,
    dates: state.workspace.dates,
  };
};

const mapDispatchToProps = {
  toggleTask: Actions.toggleTask,
  updateDailyStreak: Actions.updateDailyStreak,
};

/* Components ==================================================================== */
class DailyHabitCard extends Component {

  renderDailies = () => {
    const { 
      user, 
      tasks, 
      dates, 
      toggleTask, 
      resolvedToday, 
      resolvedYesterday, 
      updateDailyStreak 
    } = this.props;

    const arrayOfTasks = _.map(tasks, (val, tid) => {
      return { tid, ...val };
    });
    const userTasks = arrayOfTasks.filter(task => user.uid === task.taskUserId);
    
    return userTasks.map(task => {
      const binaryIsResolved = resolvedToday[task.tid] ? 
        resolvedToday[task.tid].binaryIsResolved : 
        0;

      return (
        <Daily 
          task={task}
          tasks={tasks}
          resolvedToday={resolvedToday}
          resolvedYesterday={resolvedYesterday}
          dates={dates}
          binaryIsResolved={binaryIsResolved}
          key={task.tid}
          toggleTask={toggleTask}
          updateDailyStreak={updateDailyStreak}
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
  resolvedToday: PropTypes.object.isRequired,
  resolvedYesterday: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired, 
  updateDailyStreak: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(DailyHabitCard);
