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
  const arrayOfUsers = _.map(state.workspace.users, (val, uid) => {
    return { uid, ...val };
  });
  
  return {
    arrayOfUsers,
    newTaskDesc: state.task.newTaskDesc,
    newTaskUser: state.task.newTaskUser,
    newTaskStreak: state.task.newTaskStreak,
  };
};

const mapDispatchToProps = {
  closeModal: Actions.closeModal,
  editTaskDesc: Actions.editTaskDesc,
  editTaskUser: Actions.editTaskUser,
  editTaskStreak: Actions.editTaskStreak,
  addTask: Actions.addTask,
};

/* Components ==================================================================== */
class ModalAddTask extends Component {  
  
  onChangeDesc = text => this.props.editTaskDesc(text);
  onChangeUser = userId => this.props.editTaskUser(userId);
  onChangeStreak = num => this.props.editTaskStreak(num);

  onCloseHandler = () => {
    const { closeModal, editTaskDesc } = this.props;

    closeModal();
    editTaskDesc('');
  }

  onPressAddTask = () => {
    const { addTask, arrayOfUsers, newTaskUser, newTaskDesc, newTaskStreak } = this.props;

    const newTaskUserFixed = newTaskUser === '' ? arrayOfUsers[0].uid : newTaskUser;
    addTask({ 
      newTaskUser: newTaskUserFixed, 
      newTaskDesc, 
      newTaskStreak,
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
    const { isModalVisible, newTaskUser, newTaskDesc, newTaskStreak } = this.props;
    
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
              selectedValue={newTaskUser}
              onValueChange={this.onChangeUser}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {this.renderPickerItems()}
            </Picker>
          </Row>

          <Row>
            <CustomInput 
              value={newTaskDesc}
              title="Description"
              placeholder="Do a thing"
              onChangeText={this.onChangeDesc}
            />
          </Row>

          <Row>
            <CustomInput 
              value={newTaskStreak}
              title="Existing streak (optional)"
              placeholder="0"
              onChangeText={this.onChangeStreak}
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
  newTaskDesc: PropTypes.string.isRequired,
  newTaskUser: PropTypes.string.isRequired,
  newTaskStreak: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired, 
  editTaskDesc: PropTypes.func.isRequired,
  editTaskUser: PropTypes.func.isRequired,
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
