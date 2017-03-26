import { View, NavigationExperimental, BackAndroid, ToastAndroid } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import Setup from '../../containers/setup';
import Home from '../../containers/home';

import SplashPage from '../../components/splash';

const { popRoute, jumpTo, reset } = navigationActions;
const { CardStack: NavigationCardStack } = NavigationExperimental;
let backButtonPressedOnce = false;

class MainNavigation extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
    }

    handleBackAction = () => {
        let event;
        const globalLastRoute = this.props.navigation.routes.slice(-1)[0].key;

        if (globalLastRoute === 'home' && this.props.tabs.index === 0) {
            if (backButtonPressedOnce) {
                event = false;
            } else {
                backButtonPressedOnce = true;
                ToastAndroid.show('Press back again to leave', ToastAndroid.LONG);
                setTimeout(() => { backButtonPressedOnce = false; }, 4000);
                event = true;
            }
        }
        return event;
    };

    renderScene(props) {
        let Scene = null;

        switch (props.scene.route.key) {
            case 'setup':
                Scene = <Setup />;
                break;
            case 'home':
                Scene = <Home />;
                break;
            case 'splash':
                Scene = <SplashPage />;
                break;
            default:
                Scene = (
                    <SplashPage />
                );
                break;
        }

        return Scene;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationCardStack enableGestures={false}
                                     direction={'vertical'}
                                     navigationState={this.props.navigation}
                                     renderScene={this.renderScene.bind(this)}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

function mapStateToProps(state) {
    return {
        navigation: state.globalNavigator
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);