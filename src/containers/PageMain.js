// libraries
import React, { Component } from 'react';
import { 
  AppState, 
  StyleSheet, 
  View, 
  ScrollView,
  TouchableHighlight,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

// redux
import * as Actions from '../redux_actions';

// components
import DailyHabitCard from './DailyHabitCard';
import Header from './Header';
import { Spinner } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  return {
    isLoading: state.miscUi.isLoading.pageMain,
    dates: state.workspace.dates,    
    users: state.user.users || {},
    tasks: state.task.tasks || {},
    resolved: state.task.resolved || {},
    workspaceStreakDaily: state.workspace.workspaceStreaks.daily,
    workspaceResolvedDaily: state.workspace.workspaceResolvedDaily,
  };
};

const mapDispatchToProps = {
  fetchUsers: Actions.fetchUsers,
  fetchTasks: Actions.fetchTasks,
  fetchResolved: Actions.fetchResolved,
  updateDates: Actions.updateDates,
  updateDailyStreak: Actions.updateDailyStreak,
  setToLoading: Actions.setToLoading,
  fetchWorkspaceInfo: Actions.fetchWorkspaceInfo,
  fetchWorkspaceResolved: Actions.fetchWorkspaceResolved,
  workspaceStreakCheckDaily: Actions.workspaceStreakCheckDaily,
};

/* Components ==================================================================== */
class PageMain extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      appState: AppState.currentState,
      today: '',
    };
  }

  componentWillMount() {
    this.props.setToLoading('pageMain');
    this.props.fetchUsers(); // also sets pageMain loading to true
    this.props.fetchTasks();
    this.props.fetchResolved();
    this.props.fetchWorkspaceInfo();
    this.props.fetchWorkspaceResolved();
    this.props.updateDates(); // also sets page main loading to false
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps() {
    this.updateWorkspaceDatesAndStreaks();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  getCountResolved = () => {
    const { resolved, dates } = this.props;
    let countResolved = 0;
    
    if (resolved[dates.today]) {
      countResolved = Object.values(resolved[dates.today]).reduce((acc, val) => {
        acc += val.binaryIsResolved;
        return acc;
      }, 0);
    }

    return countResolved;
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.updateWorkspaceDatesAndStreaks();
    }
    this.setState({ appState: nextAppState });
  }

  updateWorkspaceDatesAndStreaks = () => {
    const { 
      dates, 
      updateDates, 
      tasks, 
      resolved, 
      updateDailyStreak,
      workspaceResolvedDaily,
      isLoading,
      workspaceStreakCheckDaily,
    } = this.props;

    const today = moment().add((this.state.counter), 'days').format('YYYYMMDD');
    if (today !== dates.today) {
      updateDates(this.state.counter);
      const yesterday = moment().add(this.state.counter - 1, 'days').format('YYYYMMDD');
      
      // update streaks for daily tasks
      _.map(tasks, (value, tid) => {
        if (resolved[yesterday] 
          && resolved[yesterday][tid] 
          && resolved[yesterday][tid].binaryIsResolved === 1) {
          return;
        }
        updateDailyStreak(tid, 0);
      });      

      // update streaks for group
      if (!isLoading 
        && (!workspaceResolvedDaily[yesterday] || workspaceResolvedDaily[yesterday] === 0)) {
        workspaceStreakCheckDaily(0, today, 0);
      }
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

  renderSpinner = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <Spinner 
          size="large"
        />
      );
    }
    return null;
  }

  render() {
    const { tasks, workspaceStreakDaily } = this.props;
    const countTasks = Math.max(Object.keys(tasks).length, 1);
    const countResolved = this.getCountResolved();

    return (
      <View style={styles.container}>
        <Header 
          countTasks={countTasks}
          countResolved={countResolved}
          workspaceStreakDaily={workspaceStreakDaily}
        />
        <View style={styles.wrapperScroll}>
          {this.renderSpinner()}
          <ScrollView>
            {this.renderUsers()}
          </ScrollView>
        </View>

        
        {/*
        FOR MESSING WITH DAYS*/}
        <TouchableHighlight
          onPress={() => {
            this.setState({ counter: this.state.counter + 1 }, this.updateWorkspaceDatesAndStreaks);
          }}
        >
          <Text style={{ color: 'white' }}>Sup</Text>
        </TouchableHighlight>
      
      </View>
    );
  }
}

PageMain.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  fetchResolved: PropTypes.func.isRequired,
  fetchWorkspaceInfo: PropTypes.func.isRequired,
  fetchWorkspaceResolved: PropTypes.func.isRequired,
  updateDates: PropTypes.func.isRequired,
  updateDailyStreak: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  resolved: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setToLoading: PropTypes.func.isRequired,
  workspaceStreakDaily: PropTypes.number,
  workspaceResolvedDaily: PropTypes.object,
  workspaceStreakCheckDaily: PropTypes.func.isRequired,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
    paddingTop: 10,
  },
  wrapperScroll: {
    flex: 1,
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
