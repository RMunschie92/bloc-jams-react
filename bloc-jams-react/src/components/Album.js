import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar.js';
import './../styles/Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.8,
      isPlaying: false,
      isHovered: false,
      dynamicClass: 'song-number',
      targetId: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({
      isPlaying: true,
      dynamicClass: 'icon ion-ios-pause'
    });
  }

  pause() {
    this.audioElement.pause();
    this.setState({
      isPlaying: false,
      dynamicClass: 'icon ion-ios-play'
    });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
    console.log(this.audioElement.volume);
  }

  formatTime(time) {
    if (isNaN(time) === true || time === undefined ) {
      return '-:--';
    }
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    minutes = minutes.toString();
     if (seconds < 10) {
      seconds = Math.floor(seconds.toString());
      return minutes + ":0" + seconds;
    } else {
      seconds = Math.floor(seconds.toString());
      return minutes + ":" + seconds;
    }
  }

  mouseEnter(e) {
    console.log(e.target.id);
    if (e.target !== this.state.currentSong && !this.state.isPlaying) {
      this.setState({
        dynamicClass: 'icon ion-ios-play',
        targetId: e.target.id
      });
    }
  }

  mouseLeave(e) {
    console.log(e.target);
    if (!this.state.currentSong || !this.state.isPlaying) {
      this.setState({
        dynamicClass: 'song-number',
        targetId: e.target.id
      });
    }
    else if (this.state.currentSong) {
      this.setState({
        dynamicClass: 'icon ion-ios-pause',
        targetId: e.target.id
      })
    }
  }


  render() {
    return (
      <section className="album">
        <section id="album-info" className="row">
          <img id="album-cover-art" className="col-md-4" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details col-md-8">
            <h5>ALBUM</h5>
            <h1 id="album-title">{this.state.album.title}</h1>
            <h5>ARTIST</h5>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={ () => this.handleSongClick(song)} >
                <td className="song-actions">
                  <button>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ?'hidden-number' : 'song-number'}>{index + 1}</span>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? 'icon ion-ios-pause' : ''}></span>
                    <span className={(this.state.isPlaying && (this.state.currentSong === song)) ? '' : 'icon ion-ios-play'}></span>
                  </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.current}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />
      </section>
    );
  }
}

export default Album
