// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

// redux
import * as Actions from '../redux_actions';

// components
import { Card, Row } from '../components';

// other
import { colors } from '../themes';

/* Redux ==================================================================== */
const mapDispatchToProps = {
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class SettingsPeopleCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>

          <View style={styles.wrapperCardContent}>
            <Text style={styles.title}>People in workspace:</Text>
            <Row>
                <TouchableOpacity 
                  style={styles.wrapperAdd}
                  onPress={() => this.props.openModal('test')}
                >
                  <LinearGradient 
                    colors={[colors.primary1, colors.primary2]} 
                    style={styles.linearGradient}
                  >
                    <Icon name="add" style={styles.iconAdd} />
                  </LinearGradient>
                </TouchableOpacity>
            </Row>
          </View>

        </Card>
      </View>
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
  wrapperCardContent: {
    padding: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    color: colors.secondary1,
  },
  wrapperAdd: {
    flexDirection: 'row', 
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 25 / 2,
    alignItems: 'center',
    padding: 4,
  },
  iconAdd: {
    fontSize: 24,
    color: '#fff',
  },  
});

/* Export ==================================================================== */
export default connect(null, mapDispatchToProps)(SettingsPeopleCard);
