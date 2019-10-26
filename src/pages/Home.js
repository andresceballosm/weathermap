import React, { Component } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TextInput} from 'react-native'
import { ButtonAction } from '../components/ButtonAction';
import { Loading } from '../components/Loading'
import { ErrorRender } from '../components/Error';
import { Transition} from 'react-navigation-fluid-transitions';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            weather:null,
            loading: false,
            error:false,
            errorMsg:null
        };
    }
    search = async () => {
        this.setState({loading:true})
        await fetch('http://api.openweathermap.org/data/2.5/weather?q='+ this.state.searchText+'&appid=8e3e9272ce5c1e284a47d9152ebfa833')
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['cod'] == 404){
                    this.setState({
                        error:true,
                        errorMsg:responseJson['message']
                    })
                } else {
                    this.setState({
                        weather: responseJson,
                        error:false
                    })
                    this.props.navigation.navigate('details', {
                        item: this.state.weather,
                        origin: 'home'
                    })
                }
                this.setState({loading:false})
            })
            .catch((error) => {
                this.setState({loading:false})
                console.error(error);
        });
    }

    loading = () => {
        return this.state.loading  ? <Loading /> : null;
    }

    renderError = () => {
        return this.state.error ? <ErrorRender msg={this.state.errorMsg} /> : null
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                <Text style={styles.title}> Weather </Text>    
                </View>
                { this.loading() }
                { this.renderError() }
                <View style={styles.body}>
                    <View>
                        <TextInput
                        paddingLeft={12}
                        style={styles.searchBar}
                        onChangeText={(value) => this.setState({searchText:value})}
                        value={this.state.searchText}
                        placeholder="Enter your city" />
                    </View>
                    <Transition shared={this.state.weather}>
                        <View style={styles.button}>
                            <ButtonAction
                            title="Search" 
                            style={styles.button}
                            click={() => this.search() }                           
                            color="black"
                            />
                        </View>
                    </Transition>
                </View>
                <View style={styles.author}>
                    <Text style={styles.authorText}>By Andres F. Ceballos</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    header:{
        flex:1
    },
    body:{
        flex:2,
        alignItems:'center',
    },
    title: {
      textAlign:'center',
      fontFamily:'Ubuntu-Bold',
      fontSize: 28,
      marginTop:12
    },
    searchBar:{
        backgroundColor: 'rgba(249, 247, 247, 0.6)',
        borderRadius:12,
        justifyContent: 'center',
        height:45,
        marginBottom:10,
        width:300
    },
    button:{
        flex:1,
        marginTop:20
    },
    author:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    authorText: {
        textAlign:'center',
        fontFamily:'Ubuntu-Bold',
        fontSize: 14,
        color:'#525050'
    },
});
