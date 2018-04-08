// libraries
import React, { Component } from 'react';
import { StyleSheet, Text, } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Daily } from '../components';

// other
import { colors } from '../themes';

/* Redux ==================================================================== */
const mapStateToProps = state => {
  const today = moment().format('YYYYMMDD');
  return {
    resolvedToday: state.workspace.resolved[today] || {}
  };
};

const mapDispatchToProps = {
  toggleTask: Actions.toggleTask,
};

/* Components ==================================================================== */
class DailyHabitCard extends Component {

  renderDailies = () => {
    const { user, tasks, toggleTask, resolvedToday } = this.props;

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
          binaryIsResolved={binaryIsResolved}
          key={task.tid}
          toggleTask={toggleTask}
        />
      );
    });
  }

  render() {
    const { user } = this.props;
    this.renderDailies();
    console.log('habit card props', this.props);

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
  toggleTask: PropTypes.func.isRequired, 
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
