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
  wrapperHeadingContent: {
    flex: 1,
  }
});

/* Export ==================================================================== */
export { Header };
