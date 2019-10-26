import React from 'react'
import { Text, View,StyleSheet, Image } from 'react-native'

const validateImage = (item) => {
    switch (item) {
        case 'Humidity':
            return require('../../assets/humidity.png')
        case 'Pressure':
            return require('../../assets/pressure.png')
        case 'Temp Min':
            return require('../../assets/tempmin.png')
        case 'Temp Max':
            return require('../../assets/tempmax.png')
        default:
            break;
    }
}
export const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.textView}>
                <Text style={styles.textTitle}>{ props.title }</Text>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>{ props.subtitle }</Text>
            </View>
            <View style={styles.textView}>
                <Image style={styles.image} source={validateImage(props.title)}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        flex:1, 
        marginTop:10, 
        marginBottom:10,
        marginLeft:7, 
        marginRight:7,
        backgroundColor:'rgba(200, 200, 200, 0.7)',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        borderRadius:10
    },
    textTitle:{
        color:'#636363',
        fontSize:16,
        fontFamily:'Ubuntu-Bold',
    },
    text:{
        color:'#636363',
        fontSize:16 ,
        fontFamily:'Ubuntu-Bold',
    },
    textView:{
        marginVertical:10
    },
    image:{
        width:30,
        height:30
    }
})