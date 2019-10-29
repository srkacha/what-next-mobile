import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import {Icon, Card } from 'react-native-elements';

var suggestBaseURL = 'https://what-next-app.herokuapp.com/what-next/api/movies/auto-suggest/';
var recommendBaseURL = 'https://what-next-app.herokuapp.com/what-next/api/movies/recommend/';
var testImageURL = 'https://cdn11.bigcommerce.com/s-yshlhd/images/stencil/1280x1280/products/5013/156392/full.pulpfiction_6115__98910.1556887903.jpg';
var imageBaseURL = 'http://img.omdbapi.com/?h=600&apikey=62b5f858&i='

export default class App extends Component {
  constructor(props){
    super(props);
    this.onInputChageHandler = this.onInputChageHandler.bind(this);
    this.fetchAutoSuggestionData = this.fetchAutoSuggestionData.bind(this);
    this.onButtonPressHandler = this.onButtonPressHandler.bind(this);
    this.onSuggestionPressHandler = this.onSuggestionPressHandler.bind(this);
    this.toggleLoadingState = this.toggleLoadingState.bind(this);
  }

  //State object
  state = {
    suggestions: [],
    recommendations: [],
    fetchingRecommendationData: false,
    inputText: '',
    selectedId: ''
  };

  fetchAutoSuggestionData(){
    let substring = this.state.inputText;
    let url = suggestBaseURL + substring;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      this.setState({
        suggestions: responseJson.data
      });
    }).catch((error) => {
      //Do something to handle errors
      if(this.state.inputText.length == 0){
        this.setState({
          suggestions:[],
          selectedId:'',
        });
      }
    })
  }

  toggleLoadingState(state){
    this.setState({
      fetchingRecommendationData: state
    })
  }

  fetchMovieRecommendationData(){
    let targetId = this.state.selectedId;
    if(targetId === '' || this.state.inputText == ''){
      Alert.alert('Invalid movie', 'Please enter a valid movie name')
      return;
    }
    let url = recommendBaseURL + targetId;
    //Disabling the button while the fetch phase is running
    this.toggleLoadingState(true);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((responseJson) =>{
      this.setState({
        recommendations: responseJson.data
      }, () => {
        this.toggleLoadingState(false);
      });
    }).catch((error) => {
      //Do something with the error, show a message or something
      alert("There was a problem fetching recommendation data, please check your input and internet connection.");
      this.toggleLoadingState(false);
    })
  }

    onInputChageHandler(text){
    this.setState({
      inputText: text
    }, () => {
      this.fetchAutoSuggestionData();
    });
  }

  onButtonPressHandler(movie){
    this.fetchMovieRecommendationData();
  }

  onSuggestionPressHandler(movie){
    this.setState({
      inputText: movie.title,
      selectedId: movie.id,
      suggestions:[]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} id="header">
          <View style={styles.titleSection}>
            <View style={{flexDirection:'row'}}>
              <View><Text style = {styles.title}>WHAT </Text></View>
              <View><Icon name="movie" color="#d90000" size={55}></Icon></View>
              <View><Text style = {styles.title}> NEXT?</Text></View>
            </View>
          </View>
          <View style = {styles.searchSection}>
            <TextInput value = {this.state.inputText} onChangeText = {this.onInputChageHandler} placeholder="Enter a movie" style = {styles.input}></TextInput>
            <Icon style={{padding: 10}} name='search' size={35} color='#2e2e2e'></Icon>
          </View>
          <ScrollView style={styles.suggestions}>
              {this.state.suggestions.map(movie => (
                <View key = {movie.id}>
                  <Text style={styles.suggestionText} onPress = {() => {this.onSuggestionPressHandler(movie)}}>{movie.title}</Text>
                </View>
              ))}
            </ScrollView>
          <Button disabled={this.state.fetchingRecommendationData} onPress = {this.onButtonPressHandler} color="#ff9d00" title="Suggest me some movies"></Button>
        </View>
        {!this.state.fetchingRecommendationData?
        <ScrollView style={{paddingHorizontal:25, paddingTop:10, backgroundColor:'#e1e1eb'}}>
            {this.state.recommendations.map(movie => (
              <View key={movie.id} style={styles.movieBox}>
                <Image style={{height:250, width:'100%', borderTopLeftRadius:10, borderTopRightRadius:10}} source={{uri:testImageURL}}></Image>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.movieTitle}>
                    <Text style={{color:'white', fontSize:20}}>{movie.title}</Text>
                  </View>
                  <View style={styles.rating}>
                    <Text style = {{color:'white', fontSize:30, fontWeight:'bold'}}>{movie.rating}</Text>
                  </View>
                </View>
              </View>
            ))}
            <View style={{height:10}}></View>
        </ScrollView>:
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#413f69"></ActivityIndicator>
          <Text style={{fontSize:30, color:"#413f69", width:'70%', textAlign:'center', fontWeight:'bold'}}>Fetching recommendation data...</Text>
        </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e1eb',
  },
  header:{
    backgroundColor: '#1f1f2b',
    padding: 20,
    paddingTop:40,
    elevation: 20
  },
  input:{
    width: '90%',
    backgroundColor: 'white',
    fontSize: 25,
    padding: 5,
    paddingLeft:10,
    borderRadius: 5,
    marginBottom:5,
    borderWidth:0
  },
  titleSection:{
    flexDirection:'column',
    textAlign:'center',
    alignItems: 'center',
  },
  title:{
    color: 'red',
    fontSize: 40,
    textAlign: 'center',
    //fontFamily:'serif',
    fontWeight:'bold',
    textShadowColor: '#9e0000',
    textShadowOffset: {width: 0, height: -3},
    textShadowRadius: 10
  },
   searchSection:{
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor:'white',
     borderTopLeftRadius: 5,
     borderTopRightRadius: 5,
   },
   suggestions:{
     backgroundColor:'white',
     marginBottom:5,
     paddingHorizontal: 5,
     paddingBottom: 5,
     borderBottomLeftRadius: 5,
     borderBottomRightRadius: 5
   },
   suggestionText:{
     fontSize: 25,
     color: '#222',
   },
   movieBox: {
     marginBottom:15,
     elevation: 5,
     backgroundColor: '#0000',
     borderRadius: 10
   },
   movieTitle:{
    backgroundColor:'#413f69',
    justifyContent:'center',
    borderBottomLeftRadius:10,
    padding:5,
    paddingLeft:20,
    width:'80%',

   },
   rating:{
     backgroundColor: '#c20000',
     alignItems:'center',
     padding:10,
     borderBottomRightRadius:10,
     width: '20%'
   },
   loading:{
     alignContent:'center',
     justifyContent:'center',
     alignItems:'center',
     height:300
   }
});
