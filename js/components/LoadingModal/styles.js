import { StyleSheet } from 'react-native';

const LoadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    innerContainer: {
        elevation: 5,
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        padding: 20,
        margin: 40,
        height: 150
    },
    spinner: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerText: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default LoadingStyles;