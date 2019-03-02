import "../../node_modules/video-react/dist/video-react.css";
import React, {Component} from 'react';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
} from 'video-react';
import video from '../assets/Urge_Overkill_-_Girl_You\'ll_Be_a_Woman_Soon.mp4';

export default class Video extends Component  {
    render(){
    return (
        <Player >
            <source src={video} />

            <ControlBar>
                <ReplayControl seconds={10} order={1.1} />
                <ForwardControl seconds={30} order={1.2} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                <VolumeMenuButton disabled />
            </ControlBar>
        </Player>
    );
    }
};