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

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Button } from '../components';
import CustomInput from './CustomInput';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  return {
    taskDesc: state.task.newTask.taskDesc,
    taskId: state.task.newTask.tid,
  };
};

const mapDispatchToProps = {
  closeModal: Actions.closeModal,
  editTaskDesc: Actions.editTaskDesc,
  editTask: Actions.editTask,
};

/* Components ==================================================================== */
class ModalEditTask extends Component {  

  onChangeDesc = text => this.props.editTaskDesc(text);

  onCloseHandler = () => {
    const { closeModal, editTaskDesc } = this.props;

    closeModal();
    editTaskDesc('');
  }

  onPressEditTask = () => {
    const { editTask, taskId, taskDesc } = this.props;

    editTask(taskId, taskDesc);
  }

  render() {
    const { isModalVisible, taskDesc } = this.props;

    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={this.onCloseHandler}
        animationIn="fadeIn"
        animationOut="fadeOut"
        avoidKeyboard
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
              <Text style={styles.headerText}>Edit task</Text>
            </View>
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
            <Button
              onPressButton={this.onPressEditTask}
            >
              Update
            </Button>            
          </Row>

        </Card>
      </Modal>
    );
  }
}

ModalEditTask.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,   
  taskDesc: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired, 
  editTaskDesc: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
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
});

/* Export ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTask);
