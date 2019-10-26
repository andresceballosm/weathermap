import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    Dimensions,
    StyleSheet,
    Platform,
    AsyncStorage,
    ImageBackground } from 'react-native';
import { Transition} from 'react-navigation-fluid-transitions';
import { Header } from 'react-navigation';
import { Card } from '../components/Card';
import { validateColor } from '../utils/validateColor';
import { MapsComponent } from '../components/MapsComponent';

let screenWidth = Dimensions.get('window').width;

export default class Detail extends Component {
    state={
        weather:null
    }
    componentWillMount(){
        const data = this.props.navigation.getParam('item', '');
        const origin = this.props.navigation.getParam('origin', '');
        if(origin === 'home'){
            _saveData(data)
        }
    }
    render() {
        const weather = this.props.navigation.getParam('item', '');
        return (
            <View style={styles.DetailMainContainer}>
            <Transition shared={weather}>
                <ImageBackground 
                source={validateColor(weather.weather[0].main)} 
                style={ styles.detailTopContainer }
                imageStyle= {{opacity:0.5}}
                >
                    <View style={styles.navigationHeaderContainer}>
                        <TouchableOpacity 
                            onPress={() => {
                                this.props.navigation.navigate('home')
                            }}>
                        <Image style={{width:30, height:30}}
                            source={require('../../assets/downblack.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{weather.main.temp}°K</Text>
                    
                        {this.renderContent(weather.main)} 
                   
                    <View style={styles.detailTopBottomSubContainer}>
                        <Image source={this.validateIcon(weather.weather[0].main)} />
                        <Text style={styles.subtitle}>{weather.name}</Text>
                    </View>
                </ImageBackground>
            </Transition>
            {this.renderMap(weather)}          
            </View>
        )
    }

    validateIcon = (weather) => {
        switch (weather) {
            case 'Clouds':
                return require('../../assets/cloud.png')
            case 'Haze':
                return require('../../assets/cloud.png')
            case 'Rain':
                return require('../../assets/rain.png')
            case 'Fog':
                return require('../../assets/cloud.png')
            case 'Clear':
                return require('../../assets/sun.png')
            default:
                return require('../../assets/default.png');
        }
    }

    renderContent = ( weather ) => {
        return (
            <View>
                <View style={styles.twoCards}>
                    <Card title='Humidity' subtitle={weather.humidity} />
                    <Card title='Pressure' subtitle={weather.pressure} />
                    <Card title='Temp Min' subtitle={weather.temp_min} />
                    <Card title='Temp Max' subtitle={weather.temp_max} />
                </View>
            </View>
        )
    }

    renderMap(weather){
        return(
            <View style={{  flex: 1}}>  
                { this.state.latitude !== null ?
                    <MapsComponent 
                    latitude={ weather.coord.lat } 
                    longitude={ weather.coord.lon } 
                    />   
                    : <View></View>
                }                                
            </View>                 
        )  
    }

    jsonConcat = (o1, o2) => {
        for (var key in o2) {
         o1[key] = o2[key];
        }
        return o1;
    }
}

const _saveData = async (data) => {
    try {
        AsyncStorage.getItem('store', (err, result) => {
            var newStore;
            if (result !== null) {
                newStore = JSON.parse(result);
                if(newStore.length === 5){
                    newStore.splice(0, 1) 
                }
                newStore.push(data)
                AsyncStorage.setItem('store', JSON.stringify(newStore));
            } else {
                newStore=[];
                newStore.push(data)
                AsyncStorage.setItem('store', JSON.stringify(newStore));
            }
        });
    } catch (error) {
      console.log(error)
    }
};

const scaleToDimension = (size) => {
    return screenWidth * size / 375
};

// All Styles related to design...
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    topContainer: {
        backgroundColor: 'white'

    },
    categoryImageContainer: {
        marginLeft: 15,
        marginTop: 5,
        height: 50,
        width: 50,
    },
    navigationHeaderContainer: {
        height: Header.HEIGHT,
        width: screenWidth,
        color: "blue",
        marginTop:20,
        justifyContent: 'center',
        alignItems:'center'
    },
    bottomContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    DetailMainContainer: {
        flex: 1,
        backgroundColor:'white'
    },
    detailTopContainer: {
        position:'relative',
        height: scaleToDimension(400),
        width: screenWidth,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius:30,
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
    map:{
        flex:1
    },  
    detailTopBottomSubContainer: {
        flexDirection:'row',
        width: screenWidth - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
    },
    image: {
        width: 160,
        height: 80,
        borderRadius:10
    },
    card:{
        ...Platform.select({
            ios: {
              padding: 10,
              shadowColor: 'gray',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowRadius: 5,
              shadowOpacity: 0.75
            },
            android: {
              elevation: 11,
            }
        }),
        position: 'relative',
        borderRadius: 10,
        width: 300,
        height: 150,
        marginLeft:5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(255,255,255,0.8)'
    },
    imageHeader:{
        flex:1
    },
    title: {
        color: 'white',
        textAlign:'center',
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: scaleToDimension(35),
    },
    subtitle: {
        color: 'white',
        textAlign:'center',
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: scaleToDimension(25),
    },
    twoCards:{
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
});
