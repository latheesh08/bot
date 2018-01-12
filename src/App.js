import React, { Component } from 'react';
import { Widget, addUserMessage, addResponseMessage, renderCustomComponent, toggleWidget, toggleInputDisabled, addLinkSnippet } from 'react-chat-widget';

import {ApiAiClient} from "./ApiAi";

import './App.css';

import ReactStars from 'react-stars'

const accessToken = 'da5f36e204e443abae416ba58caaa724';
const avatar = require("./images/icons-reddington.png");

let videoView = null;
let suggestionView = null;
var startTimer = false;

var countDown = 0;

class App extends Component {

  constructor(props) {
    super(props);
    this.apiAiClient = new ApiAiClient({accessToken: accessToken});

      this.state = ({
          videopath: "",
          title: "Redington",
          ratingtext: "",
          welcome: "Hi Partner, <br />Welcome to Redington cloud portal. <br />I am here to assist your task"
          //title: <div><img width="104" height="5  1" src={headerLogo}/> Redington</div>
      })
  }

  ratingChanged = (newRating) => {
        console.log(newRating)

      if (newRating == 0.5 || newRating == 1){
          this.setState({
              ratingtext: "Very dissatisfied"
          })
      }else if (newRating == 1.5 || newRating == 2){
          this.setState({
              ratingtext: "Dissatisfied"
          })
      }else if (newRating == 2.5 || newRating == 3){
          this.setState({
              ratingtext: "Neutral"
          })
      }else if (newRating == 3.5 || newRating == 4){
          this.setState({
              ratingtext: "Satisfied"
          })
      }else if (newRating == 4.5 || newRating == 5){
          this.setState({
              ratingtext: "Very satisfied"
          })
      }

      console.log(this.state.ratingtext)
  }

  componentWillMount() {
      //here the method to open chat window first time load
      toggleWidget()
      suggestionView = ({color, handleClick}) =>
          <div class="welcome">
              Hey, I'm Redington's A.I chat service.
              I'm here to help you with any questions
              you have about our products and service.
              I'm continuously learning to serve you better.
              so please be patient with me

          </div>

      //method to display the response custom message
      renderCustomComponent(suggestionView);

      setTimeout(
          () => {
              suggestionView = ({color, handleClick}) =>
                  <div class="welcome">
                      Let's chat
                  </div>

              //method to display the response custom message
              renderCustomComponent(suggestionView);
              countDown = 0;
          },
          3000
      )

  }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    showRatingView = () => {
        suggestionView = ({ color, handleClick }) =>
            <div class="rating">
                <div>
                    Let us know how we did<br/>
                    Please rate your A.I chat experience with us
                </div>
                <div class="ratingsubdiv">
                    <div>
                        <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={40}
                            color2={'#ffd700'} />
                    </div>
                    <div>
                        <button onClick={this.handleClick.bind(this, "rating")}>submit</button>
                    </div>
                </div>
            </div>
        renderCustomComponent(suggestionView)
    }

  handleNewUserMessage = (newMessage) => {
    this.apiAiClient.textRequest(newMessage).then((response) => {

        var speech = response.result.fulfillment.speech;

        var params = speech.split('https');

        console.log(params)

        if (speech.includes("https")){

            var url = "https" + params[1];

            suggestionView = ({ color, handleClick }) =>
                <div class="welcome">
                    {params[0]} <br/>
                    <a href={url} target="_blank">{url}
                    </a>
                </div>

            //method to display the response custom message
            renderCustomComponent(suggestionView)


        }else if (speech.includes(".mp4")){

            //method to display the response message
            addResponseMessage("Here is the reference video for your help");
            this.setState({
                videopath: require("./videos/" +speech)
            })

            videoView = ({ color, handleClick }) =>
                <div>
                    <video width="100%" height="100%" controls>
                        <source src={this.state.videopath}/>
                    </video>
                </div>

            //method to display the response custom message
            renderCustomComponent(videoView)

        }else if (speech.includes("order suggestion")){

            //method to display the response message
            addResponseMessage("Please choose any one vendor in which category you have to place an order");
            suggestionView = ({ color, handleClick }) =>

                <div class="mainButtonDiv">
                    <div onClick={this.handleClick.bind(this, "AWS")} class="boxShadow">AWS</div>
                    <div onClick={this.handleClick.bind(this, "AZURE")} class="boxShadow">AZURE</div>
                    <div onClick={this.handleClick.bind(this, "O365")} class="boxShadow">O365</div>
                    <div onClick={this.handleClick.bind(this, "Lifesize/Freshdesk/Vaultize")} class="boxShadow">Lifesize/Freshdesk/Vaultize</div>
                </div>

            //method to display the response custom message
            renderCustomComponent(suggestionView)

        }else if (speech.includes("Here are the things I can help you with today") || speech.includes("I'm still learning, I can help you with the following")){

            //method to display the response message
            addResponseMessage(speech);
            suggestionView = ({ color, handleClick }) =>

                <div class="mainButtonDiv">
                    <div onClick={this.handleClick.bind(this, "How to place an Order")} class="boxShadow">How to place an Order</div>
                    <div onClick={this.handleClick.bind(this, "Invoice")} class="boxShadow">Invoice</div>
                    <div onClick={this.handleClick.bind(this, "Payment")} class="boxShadow">Payment</div>
                    <div onClick={this.handleClick.bind(this, "Cloud Billing")} class="boxShadow">Cloud Billing</div>
                    <div onClick={this.handleClick.bind(this, "Technical Assistance")} class="boxShadow">Technical Assistance</div>
                </div>

            //method to display the response custom message
            renderCustomComponent(suggestionView)

        }else if (speech.includes("Do wanna check/change your email id?")){

            //method to display the response message
            addResponseMessage(speech);
            suggestionView = ({ color, handleClick }) =>

                <div class="mainButtonDiv">
                    <div onClick={this.handleClick.bind(this, "Yes")} class="boxShadow">Yes</div>
                    <div onClick={this.handleClick.bind(this, "No")} class="boxShadow">No</div>
                </div>

            //method to display the response custom message
            renderCustomComponent(suggestionView)

        }else if (speech.includes("Please select any one option for to know about your Usage")){

            //method to display the response message
            addResponseMessage(speech);
            suggestionView = ({ color, handleClick }) =>

                <div class="mainButtonDiv">
                    <div onClick={this.handleClick.bind(this, "AZURE")} class="boxShadow">AZURE</div>
                    <div onClick={this.handleClick.bind(this, "AWS")} class="boxShadow">AWS</div>
                </div>

            //method to display the response custom message
            renderCustomComponent(suggestionView)

        }else {

            //method to display the response message
            addResponseMessage(speech);
        }

        //initialize the count
        countDown = 0;

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

          //method to display the response custom message
          renderCustomComponent(videoView, { color: "primary", handleClick: this.handleClick})
      );

  }

  handleClick(value){
      console.log(value);
      var sendMsg = value;

      if (value != 'rating'){
          addUserMessage(value);
      }

      this.handleNewUserMessage(sendMsg)

      //initialize the count
      countDown = 0;

  }

    addLinkSnippet = (url) => {
        return (

            //method to display the response custom message
            addLinkSnippet(url, { color: "primary", handleClick: this.handleClick, target: '_blank'})
        );

    }

  render() {

      return (
        <div className="App">
            <Widget
                title={this.state.title}
                subtitle=""
                senderPlaceHolder="Please type a message"
                showCloseButton={true}
                renderCustomComponent={this.renderCustomComponent}
                handleNewUserMessage={this.handleNewUserMessage}
            />
        </div>
    );
  }
}

export default App;
