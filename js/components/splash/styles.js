import { StyleSheet } from 'react-native';

const SplashStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: '#800080',
        fontFamily: 'sans-serif',
        marginBottom: 40
    },
    version: {
        fontSize: 10,
        color: '#cccccc'
    }
});

export default SplashStyles;