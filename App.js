import * as React from 'react';
import { Touchable } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localDB'

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      enteredText : '',
      isSearchPressed : '',
      word : '',
      lexicalCategory : '',
      definition : ''
    }
  }

  getWord = (text) => {
    var text = text.toLowerCase();

    try{
      var word = db[text].word;
      var definition = db[text].definition;
      var lexicalCategory = db[text].lexicalCategory
      this.setState({
        word : word,
        definition : definition,
        lexicalCategory : lexicalCategory
      })
    }

    catch(err){
      alert('Sorry, this word is not available for now.')
      this.setState({
        enteredText : '',
        isSearchPressed : false
      })
    }
  }

  render(){
    return (
      <View>
        <Header
          centerComponent = {{text : 'Pocket Dictionary', style : {color : 'white'}}}
          backgroundColor = 'cadetblue'>
        </Header>

        <TextInput
        style = {styling.inputBoxStyle}
        value = {this.state.enteredText}
        onChangeText = {(text) => {
          this.setState({
            enteredText : text,
            isSearchPressed : 'false',
            word : 'Loading...',
            lexicalCategory : '',
            definition : ''
          })
        }}>
        </TextInput>

        <TouchableOpacity
        style = {styling.goButtonStyle}
        onPress = {() => {
          this.setState({
            isSearchPressed : 'true'
          })
          this.getWord(this.state.enteredText)
        }}> 
          <Text style = {styling.textStyle}> Submit the Word </Text> 
        </TouchableOpacity>

        <View>
          <Text style = {styling.textStyle, {color : 'cadetblue'}}> Word : {''} </Text>
          <Text style = {styling.textStyle}> {this.state.enteredText} </Text>
        </View>

        <View>
          <Text style = {styling.textStyle, {color : 'cadetblue'}}> Type : {''} </Text>
          <Text style = {styling.textStyle}> {this.state.lexicalCategory} </Text>
        </View>

        <View>
          <Text style = {styling.textStyle, {color : 'cadetblue'}}> Definition : {''} </Text>
          <Text style = {styling.textStyle}> {this.state.definition} </Text>
        </View>
      </View> 
    );
  }
}

const styling = StyleSheet.create({
  inputBoxStyle : {
    marginTop : 15,
    alignSelf : 'center',
    height : 50,
    width : 100,
    borderColor : 'cadetblue',
    borderWidth : 5
  },
  goButtonStyle : {
    marginTop : 45,
    marginBottom : 20,
    alignSelf : 'center',
    backgroundColor: 'cadetblue',
    width: 225,
    height: 50,
    alignItems: 'center'
  },
  textStyle : {
    color: 'white',
    paddingTop : 10,
    fontSize: 25,
  }
})
