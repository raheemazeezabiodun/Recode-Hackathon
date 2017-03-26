import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            keyword: 'balance',
            acctNo: ''
        }
    }

    componentDidMount() {
        Storage.get('acct').then((acct) => {
            this.setState({
                acctNo: acct
            })
        })

        Storage.get('name').then((name) => {
            this.setState({
                userName: name
            })
        })
    }
    
    _handleProcessSpech = (speech) => {
        if (speech.indexOf(this.state.keyword)) {
            // make request
            // parse result to _haasyncndleEndpointResponse
            Tts.speak("I got your request, i will make an enquiry for you");
            axios.get(`http://voiceit.mybluemix.net/api/hackService/name/${this.state.acctNo}`)
            .then((response) => {
                this.setState({
                    userName: response.data
                })
            })
            .catch((error) => {
                Tts.speak('error getting your name');
            })
            // for demo
            
            axios.get(`http://voiceit.mybluemix.net/api/hackService/balance/${this.state.acctNo}`)
            .then((response) => {
                reply = `Hi ${this.state.userName}, your account balance is ${response.data} Naira`;
                Tts.speak(reply);
            })
            .catch((error) => {
                Tts.speak(error.response);
            })
        }

        else {
            // keyword was not detected in user's sentence
            let responseError = `Sorry ${this.state.userName}, we cannot make your request now, try saying what is my account balance?`;
            this._handleResponseError(responseError);
        }

    }

    _handleResponseError = (error) => {
        Tts.speak(error);
    }

    _handleEndpointResponse = (response) => {
        // check if response was success
        // if success, speak it to the user,
        // if not successful, speak it to the user with the error(meaningful)
    }

    async _handleSpeech(){
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Speak", SpeechAndroid.ENGLISH);
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
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>Access Voice</Text>
                <TouchableHighlight onPress={this._handleSpeech.bind(this)} style={{backgroundColor: '#800080', color: '#fff', padding: 8, margin: 10}}>
                    <Text style={{color: '#fff'}}>Tap to speak</Text>
                </TouchableHighlight>
            </View>
        )
    }
}