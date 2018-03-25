// libraries
import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux';

// components
import DailyHabitCard from './DailyHabitCard';

// other
import { colors } from '../themes';

/* Components ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state
  };
};

/* Components ==================================================================== */
class PageMain extends Component {  
  render() {
    console.log('first page props', this.props);
    return (
      <View style={styles.container}>
        <DailyHabitCard />
        <DailyHabitCard />
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
    paddingTop: 10,
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, null)(PageMain);
