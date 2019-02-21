import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OptionCarousel.css';
import {
    Widget,
    addResponseMessage,
    renderCustomComponent,
    addUserMessage,
    handleNewUserMessage,
    toggleWidget
} from 'react-chat-widget';

export default class SimpleSlider extends React.Component {
   state = {
        option : ""
   }
    handleoption1(){
     
    addUserMessage("Yes");
    addResponseMessage("That's Great !");
    addResponseMessage("You're here so your day can't do anything but get better!");
    document.getElementsByClassName("options")[0].style.display = "none"; 
  }
    handleoption2(){
    addUserMessage("No")
    addResponseMessage("How may i help you");
    document.getElementsByClassName("options")[0].style.display = "none"; 
     }
    handleoption3(){
   addUserMessage("Alright")
   addResponseMessage("That's Great !");
   addResponseMessage("You're here so your day can't do anything but get better!");
   document.getElementsByClassName("options")[0].style.display = "none";   
  }
    handleoption4(){
   addUserMessage("Fine")
   addResponseMessage("That's Great !");
   addResponseMessage("You're here so your day can't do anything but get better!");    
   document.getElementsByClassName("options")[0].style.display = "none"; 
  }
    // handleoption1(){
    //    addUserMessage("")
    //  }
    render() {
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
  
      };
      return (
          <div className="options">
          <h3> Choose an option</h3>
        <Slider {...settings}>
        <div className='option'>
        <button onClick={this.handleoption1} className='button' id = "1">Yes</button>    
        </div>
        <div className='option'>
        <button onClick={this.handleoption2} className='button' value="no" id = "1">No</button>    
        </div>
        <div className='option'>
        <button onClick={this.handleoption3} className='button' value="alright" id = "1">Alright</button>    
        </div>
        <div className='option'>
        <button onClick={this.handleoption4} className='button' value="fine"id = "1" >Fine</button>    
        </div>

        </Slider>
        </div>
      );
    }
}
