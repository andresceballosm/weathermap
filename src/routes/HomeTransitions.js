import React from 'react';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

const Navigator = FluidNavigator({
    home: { screen: Home },
    details: { screen: Detail },
});

class HomeTransitions extends React.Component {
    static router = Navigator.router;
    render() {
        const {navigation} = this.props;
        return (
            <Navigator navigation={navigation}/>
        );
    }
}

export default HomeTransitions;
