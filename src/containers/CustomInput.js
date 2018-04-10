// libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// redux

// other
import { colors } from '../themes';

/* Redux ==================================================================== */
const mapStateToProps = state => {
  return {
    miscUi: state.miscUi
  };
};

/* Components ==================================================================== */
class CustomInput extends Component {
  render() {
    const { value, title, placeholder, onChangeText } = this.props;
    const keyboardType = this.props.keyboardType ? this.props.keyboardType : "default";
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput 
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'rgba(255, 255, 255, 0.24)'}
          autoCorrect={false}
          selectionColor={colors.primary1}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          returnKeyType="done"
        />
      </View>
    );
  }
}

CustomInput.propTypes = { 
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
  },
  title: {
    fontSize: 12,
    color: colors.primary2,
  },
  textInput: {
    marginTop: 1,
    fontSize: 18,
    color: 'white',
  }
});

/* Export ==================================================================== */
export default connect(mapStateToProps, null)(CustomInput);
