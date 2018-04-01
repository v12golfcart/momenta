// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

// redux
import * as Actions from '../redux_actions';

// components
import { Card } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapDispatchToProps = {
  closeModal: Actions.closeModal,
};

/* Components ==================================================================== */
class ModalAddPerson extends Component {  
  render() {
    const { isModalVisible, closeModal } = this.props;

    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
      >
        <Card>
          <Text>Sup</Text>
          <TouchableHighlight onPress={closeModal}>
            <Text>Close</Text>
          </TouchableHighlight>
        </Card>
      </Modal>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({

});

/* Export ==================================================================== */
export default connect(null, mapDispatchToProps)(ModalAddPerson);
