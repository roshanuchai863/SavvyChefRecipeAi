import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Add an iconSet prop to allow specifying which icon set to use
export default function CameraButton({ title, onPress, icon, color, iconSet = 'Entypo' }) {
    const renderIcon = () => {
        const iconProps = {
            name: icon,
            size: 35,
            color: color ? color : '#EE7214',
        };

        switch (iconSet) {
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons {...iconProps} />;
            case 'Ionicons':
                return <Ionicons {...iconProps} />;
            case 'Entypo':
            default:
                return <Entypo {...iconProps} />;
        }
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {renderIcon()}
            {/* <Text style = {styles.text}>{title}</Text> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#EE7214",
        borderWidth: 2,
        padding: 2,
        borderRadius: 40,
    },
    // text :{
    //     fontWeight:"bold",
    //     color:'#000000',
    //     fontSize:18,
    //     alignItems:'center',
    //     marginLeft:10,
    //     justifyContent:'center'
    // },
});
