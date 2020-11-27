import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import { TrackList } from '../TrackList/TrackList';
import {Spotify} from '../../util/Spotify'

class App extends React.Component{  
  constructor(props){
    super(props)

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      isPlaying: false,
    }

    let audioObject = null;

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.playSample = this.playSample.bind(this);
  }


  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id))
    {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  playSample(track){
    if(this.state.isPlaying){
      this.audioObject.pause();
      this.setState({isPlaying: false})
    }
    else{
      this.audioObject = new Audio(track.preview_url);
      setInterval(() => {this.setState({isPlaying: false})}, 30000)
      this.audioObject.play();
      this.setState({isPlaying: true})
    }
    //window.open(track.preview_url, '_blank');
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    console.log(trackUris);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render(){
  return (
  <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} 
        onAdd={this.addTrack} 
        onPlaySample={this.playSample}
        isPlaying={this.state.isPlaying}/>
      <Playlist playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave = {this.savePlaylist}
        onPlaySample= {this.playSample}
        isPlaying={this.state.isPlaying}/>
    </div>
  </div>
  </div>
  );
  }
}

export default App;
