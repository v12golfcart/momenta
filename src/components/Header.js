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
      </View>

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
  iconSettings: {
    fontSize: 24,
    color: colors.primary2,
  },
  wrapperHeadingContent: {
    flex: 1,
  },
  wrapperSettings: {
    marginRight: 16,
    marginLeft: 'auto',
  }
});

/* Export ==================================================================== */
export { Header };
