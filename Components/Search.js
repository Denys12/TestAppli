import React from 'react'
import { StyleSheet,View, Button, TextInput,FlatList, Text, ActivityIndicator  } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from'./FilmItem'
import {getFilmsFromApiWithSearchedText} from '..//API/TMDBApi'

class Search extends React.Component {

  constructor(props){
    super(props)
    this.page = 0
    this.totalPages = 0
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })//lancement du chargement
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data =>{
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],//'...'crée une copie de cet objet
            isLoading: false //Arret du chargement
          })
      }
      )
    }//lorque la recherche est terminer le component est rechargé avec toutes les données de l'API
  }

  _displayLoading() {
    if (this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()
    })
}

  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button style={{height: 50 }} title="Rechercher" onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms()
            }
  }}
          renderItem={({item}) => <FilmItem film={item}/>}//passé la prop film avec les donnés du film à FilmItem
          />
          {this._displayLoading()}
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
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search



//onSubmitEditing permet de lancer la recherche avec le boutton 'entrer' du telephone
