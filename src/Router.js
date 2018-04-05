// libs
import React from 'react';
import { Scene, Router, Lightbox } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

// components
import PageMain from './containers/PageMain';
import PageSettings from './containers/PageSettings';
//import { Template } from './components';

// other 
import { colors } from './themes';

/* Components ==================================================================== */
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
  backButtonText: {
    color: 'white',
  },
  headerTitle: {
    color: colors.primary2,
  }
});

/* Export ==================================================================== */
export default RouterComponent;
