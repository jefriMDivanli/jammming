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
  if(this.state.playlistTracks.findIndex(_track => _track.id === track.id) === -1) {
    let tracks = this.state.playlistTracks
    tracks.push(track)
    this.setState({playlistTracks: tracks})
  }
}

//removing track
removeTrack(track) {
  const trackIndex = this.state.playlistTracks.findIndex(_track => _track.id === track.id);
  if(trackIndex > -1) {
    let tracks = this.state.playlistTracks
    tracks.splice(trackIndex, 1)
    this.setState({playlistTracks: tracks})
  }
}


 //updateing playlist name

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  //saving PlayList

  savePlaylist() {
      const trackURIs = this.state.playlistTracks.map(track => track.uri)
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState(
          {
            playlistName: 'New Playlist',
            playlistTracks: []
          })
      })
    }

    search(searchTerm) {
      Spotify.search(searchTerm).then(tracks => {
        this.setState({
          searchResults: tracks
        })
      });
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
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
