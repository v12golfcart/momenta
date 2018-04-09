// libraries
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row, Button } from '../components';

// other
import { colors } from '../themes';
import { MODAL_ADD_PERSON } from '../redux_actions/types';

/* Redux ==================================================================== */
const mapSateToProps = state => {
  return {
    users: state.user.users
  };
};

const mapDispatchToProps = {
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class SettingsPeopleCard extends Component {
  
  renderUsers = () => {
    const { users } = this.props;

    const arrayOfUsers = _.map(users, (val, uid) => {
      return { uid, ...val };
    });

    return arrayOfUsers.map(user => {
      return (
        <Row
          additionalStyles={styles.additionalRowStyles}
          key={user.uid}
        >
          <Text style={styles.text}>{user.name}</Text>
        </Row>
      );
    });      
  }

  render() {
    return (
        <Card>

          <Row>
            <Text style={styles.title}>People in workspace:</Text>
          </Row>

          {this.renderUsers()}

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

SettingsPeopleCard.propTypes = {
  users: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  additionalRowStyles: { 
    borderBottomWidth: 1, 
    borderColor: colors. backgroundDark,
  },
  iconAdd: {
    fontSize: 24,
    color: '#fff',
  },  
});

/* Export ==================================================================== */
export default connect(mapSateToProps, mapDispatchToProps)(SettingsPeopleCard);
