import React from 'react';
import { render } from 'react-dom';
import './SearchResults.css';
import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component{
  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        
        <TrackList tracks={this.props.searchResults}
           onAdd={this.props.onAdd} 
           isRemoval={false} onPlaySample={this.props.onPlaySample}
           isPlaying={this.props.isPlaying}/>
      </div>
    );
  }
}