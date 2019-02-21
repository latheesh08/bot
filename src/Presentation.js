import React ,{Component}from 'react';
import SlideShow from 'react-slideshow-ui';
import './Presentation.css'
 
export default class Presentation extends Component {
  render() {
    return (
      <div  style={{width: 400,height:400,overflowX : 'visible',overflowY:'hidden'}}>
        <SlideShow
          images={[
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide1.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide2.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide3.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide4.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide5.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide6.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide7.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide8.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide9.jpg',
            'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide10.jpg'
          ]}
        />
      </div>
    );
  }
}