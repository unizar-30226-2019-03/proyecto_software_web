/**
 * @fileoverview Fichero Video.jsx donde se encuentra la clase
 * que renderiza el componente para visualizar un vídeo
 *
 * @author UniCast
 *
 * @requires ../node_modules/video-react/lib/components/Player.js:Player
 * @requires ../node_modules/video-react/lib/components/control-bar/ControlBar.js:ControlBar
 * @requires ../node_modules/video-react/lib/components/control-bar/ReplayControl.js:ReplayControl
 * @requires ../node_modules/video-react/lib/components/control-bar/ForwardControl.js:ForwardControl
 * @requires ../node_modules/video-react/lib/components/time-control/CurrentTimeDisplay.js:CurrentTimeDisplay
 * @requires ../node_modules/video-react/lib/components/time-control/TimeDivider.js:TimeDivider
 * @requires ../node_modules/video-react/lib/components/control-bar/PlaybackRateMenuButton.js:PlaybackRateMenuButton
 * @requires ../node_modules/video-react/lib/components/control-bar/VolumeMenuButton.js:VolumeMenuButton
 * @requires ../node_modules/video-react/lib/components/BigPlayButton.js:BigPlayButton
 */

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

/**
 * Clase que gestiona la reproducción de archivos de vídeo.
 * @extends Component
 */
export default class Video extends Component {
  /**
   * Construye el componente Video
   * @param {Object} props Propiedades para inicializar el componente
   */
  constructor(props) {
    super(props);
    this.state = {
      video: "",
      thumbnailUrl: "",
      altura: 0,
      startTime: props.time
    };
    this.div = React.createRef();
    this.play_pause = this.play_pause.bind(this);
    this.maxPantalla = this.maxPantalla.bind(this);
    this.cambiarAltura = this.cambiarAltura.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.src !== newProps.src || this.props.time !== newProps.time) {
      this.setState({
        video: newProps.src,
        thumbnailUrl: newProps.thumbnailUrl,
        startTime: newProps.time
      });
    }
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

  /**
   * Cambia el tamaño del marco del vídeo
   */
  cambiarAltura() {
    this.setState({ altura: this.div.current.clientHeight });
  }

  /**
   * Guarda el estado actual del vídeo y lo envía al componente
   * ViendoVideo.
   * @param {Object} state Estado del vídeo
   */
  handleStateChange(state) {
    this.props.enviarEstado(state);
    this.setState({
      player: state
    });
  }

  /**
   * Despliega el vídeo a lo largo de toda la pantalla
   * para ser visualizado en modo pantalla completa.
   */
  maxPantalla() {
    this.refs.player.toggleFullscreen();
  }

  /**
   * Dependiendo si el vídeo está pausado o no, reanuda o pausa
   * el vídeo.
   */
  play_pause() {
    const { player } = this.refs.player.getState();
    player.paused ? this.refs.player.play() : this.refs.player.pause();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.cambiarAltura);
  }

  render() {
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
          startTime={this.state.startTime}
          fluid={false}
          width={"100%"}
          height={this.state.altura}
          poster={this.state.thumbnailUrl}
          src={this.state.video}
        >
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
