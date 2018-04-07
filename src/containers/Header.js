// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { connect } from 'react-redux';

// redux
import * as Actions from '../redux_actions';

// other
import { colors } from '../themes';
import { MODAL_ADD_TASK } from '../redux_actions/types';

/* Redux ==================================================================== */
const mapDispatchToProps = {
  openModal: Actions.openModal,
};

/* Components ==================================================================== */
class Header extends Component {
  render() {
    const { openModal } = this.props;

    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={80}
          tintColor={colors.primary2}
          backgroundColor="#3d5875"
        >
          {
            (fill) => (
              <View style={styles.wrapperProgressText}>
                <Text style={styles.progressTextTitle}>
                  Streak:
                </Text>            
                <Text style={styles.progressText}>
                  {`${Math.round(fill, 0)} days`}
                </Text>
              </View>
            )
          }
        </AnimatedCircularProgress>

        <View style={styles.wrapperHeadingContent}>
          <TouchableOpacity
            
            onPress={() => openModal(MODAL_ADD_TASK)}
          >
            <Text style={styles.textLink}>Add a daily</Text>
          </TouchableOpacity>
        </View>

      </View>    
    );
  }
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingTop: 8,
    marginBottom: 32,
    flexDirection: 'row',
  },
  wrapperProgressText: {
    alignItems: 'center',
  },
  progressTextTitle: {
    color: colors.primary2,
    fontSize: 12,
  },
  progressText: {
    color: colors.primary2,
    fontSize: 18,
  },
  wrapperHeadingContent: {
    paddingLeft: 8,
    flex: 1,
  },
  textLink: {
    fontSize: 15,
    color: colors.primary2,
    textDecorationLine: 'underline',
  }
});

/* Export ==================================================================== */
export default connect(null, mapDispatchToProps)(Header);
