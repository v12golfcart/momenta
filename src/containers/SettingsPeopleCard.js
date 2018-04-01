// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Button } from '../components';

// other
import { colors } from '../themes';
import { MODAL_ADD_PERSON } from '../redux_actions/types';

/* Redux ==================================================================== */
const mapDispatchToProps = {
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class SettingsPeopleCard extends Component {
  render() {
    return (
        <Card>

          <Row>
            <Text style={styles.title}>People in workspace:</Text>
          </Row>

          <Row>
            <Button
              onPressButton={() => this.props.openModal(MODAL_ADD_PERSON)}
            >
              <Icon name="add" style={styles.iconAdd} />
            </Button>
          </Row>

        </Card>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  },
  iconAdd: {
    fontSize: 24,
    color: '#fff',
  },  
});

/* Export ==================================================================== */
export default connect(null, mapDispatchToProps)(SettingsPeopleCard);
