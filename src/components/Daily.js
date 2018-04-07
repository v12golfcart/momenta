// libraries
import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  TouchableOpacity,
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
    const { description } = this.props;

    return (
      <Row>
        <View style={styles.container}>

          <TouchableOpacity 
            style={styles.wrapperHotSpot}
            onPress={() => console.log('resolver')}
          >
            <View style={this.getStyles(styles.hotspotCircle, styles.hotspotCircleResolved)}>
              <View style={this.getStyles(styles.hotspotBorder, styles.hotspotBorderResolved)}>
                <Icon 
                  name="done"
                  style={this.getStyles(styles.hotspotIcon, styles.hotspotIconResolved)} 
                />
              </View>
            </View>        
          </TouchableOpacity>

          <View style={styles.wrapperStreak}>
            <Text style={styles.streak}>3</Text>
          </View>

          <View style={styles.wrapperText}>
            <Text style={styles.text}>{description}</Text>
          </View>

        </View>
      </Row>
    );
  }
}

Daily.propTypes = {
  isResolved: PropTypes.bool,
  description: PropTypes.string,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },

  // resolved hotspot
  wrapperHotSpot: {
    justifyContent: 'center',
  },  
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
  },

  // streak section
  wrapperStreak: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streak: {
    color: colors.primary2,
    fontSize: 15,
  },

  // text section
  wrapperText: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.textMain
  },  
});

/* Export ==================================================================== */
export { Daily };
