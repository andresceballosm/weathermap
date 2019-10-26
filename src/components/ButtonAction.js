import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export const ButtonAction = (props) => {
    return (
        <TouchableOpacity 
        activeOpacity={ props.invalid ? 1 : 0.3 } 
        disabled={props.invalid} 
        style={[styles.button, { backgroundColor: props.color}]}
        onPress={()=>{ props.click()}} >
            <Text style={styles.text}>{ props.title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems:'center',
        height:45,
        borderRadius:20,
        justifyContent:'center',
        width:200
    },
    text:{
         color:'white', 
         fontSize:20,
         fontFamily:'Ubuntu-Bold'
    }
})
