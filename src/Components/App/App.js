import React, { Component } from 'react';

import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: 'New Playlist'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
 }

//adding track

  addTrack(track) {
   if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
     this.setState(prevState => ({
       playlistTracks: [prevState.playlistTracks, track]
     }));
   }
  }
//removing track
  removeTrack(track) {
   this.setState({
     playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
   });
 }

 //updateing playlist name

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  //saving PlayList

    savePlaylist() {
      const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris);
      this.setState({
        searchResults: []
      });
      this.updatePlaylistName('My playlist');
      console.info(trackUris);
    }

//search

  search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onSearch={this.search}
            />

            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}



export default App;
