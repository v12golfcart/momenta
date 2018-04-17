// libraries
import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';

// components
import { Row } from './Row';

// other
import { MODAL_EDIT_TASK } from '../redux_actions/types';
import { colors } from '../themes';

/* Components ==================================================================== */

class Daily extends Component {

  onPressToggleHotspot = () => {
    const { task, dates, toggleTask, binaryIsResolved, updateDailyStreak } = this.props;
    const taskId = task.tid;
    const newStreak = binaryIsResolved === 0 ? task.taskStreak + 1 : task.taskStreak - 1;

    toggleTask(taskId, dates.today, Math.abs(binaryIsResolved - 1));
    updateDailyStreak(taskId, newStreak);
  }

  onDeleteTask = () => {
    const { deleteTask, task, dates } = this.props;
    deleteTask(task.tid, dates.today);
  }

  onEditTask = () => {
    const { task, editTaskId, editTaskDesc, openModal } = this.props;
    editTaskId(task.tid);
    editTaskDesc(task.taskDesc);
    openModal(MODAL_EDIT_TASK);
  }
  
  getStyles = (mainStyle, resolvedStyle) => {
    const { binaryIsResolved } = this.props;

    const stylesToUse = [mainStyle];
    if (binaryIsResolved) { stylesToUse.push(resolvedStyle); }
    return stylesToUse;
  };

  renderSwipeoutButton = (buttonColor, buttonText) => {
    return (
      <View style={[styles.swipeoutButtonWrapper, { backgroundColor: buttonColor }]}>
        <Text style={styles.swipeoutButtonText}>{buttonText}</Text>
      </View>
    );
  }

  render() {
    const { task, } = this.props;
    const swipeoutBtns = [
      {
        component: this.renderSwipeoutButton(colors.secondary1, 'Delete'),
        onPress: this.onDeleteTask,
      },
      {
        component: this.renderSwipeoutButton('grey', 'Edit'),
        onPress: this.onEditTask,
      },      
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor="transparent"
        autoClose
      >
        <Row>
          <View style={styles.container}>

            <TouchableOpacity 
              style={styles.wrapperHotSpot}
              onPress={this.onPressToggleHotspot}
            >
              <View style={this.getStyles(styles.hotspotCircle, styles.hotspotCircleResolved)}>
                <View style={this.getStyles(styles.hotspotBorder, styles.hotspotBorderResolved)}>
                  <Icon 
                    name="done"
                    style={this.getStyles(styles.hotspotIcon, styles.hotspotIconResolved)} 
                  />
                </View>
              </View>        
            </TouchableOpacity>

            <View style={styles.wrapperStreak}>
              <Text style={styles.streak}>{task.taskStreak}</Text>
            </View>

            <View style={styles.wrapperText}>
              <Text style={styles.text}>{task.taskDesc}</Text>
            </View>

          </View>
        </Row>
      </Swipeout>      
    );
  }
}

Daily.propTypes = {
  task: PropTypes.shape({
    tid: PropTypes.string,
    taskDesc: PropTypes.string,
    taskStreak: PropTypes.number,
    taskUserId: PropTypes.string,
  }),
  tasks: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  resolved: PropTypes.object.isRequired,
  binaryIsResolved: PropTypes.number,
  toggleTask: PropTypes.func.isRequired,
  updateDailyStreak: PropTypes.func.isRequired,  
  deleteTask: PropTypes.func.isRequired,
  editTaskId: PropTypes.func.isRequired,
  editTaskDesc: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },

  // resolved hotspot
  wrapperHotSpot: {
    justifyContent: 'center',
  },  
  hotspotCircle: {
    backgroundColor: colors.backgroundDark,
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotCircleResolved: {
    backgroundColor: colors.primary1,
  },
  hotspotBorder: {
    width: 18,
    height: 18,
    borderColor: colors.primary1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 4,
    padding: 0,
  },
  hotspotBorderResolved: {
    borderColor: 'white',
  },
  hotspotIcon: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: -1,
    marginTop: -1,
    opacity: 0,    
  },
  hotspotIconResolved: {
    opacity: 1,
  },

  // streak section
  wrapperStreak: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streak: {
    color: colors.primary2,
    fontSize: 15,
  },

  // text section
  wrapperText: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.textMain
  },  

  // swipeout
  swipeoutButtonWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }  
});

/* Export ==================================================================== */
export { Daily };
