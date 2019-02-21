import React from 'react';
import 'react-html5video/dist/styles.css';
//Video component for chatbot
export default class Videos extends React.Component{
    render(){
        return (
            <video width="auto" height="240" controls>
            <source src={this.props.videosrc} type="video/mp4"/>
            </video>
        );
    }
}