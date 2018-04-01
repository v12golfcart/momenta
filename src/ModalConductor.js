// libs
import React, { Component } from 'react';
import { View } from 'react-native';

// redux
import { connect } from 'react-redux';

// components
import ModalAddPerson from './containers/ModalAddPerson';

// other
import { MODAL_ADD_PERSON } from './redux_actions/types';

/* Redux ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state.miscUi
  };
};

/* Components ==================================================================== */
class ModalConductor extends Component {
  renderModal = (isModalVisible, modalType) => {
    switch (modalType) {
      
      case MODAL_ADD_PERSON:
        return (
          <ModalAddPerson 
            isModalVisible={isModalVisible}
          />
        );

      default:
        return <View />;
    }
  }

  render() {
    const { isModalVisible, modalType } = this.props.miscUi;
    //console.log('modal conductor props', this.props);
    return (
      <View>
        {this.renderModal(isModalVisible, modalType)}
      </View>
    );
  }
}

/* Export ==================================================================== */
export default connect(mapStateToProps, null)(ModalConductor);
