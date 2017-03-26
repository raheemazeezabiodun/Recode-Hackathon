import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';
import axios from 'axios';
import {
    client_id,
    client_secret,
    grant_type,
    API_URL
} from '../../utils';

const queryString = require('querystring');

const data = queryString.stringify({
        client_id,
        client_secret,
        grant_type
})


class Setup extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            otpInput: false,
            response: ''
        }
    }

    _handleSubmit() {
        let acctNumber = this.state.value;
        // make a call to account validation
        this.props.actions.fetchToken();
        axios.post(`${API_URL}/oauth/token`, data)
        .then((response) => {
            this.setState({
                response:response.data
            })
        }).catch((error) => {
            this.setState({
                response: error
            })
        })
        this.setState({
            value: ''
        })
        this.setState({
            otpInput: true
        })
        
    }
    

    _handleOtpInput = () => {
        const form = (
            <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this._handleOtpVerification(text)}
                value={this.state.text}
                placeholder="Enter the OTP sent to your phone"
            />
        )
    }

    _handleOtpVerification = (text) => {
        // if it true, dispatch to home scene
    }

    render() {
        const acctForm = (
            <View>
                <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({value: text})}
                        placeholder="Enter your account number"
                    />
                    <View style={{alignItems: 'center', marginTop: 30}}>
                        <TouchableHighlight onPress={this._handleSubmit.bind(this)}>
                            <Text style={{backgroundColor: '#800080', color: '#fff', padding: 5, textAlign: 'center'}}>Submit</Text>
                        </TouchableHighlight>
                    </View>
                </View>
        )

        const otpForm = (
            <View>
                <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({value: text})}
                        placeholder="Enter the OTP sent to you"
                    />
                    <View style={{alignItems: 'center', marginBottom: 80}}>
                        <TouchableHighlight onPress={this._handleSubmit.bind(this)}>
                            <Text style={{backgroundColor: '#800080', color: '#fff', padding: 5, textAlign: 'center'}}>Submit</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        )

        return (
            <View style={{marginBottom: 60}}>
                <Image source={require('../../../images/logo.png')}  style={{marginBottom: 40, alignItems: 'center'}}/>
                <Text style={{backgroundColor: '#800080', color: '#fff', padding: 10, margin: 20, fontSize: 20, textAlign: 'center'}}>Setup</Text>
                <Text>{JSON.stringify(this.state.response)}</Text>
                <Text>{this.props.token8}</Text>
                {this.state.otpInput ? otpForm : acctForm}
                
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        token: state.auth.token.access_token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);