import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import t from 'tcomb-form-native';
import styles from './styles';
import LoadingModal from '../../components/LoadingModal';
import axios from 'axios';
import SpeechAndroid from 'react-native-android-voice';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import Storage from 'react-native-simple-store';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';

const { reset } = navigationActions;
const Form = t.form.Form;

const acctNoForm = t.struct({
	account_number: t.String
});


const acctNoFormOptions = {
	fields: {
		account_number: {
			placeholder: "Enter your account Number"
		}
	}
}

class Setup extends Component {
    constructor(props){
	super(props);
	this.state = {
		value: '',
        isAuthenticating: true,
        acctName: ''
	}
   }	

    _handleSubmit(){
		let value = this.refs.form.getValue();
		if (value) {
			this.setState({
				value:value.account_number
			})
		}
        Tts.speak('Thanks for that');
        Tts.speak('I am getting your name');
        axios.get(`http://voiceit.mybluemix.net/api/hackService/name/${this.state.value}`)
        .then((response) => {
            this.setState({
                acctName: response.data
            })
            Storage.save('name', response.data);
        })
        Tts.speak(`hi ${this.state.acctName}`);
        Tts.speak(`We are sending you an OTP`);

        axios.get(` http://voiceit.mybluemix.net/api/hackService/sendotp/${this.state.value}`)
        .then((response) => {
            if (response.data) {
                this.setState({
                    isAuthenticating: false
                })
                Tts.speak("Tell me the OTP that was sent to you, note, the api does not provide this.");
                this._handleOtpInput();
            }
            else {
                this.setState({
                    isAuthenticating: false
                })
            }
        })
	}
    

    _handleProcessSpech = (speech) => {
        
        if (speech) {
            Tts.speak("OTP validated");
            Storage.save('acct', this.state.value)
            Storage.save('setup', true).then(() => {
            this.props.dispatch(reset([{
                key: 'home',
                index: 0
            }], 'global'));
        });
        }

        else {
            // keyword was not detected in user's sentence
            this._handleResponseError("OTP not validated");
        }

    }

    _handleResponseError = (error) => {
        Tts.speak(error);
    }

    async _handleOtpInput(){
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("OTP", SpeechAndroid.ENGLISH);
            this._handleProcessSpech(spokenText);
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                    this._handleResponseError("Voice Recognizer cancelled")
                    break;
                case SpeechAndroid.E_NO_MATCH:
                    this._handleResponseError(`sorry ${this.state.userName}, your request can't be made now`);
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                    this._handleResponseError("A Google Server Error occured");
                    break;
                case SpeechAndroid.E_ACTIVITY_DOES_NOT_EXIST:
                    this._handleResponseError(` sorry ${this.state.userName}, There was a generic error on current activity not existing`);
                    break;
                case SpeechAndroid.E_FAILED_TO_SHOW_VOICE:
                    this._handleResponseError(`sorry ${this.state.userName}, The voice recognizer failed to initialize`);
                    break;
                case SpeechAndroid.E_AUDIO_ERROR:
                    this._handleResponseError(`sorry ${this.state.userName}, there was an error with audio recieved`);
                    break;
                case SpeechAndroid.E_NETWORK_ERROR:
                    this._handleResponseError(`sorry ${this.state.userName}, Network error while attempting connection with the server`);
                    break;
                default:
                    this._handleResponseError(`sorry ${this.state.userName}, an unknown error occured`);
                    break;
            }
        }
    }

    render() {
		return (
            <View style={styles.container}>
			    <Text style={{backgroundColor: '#800080', color: '#fff', 
				padding: 8, margin: 50, fontSize: 20, textAlign: 'center'}}>Setup Your Account Details</Text>
                <Form
					ref="form"
					type={acctNoForm}
					options={acctNoFormOptions}
				/>
                <TouchableHighlight onPress={this._handleSubmit.bind(this)} style={styles.button} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Validate Account Number</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(() => { return {}; }, mapDispatchToProps)(Setup);