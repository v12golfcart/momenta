// libraries
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

// components
import SettingsPeopleCard from './SettingsPeopleCard';
import { Card, Button } from '../components';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
class PageSettings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SettingsPeopleCard />
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
  }
});

/* Export ==================================================================== */
export default PageSettings;
