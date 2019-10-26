import React from 'react';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import Detail from '../pages/Detail';
import History from '../pages/History';

const Navigator = FluidNavigator({
    home: {
        screen: History,
        navigationOptions: {
            header: null
        }
      },
      details: { 
          screen: Detail 
    },
});

class HistoryTransitions extends React.Component {
    static router = Navigator.router;
    render() {
        const {navigation} = this.props;
        return (
            <Navigator navigation={navigation}/>
        );
    }
}

export default HistoryTransitions;
