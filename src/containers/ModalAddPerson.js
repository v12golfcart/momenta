// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
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
    newUserName: state.user.newUserName
  };
};

const mapDispatchToProps = {
  closeModal: Actions.closeModal,
  editUserName: Actions.editUserName,
  addUser: Actions.addUser,
};

/* Components ==================================================================== */
class ModalAddPerson extends Component {  
  
  onChangeName = text => this.props.editUserName(text);

  onCloseHandler = () => {
    const { closeModal, editUserName } = this.props;

    closeModal();
    editUserName('');
  }

  onPressAddUser = () => {
    const { addUser, newUserName } = this.props;

    addUser({ name: newUserName });
  }

  render() {
    const { isModalVisible, newUserName } = this.props;

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
              <Text style={styles.headerText}>Add person to workspace</Text>
            </View>
          </Row>

          <Row>
            <CustomInput 
              value={newUserName}
              title="Name"
              placeholder="Richard Cockburn"
              onChangeText={this.onChangeName}
            />
          </Row>

          <Row>
            <Button
              onPressButton={this.onPressAddUser}
            >
              Add
            </Button>            
          </Row>

        </Card>
      </Modal>
    );
  }
}

ModalAddPerson.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,   
  newUserName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired, 
  editUserName: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddPerson);
