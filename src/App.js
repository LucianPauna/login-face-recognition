
import React, { Fragment } from 'react';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import './App.css';

window.process = {
  env: {
      NODE_ENV: 'development'
  }
};

const particleOptions = {
  fpsLimit: 120,
  particles: {
    links: {
      distance: 120,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "out",
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 300,
      },
      value: 50,
    },
    opacity: {
      value: 0.4,
    },
    shape: {
      type: "triangle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isLogged: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateBoundingBoxesLocation = (response) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = response.outputs[0].data.regions.map(boundingBox => boundingBox.region_info.bounding_box);
    const boundingBoxes = clarifaiFace.map(face => {
      return {
        left: face.left_col * width,
        top: face.top_row * height,
        right: width - (face.right_col * width),
        bottom: height - (face.bottom_row * height)
      }
    });
    return boundingBoxes;
  }

  displayBoundingBox = boxes => {
    this.setState({boxes});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    document.getElementById('input').value = '';
    fetch('https://hidden-bayou-04591.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://hidden-bayou-04591.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {
                entries: count
              }))
            })
            .catch(console.log())
        }
        this.displayBoundingBox(this.calculateBoundingBoxesLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home' || route === 'profile') {
      this.setState({isLogged: true});
    } else {
      this.setState(initialState);
    }
    this.setState({route});
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  renderElements = () => {
    if (this.state.route === 'home') {
      return <Fragment>
      <Navigation onRouteChange={this.onRouteChange} />
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
      <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes} />
    </Fragment>
    } else if (this.state.route === 'profile') {
      return <Fragment>
        <Navigation onRouteChange={this.onRouteChange} />
        <Profile user={this.state.user} onRouteChange={this.onRouteChange} />
      </Fragment>
    } else if (this.state.route === 'signin') {
      return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> // Form
    } else {
      return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> // Form
    }
  }

  render() {
    return (
      <div className="App">
        <Particles className="Particles" options={particleOptions} />
        { this.renderElements() }
      </div>
    );
  }
}

export default App;
