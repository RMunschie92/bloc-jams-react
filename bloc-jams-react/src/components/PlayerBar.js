import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return(
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="ion-ios-skipbackward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}></span>
          </button>
          <button id="next">
            <span className="icon ion-ios-skipforward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">-:--</div>
          <input type="range" className="seek-bar" value="0" />
          <div className="total-time">-:--</div>
        </section>
        <section id="volume-control">
          <div className="icon icon-volume-low"></div>
          <input type="range" className="seek-bar" value="80" />
          <div className="icon ion-volume-high"></div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
