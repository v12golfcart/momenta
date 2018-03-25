// libs
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

// components
import PageMain from './containers/PageMain';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

      <Scene key="main">
        <Scene 
          initial
          hideNavBar
          rightTitle="Next"
          onRight={() => Actions.secondPage()}
          key="firstPage"
          component={PageMain}
          title="First Page"
        />
      </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;
