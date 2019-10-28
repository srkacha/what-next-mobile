import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import {Icon, Card } from 'react-native-elements';
import { Autocomplete, withKeyboardAwareScrollView } from 'react-native-dropdown-autocomplete'

export default function App() {
  const data = [
    "Jova",
    "pero",
    "movie"
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header} id="header">
        <Text style = {styles.title}>What next?</Text>
        <View style = {styles.searchSection}>
          <Autocomplete data = {data} valueExtractor = {item => item} highLightColor="white" spinnerColor="white" placeholder="Enter a movie" style = {styles.input}></Autocomplete>
          <Icon style={{padding: 10}} name='search' size={35} color='#2e2e2e'></Icon>
        </View>

        <Button color="#fcba03" title="Suggest me some movies"></Button>
      </View>
      <ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  input:{
    width: '85%',
    backgroundColor: 'white',
    fontSize: 30,
    padding: 5,
    borderRadius: 5,
    marginBottom:5,
    borderWidth:0
  },
  title:{
    color:'white',
    color: '#d90000',
    fontSize: 40,
    textAlign: 'center',
    fontFamily:'arial',
    fontWeight:'bold'
  },
   searchSection:{
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor:'white',
     borderRadius: 5,
     marginBottom: 5
   }
});
