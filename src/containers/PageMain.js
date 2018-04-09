// libraries
import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

// redux
import * as Actions from '../redux_actions';

// components
import DailyHabitCard from './DailyHabitCard';
import Header from './Header';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state.miscUi,
    users: state.user.users,
    tasks: state.task.tasks || {},
    dates: state.workspace.dates || {},
  };
};

const mapDispatchToProps = {
  fetchUsers: Actions.fetchUsers,
  fetchTasks: Actions.fetchTasks,
  fetchResolves: Actions.fetchResolves,
  updateDates: Actions.updateDates,
};

/* Components ==================================================================== */
class PageMain extends Component {  

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchTasks();
    this.props.fetchResolves();
  }

  componentWillReceiveProps(props) {
    const { dates, updateDates } = props;

    const todayTest = moment().format('YYYYMMDD');
    if (todayTest !== dates.today) {
      updateDates();
    }
  }

  renderUsers = () => {
    const { users, tasks, dates } = this.props;

    const arrayOfUsers = _.map(users, (val, uid) => {
      return { uid, ...val };
    });

    return arrayOfUsers.map(user => {
      return (
        <DailyHabitCard
          user={user}
          users={users}
          tasks={tasks}
          dates={dates}
          key={user.uid}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        {this.renderUsers()}
      </View>
    );
  }
}

PageMain.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  fetchResolves: PropTypes.func.isRequired,
  updateDates: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  miscUi: PropTypes.object,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
    paddingTop: 10,
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
