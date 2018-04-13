// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// redux
import * as Actions from '../redux_actions';

// other
import { colors } from '../themes';
import { MODAL_ADD_TASK } from '../redux_actions/types';

/* Redux ==================================================================== */
const mapStateToProps = state => {
  return {
    tasks: state.task.tasks,
    resolved: state.task.resolved,
    dates: state.workspace.dates,
  };
};

const mapDispatchToProps = {
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class Header extends Component {
  getCountResolved = () => {
    const { resolved } = this.props;
    const today = moment().format('YYYYMMDD');
    let countResolved = 0;
    
    if (resolved[today]) {
      countResolved = Object.values(resolved[today]).reduce((acc, val) => {
        acc += val.binaryIsResolved;
        return acc;
      }, 0);
    }

    return countResolved;
  }

  render() {
    const { openModal, tasks, dates } = this.props;
    const countTasks = Math.max(Object.keys(tasks).length, 1);
    const countResolved = this.getCountResolved();

    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={(countResolved / countTasks) * 100}
          tintColor={colors.primary2}
          backgroundColor="#3d5875"
        >
          {
            (fill) => (
              <View style={styles.wrapperProgressText}>
                <Text style={styles.progressTextTitle}>
                  Streak:
                </Text>            
                <Text style={styles.progressText}>
                  {`${Math.round(2, 0)} days`}
                </Text>
              </View>
            )
          }
        </AnimatedCircularProgress>

        <View style={styles.wrapperHeadingContent}>
          <TouchableOpacity
            
            onPress={() => openModal(MODAL_ADD_TASK)}
          >
            <Text style={styles.textLink}>Add a daily</Text>
          </TouchableOpacity>
        </View>

      </View>    
    );
  }
}

Header.propTypes = {
  tasks: PropTypes.object.isRequired,
  resolved: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
  },
  wrapperProgressText: {
    alignItems: 'center',
  },
  progressTextTitle: {
    color: colors.primary2,
    fontSize: 12,
  },
  progressText: {
    color: colors.primary2,
    fontSize: 18,
  },
  wrapperHeadingContent: {
    paddingLeft: 8,
    flex: 1,
  },
  textLink: {
    fontSize: 15,
    color: colors.primary2,
    textDecorationLine: 'underline',
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Header);
