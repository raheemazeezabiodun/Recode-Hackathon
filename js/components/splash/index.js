import React, { Component } from 'react';
import { Text, View, Image,ToastAndroid, Linking, Alert, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import Storage from 'react-native-simple-store';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import SplashStyles from './styles';

const { reset } = navigationActions;
const logo = require('../../../images/logo.png');


class SplashPage extends Component {
    
    componentDidMount() {
        setTimeout(() => {
            Storage.get('setup').then((introWatched) => {
                const nextScreen = introWatched ? 'setup' : 'setup';
                this.props.dispatch(reset([{
                    key: nextScreen,
                    index: 0
                    }], 'global'));
                });
            }, 5000);
        }

    render() {
        return (
            <View style={SplashStyles.container}>
            <Text style={SplashStyles.title}>Voice It</Text>
                <Image source={logo} style={SplashStyles.logoIcon} />
                
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(() => { return {}; }, mapDispatchToProps)(SplashPage);