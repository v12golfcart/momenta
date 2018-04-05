// libraries
import React, { Component } from 'react';
import { 
  StyleSheet, 
  View 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

// components
import { Row } from './Row';

// other
import { colors } from '../themes';

/* Components ==================================================================== */

class Daily extends Component {
  
  getStyles = (mainStyle, resolvedStyle) => {
    const { isResolved } = this.props;

    const stylesToUse = [mainStyle];
    if (isResolved) { stylesToUse.push(resolvedStyle); }
    return stylesToUse;
  };

  render() {

    return (
      <Row>
        <View style={styles.container}>

          <View style={styles.wrapperHotSpot}>
            <View style={this.getStyles(styles.hotspotCircle, styles.hotspotCircleResolved)}>
              <View style={this.getStyles(styles.hotspotBorder, styles.hotspotBorderResolved)}>
                <Icon 
                  name="done"
                  style={this.getStyles(styles.hotspotIcon, styles.hotspotIconResolved)} 
                />
              </View>
            </View>        
          </View>

          <View style={styles.wrapperStreak}>
          </View>

          <View style={styles.wrapperText}>
          </View>

        </View>
      </Row>
    );
  }
}

Daily.propTypes = {
  isResolved: PropTypes.bool,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // main sections
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  wrapperHotSpot: {
  },
  wrapperStreak: {
    backgroundColor: 'lightblue',
    width: 44,
  },
  wrapperText: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  // resolved hotspot
  hotspotCircle: {
    backgroundColor: colors.backgroundDark,
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotCircleResolved: {
    backgroundColor: colors.primary1,
  },
  hotspotBorder: {
    width: 18,
    height: 18,
    borderColor: colors.primary1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 4,
    padding: 0,
  },
  hotspotBorderResolved: {
    borderColor: 'white',
  },
  hotspotIcon: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: -1,
    marginTop: -1,
    opacity: 0,    
  },
  hotspotIconResolved: {
    opacity: 1,
  }
});

/* Export ==================================================================== */
export { Daily };
