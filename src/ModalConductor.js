// libs
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

// redux
import { connect } from 'react-redux';

/* Redux ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state.miscUi
  };
};

/* Components ==================================================================== */
class ModalConductor extends Component {
  render() {
    const { isModalVisible, modalType } = this.props.miscUi;
    //console.log('modal conductor props', this.props);

    return (
      <Modal
        isVisible={isModalVisible}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text>Sup</Text>
        </View>
      </Modal>
    );
  }
}

/* Export ==================================================================== */
export default connect(mapStateToProps, null)(ModalConductor);
