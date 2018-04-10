// libraries
import React, { Component } from 'react';
import { AppState, StyleSheet, View, } from 'react-native';
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
    users: state.user.users || {},
    tasks: state.task.tasks || {},
    dates: state.workspace.dates || {},
    resolved: state.task.resolved || {},
  };
};

const mapDispatchToProps = {
  fetchUsers: Actions.fetchUsers,
  fetchTasks: Actions.fetchTasks,
  fetchResolved: Actions.fetchResolved,
  updateDates: Actions.updateDates,
  updateDailyStreak: Actions.updateDailyStreak,
};

/* Components ==================================================================== */
class PageMain extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      appState: AppState.currentState,
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchTasks();
    this.props.fetchResolved();
    this.props.updateDates();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(props) {
    this.updateWorkspaceDatesAndStreaks();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.updateWorkspaceDatesAndStreaks();
    }
    this.setState({ appState: nextAppState });
  }

  updateWorkspaceDatesAndStreaks = () => {
    const { dates, updateDates, tasks, resolved, updateDailyStreak } = this.props;

    const today = moment().format('YYYYMMDD');
    if (today !== dates.today) {
      updateDates();

      const yesterday = moment().add(-1, 'days').format('YYYYMMDD');
      _.map(tasks, (value, tid) => {
        if (resolved[yesterday] 
          && resolved[yesterday][tid] 
          && resolved[yesterday][tid].binaryIsResolved === 1) {
          return;
        }
        updateDailyStreak(tid, 0);
      });
    }    
  }

  renderUsers = () => {
    const { users, tasks, dates, resolved } = this.props;

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
          resolved={resolved}
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
        
        {/*
        FOR MESSING WITH DAYS
        <TouchableHighlight
          onPress={() => {
            this.props.updateDates(this.state.counter);
              const yesterday = moment().add((-1 + this.state.counter), 'days').format('YYYYMMDD');
              const today = moment().add((0 + this.state.counter), 'days').format('YYYYMMDD');
              console.log('today+++', today);

            _.map(tasks, (value, tid) => {
              if (resolved[yesterday] 
                && resolved[yesterday][tid] 
                && resolved[yesterday][tid].binaryIsResolved === 1) {
                console.log(`do nothing for ${value.taskDesc} [${value.taskStreak}}]`);
                return;
              }
              console.log(`update streak for ${value.taskDesc} [${value.taskStreak}}]`);
              const newStreak = 0;
              updateDailyStreak(tid, newStreak);
            });

            this.setState({ counter: this.state.counter + 1 });
          }}
        >
          <Text style={{ color: 'white' }}>Sup</Text>
        </TouchableHighlight>
      */}
      </View>
    );
  }
}

PageMain.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  fetchResolved: PropTypes.func.isRequired,
  updateDates: PropTypes.func.isRequired,
  updateDailyStreak: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  resolved: PropTypes.object.isRequired,
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
