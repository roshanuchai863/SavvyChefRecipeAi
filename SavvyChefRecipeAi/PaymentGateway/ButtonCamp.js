//import liraries
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';


const ButtonComp = ({
    text = 'Process Payment',
    onPress = () => { },
    disabled = false,
    btnStyle = {},
    isLoading = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container,
                backgroundColor: !disabled ? '#EE7214' : 'grey',
                ...btnStyle,

            }}
            disabled={disabled}
        >
            {isLoading ? <ActivityIndicator size={'small'} /> : <Text style={styles.textStyle}>{text}</Text>}


        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 60,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
});

//make this component available to the app
export default ButtonComp;