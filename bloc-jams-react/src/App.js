import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '././styles/App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    let tagPath = window.location.pathname;
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/' className="link">Landing</Link>
            <Link to='/library' className="link">Library</Link>
            <Link to='/album' className="link">Album</Link>
          </nav>
          <h1 className={ tagPath === "/" ? 'app-title' : 'app-title-small'}>Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
