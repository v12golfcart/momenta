// libraries
import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
    users: state.workspace.users || {},
    tasks: state.workspace.tasks || {},
  };
};

const mapDispatchToProps = {
  fetchUsers: Actions.fetchUsers,
  fetchTasks: Actions.fetchTasks,
};

/* Components ==================================================================== */
class PageMain extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      userTasks: {}
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchTasks();
  }

  renderUsers = () => {
    const { users, tasks } = this.props;

    const arrayOfUsers = _.map(users, (val, uid) => {
      return { uid, ...val };
    });

    return arrayOfUsers.map(user => {
      return (
        <DailyHabitCard
          user={user}
          users={users}
          tasks={tasks}
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
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
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
