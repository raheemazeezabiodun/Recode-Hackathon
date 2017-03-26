import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';
import LoadingStyles from './styles';


export default class LoadingModal extends Component {
    static propTypes = {
        visible: React.PropTypes.bool,
        message: React.PropTypes.string
    };

    renderLoadingMessage = () => {
        let message = null;

        if (this.props.message) {
            message = (
                <Text style={LoadingStyles.spinnerText}>
                    {this.props.message}
                </Text>
            );
        }

        return message;
    };

    render() {
        return (
            <View>
                <Modal animationType={'fade'}
                       visible={this.props.visible}
                       transparent
                       onRequestClose={console.log('closed')}
                >
                    <View style={LoadingStyles.container}>
                        <View style={LoadingStyles.innerContainer}>
                            <View style={LoadingStyles.spinner}>
                                <ActivityIndicator size="large" color={'#3C7B8D'} />
                                {this.renderLoadingMessage()}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}