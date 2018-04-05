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
import { Header } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state.miscUi,
    users: state.workspace.users || {}
  };
};

const mapDispatchToProps = {
  fetchUsers: Actions.fetchUsers,
};

/* Components ==================================================================== */
class PageMain extends Component {  
  
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUsers = () => {
    const { users } = this.props;

    const arrayOfUsers = _.map(users, (val, uid) => {
      return { uid, ...val };
    });

    const tempData = [
      {
        name: 'Bob',
        uid: 'asdf',
      },
      {
        name: 'Barry',
        uid: 'jkl;',
      }
    ];
    return tempData.map(user => {
      return (
        <DailyHabitCard
          user={user}
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
  users: PropTypes.object.isRequired,
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
