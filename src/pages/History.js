import React, { Component } from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    FlatList, 
    StyleSheet, 
    AsyncStorage, 
    Image,
    ScrollView, 
    RefreshControl,
    TouchableOpacity,
    Alert,
    ImageBackground } from 'react-native'
import { Loading } from '../components/Loading';
import { validateColor } from '../utils/validateColor';

export default class History extends Component {
    state = {
        weather:null,
        refreshing: false
    };
    componentDidMount = () => {
       this.getHistory()
    }

    openHistory = (weather) => {
        this.props.navigation.navigate('details', {
            item: weather,
            origin: 'history'
        })
    }

    getHistory = () => {
        AsyncStorage.getItem('store', (err, result) => {
            if (result !== null) {
                var newStore = JSON.parse(result);
                this.setState({weather:newStore})
            } else {
                this.setState({ weather:'nodata' })
            }
        });
    }


    deleteItem = (item, key) => {
        const newValues = this.state.weather.filter((item, id) => id !== key);
        this.setState({ weather: newValues });
        AsyncStorage.setItem('store', JSON.stringify(newValues));
    }

    _onRefresh = () => {
        this.getHistory()
        this.setState({refreshing: false});
    }

    render() {
        if(this.state.weather){
            return (
                <SafeAreaView style={styles.DetailMainContainer}>
                    <Text style={styles.titleHeader}>History</Text>
                    <ScrollView
                     refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }
                    >
                        <View style={styles.refresh}>
                            <Image style={{width:30, height:30}}
                            source={require('../../assets/downblack.png')}/>
                            <Text>refresh</Text>
                        </View>

                        {   this.state.weather !== 'nodata' ?
                        <FlatList 
                        showsHorizontalScrollIndicator={false}
                        onPress
                        horizontal={false}
                        extraData={this.state.weather}
                        data={this.state.weather}
                        renderItem={({item, index}) => this.renderDetailListCell(item, index)}/>
                        : <Text style={styles.nodata}>No Data</Text>
                        }
                    </ScrollView>
                </SafeAreaView>
            )
        } else {
            return <Loading />
        }
       
    }

    renderDetailListCell(item, index) {
        return (
            <TouchableOpacity onPress={() => this.openHistory(item)} key={index}>
            <ImageBackground 
            source={validateColor(item.weather[0].main)} 
            style={[styles.card]}
            imageStyle= {{opacity:0.5, borderRadius:10}}>
                
                    <View style={styles.viewLeft}>
                        <Image style={styles.image}  source = {require('../../assets/tempmax.png')} />
                        <Text style={styles.textTemp}>{item.main.temp}°K</Text>
                    </View>
                    <View style={styles.viewRight}>
                        <Text style={styles.subtitle}>{item.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                         Alert.alert(
                            'Info',
                            'Do you want to delete?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {   text: 'ok', onPress: () =>   this.deleteItem(item, index)  },
                            ],
                            { cancelable: false },   
                        );
                        }} 
                        style={styles.trash}
                    >
                        <Image style={{width:25, height:25, marginVertical:5, marginHorizontal:5}}
                        source={require('../../assets/trash.png')}/>
                    </TouchableOpacity>
            </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    DetailMainContainer: {
        flex: 1,
        backgroundColor:'white'
    },
    card:{
        flex:1, 
        flexDirection:'row',
        height:100,
        marginTop:10, 
        marginBottom:10,
        marginLeft:7, 
        marginRight:7,
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
    viewLeft:{
        flex:1,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
    },
    viewRight:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    titleHeader: {
        textAlign:'center',
        fontFamily:'Ubuntu-Bold',
        fontSize: 28,
        marginTop:20,
        marginBottom:20
    },
    nodata: {
        textAlign:'center',
        fontFamily:'Ubuntu-Bold',
        fontSize: 20,
        marginTop:20
    },
    textTemp:{
        textAlign:'center',
        fontFamily:'Ubuntu-Bold',
        fontSize: 24,
        color:'white',
        marginTop:12    
    },
    subtitle:{
        fontFamily:'Ubuntu-Bold',
        fontSize: 20,
        color:'#ffffff'
    },
    p:{
        color:'#575757'
    },
    image:{
        width:30,
        height:30
    },
    refresh:{
        alignItems:'center',
        justifyContent:'center'
    },
    trash:{
        backgroundColor:'rgba(200, 200, 200, 0.7)',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:5
    }
})