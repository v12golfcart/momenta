// libs
import React from 'react';
import { Scene, Router, Lightbox, Actions } from 'react-native-router-flux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import PageMain from './containers/PageMain';
import PageSettings from './containers/PageSettings';
//import { Template } from './components';

// other 
import { colors } from './themes';

/* Components ==================================================================== */
const renderSettingsIcon = () => (
  <TouchableOpacity
    onPress={() => Actions.settings()}
    style={styles.wrapperSettings}
  >
    <Icon name="settings" style={styles.iconSettings} />
  </TouchableOpacity>
);

const RouterComponent = () => {
  return (
    <Router>
      <Lightbox>
        <Scene key="root" hideNavBar>
          <Scene key="main">
            <Scene 
              initial
              key="firstPage"
              title="Grit Workspace"
              navigationBarStyle={styles.navBar}
              titleStyle={styles.headerTitle}
              navBarButtonColor={colors.primary2}
              renderRightButton={renderSettingsIcon}
              component={PageMain}
            />
            <Scene
              key="settings"
              component={PageSettings}
              title="Settings"
              navigationBarStyle={styles.navBar}
              titleStyle={styles.headerTitle}
              navBarButtonColor={colors.primary2}
            />        
          </Scene>
        </Scene>
      </Lightbox>
    </Router>
  );
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.backgroundDark, 
  },
  wrapperSettings: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    color: 'white',
  },
  headerTitle: {
    color: colors.primary2,
  },
  iconSettings: {
    fontSize: 24,
    color: colors.primary2,
  },
  test: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
  }
});

/* Export ==================================================================== */
export default RouterComponent;
