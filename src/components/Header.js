// libraries
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const Header = (props) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={100}
        width={8}
        fill={80}
        tintColor={colors.primary1}
        backgroundColor="#3d5875"
      >
        {
          (fill) => (
            <Text style={styles.progressText}>
              {`${Math.round(fill, 0)} days`}
            </Text>
          )
        }
      </AnimatedCircularProgress>

      <View style={styles.wrapperSettings}>
        <TouchableOpacity 
          onPress={() => Actions.settings()}
        >
          <Icon name="settings" style={styles.iconSettings} />
        </TouchableOpacity>
      </View>
    </View>    
  );
};


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingTop: 8,
    marginBottom: 32,
    flexDirection: 'row',
  },
  progressText: {
    color: colors.primary1,
    fontSize: 15,
  },
  iconSettings: {
    fontSize: 24,
    color: colors.primary2,
  },
  wrapperSettings: {
    marginRight: 16,
    marginLeft: 'auto',
  }
});

/* Export ==================================================================== */
export { Header };
