import React from 'react'
import { StyleSheet,View, Button, TextInput,FlatList, Text } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from'./FilmItem'
import {getFilmsFromApiWithSearchedText} from '..//API/TMDBApi'

class Search extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      films:[],
    }
    this.searchedText = ""
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({films: data.results}))
    }//lorque la recherche est terminer le component est rechargé avec toutes les données de l'API
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  render() {
    console.log("RENDER");
    return (
      <View style={styles.main_container}>
        <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Titre du film"/>
        <Button style={{height: 50 }} title="Rechercher" onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films} //données qu'on souhaite afficher
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}//passé la prop film avec les donnés du film à FilmItem
          />
      </View>
    )
  }
}

const styles = StyleSheet.create( {//stylesheet ameliore les perf de l'application
  main_container: {
    marginTop:20,
    flex: 1
  },

  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000' ,
    borderWidth: 1,
    paddingLeft: 5,
  }
})

export default Search
