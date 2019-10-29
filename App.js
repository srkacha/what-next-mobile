import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import {Icon, Card } from 'react-native-elements';

var suggestBaseURL = 'https://what-next-app.herokuapp.com/what-next/api/movies/auto-suggest/';
var recommendBaseURL = 'https://what-next-app.herokuapp.com/what-next/api/movies/recommend/';

export default class App extends Component {
  constructor(props){
    super(props);
    this.onInputChageHandler = this.onInputChageHandler.bind(this);
    this.fetchSuggestionData = this.fetchSuggestionData.bind(this);
    this.onButtonPressHandler = this.onButtonPressHandler.bind(this);
    this.onSuggestionPressHandler = this.onSuggestionPressHandler.bind(this);
  }

  //State object
  state = {
    suggestions: [],
    inputText: '',
    selectedId: ''
  };

  fetchSuggestionData(){
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
          suggestions:[]
        });
      }
    })
  }

    onInputChageHandler(text){
    this.setState({
      inputText: text
    }, () => {
      this.fetchSuggestionData();
    });
  }

  onButtonPressHandler(movie){

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
              <View><Text style = {styles.title}>What </Text></View>
              <View><Icon style={{padding: 10}} name="movie" color="#d90000" size={45}></Icon></View>
              <View><Text style = {styles.title}> next?</Text></View>
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
          <Button onPress = {this.onButtonPressHandler} color="#fcba03" title="Suggest me some movies"></Button>
        </View>
        <ScrollView>
          <Text style={{fontSize:50, textAlign:'center'}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
          <Text style={{fontSize:50}}>sdfsdfs</Text>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor: '#2e2e2e',
    padding: 20,
    paddingTop:40
  },
  input:{
    width: '90%',
    backgroundColor: 'white',
    fontSize: 30,
    padding: 5,
    borderRadius: 5,
    marginBottom:5,
    borderWidth:0
  },
  titleSection:{
    flexDirection:'row',
    textAlign:'center',
    alignItems: 'center',
  },
  title:{
    color:'white',
    color: 'red',
    fontSize: 40,
    textAlign: 'center',
    //fontFamily:'serif',
    fontWeight:'bold'
  },
   searchSection:{
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor:'white',
     borderTopLeftRadius: 5,
     borderTopRightRadius: 5,
     marginBottom: 0
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
   }
});
