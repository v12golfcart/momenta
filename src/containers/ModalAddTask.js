// libraries
import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import _ from 'lodash';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Button } from '../components';
import CustomInput from './CustomInput';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  const arrayOfUsers = _.map(state.user.users, (val, uid) => {
    return { uid, ...val };
  });
  
  return {
    arrayOfUsers,
    taskDesc: state.task.newTask.taskDesc,
    taskUserId: state.task.newTask.taskUserId,
    taskStreak: state.task.newTask.taskStreak,
  };
};

const mapDispatchToProps = {
  closeModal: Actions.closeModal,
  editTaskDesc: Actions.editTaskDesc,
  editTaskUserId: Actions.editTaskUserId,
  editTaskStreak: Actions.editTaskStreak,
  addTask: Actions.addTask,
  testQuery: Actions.testQuery,
};

/* Components ==================================================================== */
class ModalAddTask extends Component {  
  
  onChangeDesc = text => this.props.editTaskDesc(text);
  onChangeUser = userId => this.props.editTaskUserId(userId);
  onChangeStreak = numStr => {
    const num = numStr === '' ? 0 : parseInt(numStr, 10);
    this.props.editTaskStreak(num);
  }

  onCloseHandler = () => {
    const { closeModal, editTaskDesc } = this.props;

    closeModal();
    editTaskDesc('');
  }

  onPressAddTask = () => {
    const { addTask, arrayOfUsers, taskUserId, taskDesc, taskStreak } = this.props;

    const taskUserIdFixed = taskUserId === '' ? arrayOfUsers[0].uid : taskUserId;
    addTask({ 
      taskUserId: taskUserIdFixed, 
      taskDesc, 
      taskStreak: parseInt(taskStreak, 10),
      isDoneToday: false,
    });
  }

  renderPickerItems = () => {
    const { arrayOfUsers } = this.props;

    return arrayOfUsers.map(user => {
      return (
        <Picker.Item label={user.name} value={user.uid} key={user.uid} />
      );
    });
  }

  render() {
    const { isModalVisible, taskUserId, taskDesc, taskStreak } = this.props;

    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={this.onCloseHandler}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <Card>
          <Row>
            <TouchableOpacity
              style={styles.wrapperIconClose}
              onPress={this.onCloseHandler}
            >
              <Icon name="close" style={styles.iconClose} />
            </TouchableOpacity>
          </Row>

          <Row>
            <View style={styles.header}>
              <Text style={styles.headerText}>Add a daily habit</Text>
            </View>
          </Row>

          <Row
            additionalStyles={styles.pickerRow}
          >
            <Picker
              selectedValue={taskUserId}
              onValueChange={this.onChangeUser}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {this.renderPickerItems()}
            </Picker>
          </Row>

          <Row>
            <CustomInput 
              value={taskDesc}
              title="Description"
              placeholder="Do a thing"
              onChangeText={this.onChangeDesc}
            />
          </Row>

          <Row>
            <CustomInput 
              value={taskStreak}
              title="Existing streak (optional)"
              placeholder="0"
              onChangeText={this.onChangeStreak}
              keyboardType="numeric"
            />
          </Row>

          <Row>
            <Button
              onPressButton={this.onPressAddTask}
            >
              Add
            </Button>            
          </Row>

        </Card>
      </Modal>
    );
  }
}

ModalAddTask.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,   
  arrayOfUsers: PropTypes.array.isRequired,
  taskDesc: PropTypes.string.isRequired,
  taskUserId: PropTypes.string.isRequired,
  taskStreak: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired, 
  editTaskDesc: PropTypes.func.isRequired,
  editTaskUserId: PropTypes.func.isRequired,
  editTaskStreak: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  wrapperIconClose: {
    marginLeft: 'auto',
  },
  iconClose: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.24)',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: colors.primary2,
  },
  pickerRow: {
    flexDirection: 'column',
    padding: 0,
  },
  picker: {
  },
  pickerItem: {
    color: colors.textMain,
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddTask);
