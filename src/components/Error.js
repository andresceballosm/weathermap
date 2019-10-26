import React from 'react'
import { Text,View, Image, StyleSheet } from 'react-native'

export const ErrorRender = (props) => {
    console.log(props)
    return (
        <View style={styles.container}>
            <Image style={styles.image}
            source={require('../../assets/error.png')}/>
            <Text style={{ color:'black', fontSize:20 }}>{ props.msg }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginVertical:10
    },  
    image: {
        alignItems:'center',
        height:200,
        justifyContent:'center',
        width:200
    },
})
