import React, { Component } from 'react';
import './../styles/PlayerBar.css';

class PlayerBar extends Component {
  render() {
    return(
      <section className="player-bar">
        <section id="volume-control" className="row">
          <span className="icon ion-volume-high custom-icon"></span>
            <input type="range"
              className="seek-bar"
              value={this.props.volume}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleVolumeChange}
            />
        </section>

        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="ion-ios-skipbackward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="icon ion-ios-skipforward"></span>
          </button>
        </section>

        <section id="time-control">
          <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
