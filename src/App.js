import React, { Component } from 'react';
import { Widget, addUserMessage, addResponseMessage, renderCustomComponent } from 'react-chat-widget';

import {ApiAiClient} from "./ApiAi";

import './App.css';
const videopath = require("./mov_bbb.mp4");

const accessToken = 'da5f36e204e443abae416ba58caaa724';

let videoView = null;

class App extends Component {

  constructor(props) {
    super(props);
    this.apiAiClient = new ApiAiClient({accessToken: accessToken});

      this.state = ({
          videopath: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      })
  }

  componentWillMount() {
      addUserMessage("Welcome, please say help at any time to know what I can help you with");
  }




  handleNewUserMessage = (newMessage) => {
    this.apiAiClient.textRequest(newMessage).then((response) => {

        var isYoutube = false;

        var url = response.result.fulfillment.speech;
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line

                videoView = ({ color, handleClick }) =>
                    <div>
                        <iframe width="420" height="315" src={url} frameborder="0" allowfullscreen></iframe>
                    </div>
                renderCustomComponent(videoView, { color: "primary", handleClick: this.handleClick})

                isYoutube = true;
            }
            else {
                // Do anything for not being valid
            }
        }

        if (!isYoutube){
            addResponseMessage(response.result.fulfillment.speech);
        }
    });

      //<iframe width="420" height="315" src="http://www.youtube.com/embed/nIsCs9_-LP8" frameborder="0" allowfullscreen></iframe>
      //<img width="250" height="150" src="http://st1.bgr.in/wp-content/uploads/2015/10/redington-logo.jpg" alt="logo" />
      /*videoView = ({ color, handleClick }) =>
          <div>
              <video width="400" controls onClick={handleClick}>
                  <source src={this.state.videopath}/>
              </video>
          </div>

    renderCustomComponent(videoView, { color: "primary", handleClick: this.handleClick})*/
  }


  customComponent = (message) => {
      return (
          renderCustomComponent(videoView, { color: "primary", handleClick: this.handleClick})
      );

  }

  handleClick(){
      console.log("video clicked");
  }
  render() {

      return (
        <div className="App">
            <Widget 
                title="Redington"
                subtitle="I'm your virtual assistant"
                senderPlaceHolder="Please type a message"
                handleNewUserMessage={this.handleNewUserMessage}
                renderCustomComponent={this.customComponent}
            />
        </div>
    );
  }
}

export default App;
