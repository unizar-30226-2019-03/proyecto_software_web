import "../../node_modules/video-react/dist/video-react.css";
import React, { Component } from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton
} from "video-react";

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = { video: this.props.src, altura: 0 };
    this.div = React.createRef();
    this.play_pause = this.play_pause.bind(this);
    this.maxPantalla = this.maxPantalla.bind(this);
    this.cambiarAltura = this.cambiarAltura.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this.setState({ altura: this.div.current.clientHeight });
    window.addEventListener("resize", this.cambiarAltura);
  }

  componentDidUpdate() {
    if (this.state.altura !== this.div.current.clientHeight) {
      this.cambiarAltura();
    }
  }

  cambiarAltura() {
    this.setState({ altura: this.div.current.clientHeight });
  }

  handleStateChange(state) {
    // copy player state to this component's state
    //Envía el estado al padre para gestion de comentarios
    this.props.enviarEstado(state);
    this.setState({
      player: state
    });
  }

  maxPantalla() {
    this.refs.player.toggleFullscreen();
  }

  play_pause() {
    const { player } = this.refs.player.getState();
    player.paused ? this.refs.player.play() : this.refs.player.pause();
  }

  componentWillUnmount() {
    const { player } = this.refs.player.getState();
    window.removeEventListener("resize", this.cambiarAltura);
    console.log(player.currentTime);
  }

  render() {
    const t = 0; //Aquí se calculará el tiempo transcurrido anteriormente
    return (
      <div
        ref={this.div}
        className="aspect-ratio--16x9"
        onClick={this.play_pause}
        onDoubleClick={this.maxPantalla}
      >
        <Player
          ref="player"
          autoPlay
          startTime={t}
          fluid={false}
          width={"100%"}
          height={this.state.altura}
        >
          <source src={this.state.video} />
          <BigPlayButton position="center" />

          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </div>
    );
  }
}
