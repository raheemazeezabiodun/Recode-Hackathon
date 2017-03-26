import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './js/stores';
import MainNavigation from './js/containers/mainNavigation';

const store = configureStore();


export default class AccessVoice extends Component {
    render() {
        return (
                <Provider store={store}>
                        <MainNavigation />
                </Provider>
        );
    }
}

