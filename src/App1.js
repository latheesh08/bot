import React, { Component } from 'react';
import {
    Widget,
    addResponseMessage,
    renderCustomComponent,
    addUserMessage,
    handleNewUserMessage,
    toggleInputDisabled,
    toggleWidget,
    addLinkSnippet
} from 'react-chat-widget';
import { ApiAiClient } from "./ApiAi";
import './Fullscreen.css';
import logo from './images/u_img.png';
import 'react-html5video/dist/styles.css';
//imported required components from various classes
// import Card from './Carousel';
import Option from './OptionCarousel';
import SlideShow from 'react-slideshow-ui';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Form from './Steps'; 
import Form from './Form';
import { Checkbox, Icon, message, BackTop, List, Card, Avatar } from 'antd';
import 'antd/dist/antd.css';
import AgencyLogin from './Agencylogin';
import AgencySignup from './Agencysignup';
import Contact from './Contact';
import Modal from 'react-modal';

var customStyles = {
    overlay: {
        zIndex: '9999',
        // position: 'fixed',
        top: '10%',
        left: '15%',
        right: '15%',
        bottom: '10%',
        // backgroundColor: 'none',
    },
    content: {
        color: "#874181"
        // position: 'absolute',
        // top: '48.1%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // border: '1px solid rgb(204, 204, 204)',
        // background: 'white',
        // overflow: 'none',
        // borderRadius: '4px',
        // outline: 'none',
        // padding: '20px',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // width: '290px',
        // height: '275px'
    }
};
// Modal.setAppElement('#root')
// import Form from './Pdf';
// import { FaIcon, FaStack } from 'react-fa-icon';
var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
};
var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};
var settings3 = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
};
const gridStyle = {
    width: '95%',
    textAlign: 'center',
};
var home = document.createElement("BUTTON");
var button = document.createElement("div");
var image = document.createElement('img');
var i = 0, j = 0, k;
var clientcount = 0;
var names = [];
var more = [];
var time;
var count = 0;
var card1 = require('/home/starsystems/Desktop/bot/src/images/card1.png');
var card2 = require('/home/starsystems/Desktop/bot/src/images/card1.png');
var card3 = require('/home/starsystems/Desktop/bot/src/images/card1.png');
var homeimg = require('/home/starsystems/Desktop/bot/src/images/home1.png');
var top;
var idle = 'true';
var screenWidth;

// const accessToken = '45b1c2e61bf447cfbf344c2c3e806644';
// const accessToken1 = '18cd13ef22f9477a8bc16628e4545613';
// 140dfcb367ea444085028df74d9e6c4c
var awesomeLink = { title: "Awesome page", link: "www.google.com", target: '_blank' };
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            options: '',
            statusnumber: '',
            open: false,
            applicationid: '',
            visible: false,
            modalIsOpen: false,
            accessToken: '45b1c2e61bf447cfbf344c2c3e806644'
        }
        this.dialogflow("45b1c2e61bf447cfbf344c2c3e806644")
        // this.apiAiClient1 = new ApiAiClient({ accessToken: accessToken1 });
        // this.toggleInputDisabled = this.toggleInputDisabled.bind(this);
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handlebutton = this.handlebutton.bind(this);
        // this.handlebackbutton = this.handlebackbutton.bind(this);
        this.check = this.check.bind(this);
        this.handlestatus = this.handlestatus.bind(this);
        this.handleFieldService = this.handleFieldService.bind(this);
        //    this.fieldservice = this.fieldservice.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }
    dialogflow(token) {
        this.apiAiClient = new ApiAiClient({ accessToken: token });
    }
    // executed before rendering, on both the server and the client side
    componentWillMount() {
        toggleWidget();
        // toggleInputDisabled();
       
        // this.apiAiClient.eventRequest('Intiate').then((response) => {
        //     this.handleResponse(response);
        // })


    }
    componentDidMount() {
        // this.apiAiClient.eventRequest("Greetings").then((response) => {
        //     this.handleResponse(response);
        // })
        document.getElementById("messages").appendChild(home);
        home.id = "home"
        home.appendChild(image);
        image.id = "imghome"
        image.setAttribute("src", homeimg)
        home.onclick = () => {
            // alert("work")
            this.dialogflow("45b1c2e61bf447cfbf344c2c3e806644");
            document.getElementById("home").style.display = "none";
            this.apiAiClient.eventRequest("Greetings").then((response) => {
                this.handleResponse(response);
            })
        }

        document.getElementsByClassName('sender')[0].appendChild(button);
        button.classList.add("user-avatar");
        document.getElementsByClassName("send")[0].innerText = "SEND";
        
        time = setTimeout(() => {
            if (idle == 'true') {
                addResponseMessage("hope you are quite busy, Please provide some inputs or abort");
            }
        }, 60000);
    }
    showModal(data) {
        this.setState({ modalIsOpen: true });
        // this.state.modalIsOpen = true;
        more = data.split('.');

    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handlestatus(evt) {
        this.setState({ applicationid: evt.target.value });
    }
    //handling user requests
    handleNewUserMessage = (newMessage) => { 
        var rgx = new RegExp('^(|[\\s]+)$')
        var valid_message = rgx.test(newMessage)
        console.log("regex =" + valid_message)
        clearTimeout(time);
        if (!valid_message) {
            newMessage = newMessage.replace(/_/g, " ")
            var Message = newMessage.toLowerCase();
            if (Message === 'field service') {
                this.fieldservice();
            }
            else if (Message === "clear") {
                var history = document.getElementById('messages')
                if (history !== null) {
                    history.innerHTML = '';
                }
            }
            else if (Message == 'abort') {
                window.location.reload()
            }
            else if (Message == 'home') {
                this.dialogflow("45b1c2e61bf447cfbf344c2c3e806644");
                this.apiAiClient.eventRequest("Greetings").then((response) => {
                    this.handleResponse(response);
                })
                document.getElementById("home").style.display = "none";
            }
            else if (Message == 'enquiry/contact') {
                this.handleResponse("Enquiry/Contact");
            }
            else if (Message === "kpi platform" || Message === "vibration and lube" || Message === "banking" || Message === "insurance" || Message === "travel") {
                // addUserMessage("none")
                addResponseMessage("It is not available now")
            }
            else if (Message != ' ') {
                //    addUserMessage(Message);
                this.apiAiClient.textRequest(Message).then((response) => {
                    this.check(response, newMessage)
                });
            }
            // else if(newMessage == ){
            // }
            else {
                alert('Empty message can\'t be sent');
            }
            var exist = document.getElementsByClassName("Suggestion")[i];
            if (exist) {
                document.getElementsByClassName("Suggestion")[i].style.display = "none";
                i++;
            }
        }
        else{
            addUserMessage("worked");
        }
        time = setTimeout(() => {
            if (idle == 'true') {
                addResponseMessage("hope you are quite busy, Please provide some inputs or abort");
            }
        }, 60000);
    }
    fieldservice = () => {
        this.dialogflow("18cd13ef22f9477a8bc16628e4545613")
        // addResponseMessage("Search customers by Name or Address or Number")
        this.apiAiClient.eventRequest("intiate").then((response) => {
            this.handleResponse(response);
        })
        document.getElementById("home").style.display = "block";
    }
    check(response, newMessage) {
        newMessage = newMessage.replace(/ /g, "_")
        if (response.result.fulfillment.speech != '') {
            this.handleResponse(response);
        }
        else {
            // document.getElementsByClassName("Suggestion").style.display = "block"
            // this.handlebutton(newMessage)
            this.apiAiClient.eventRequest(newMessage).then((response) => {
                this.handleResponse(response);
            })
        }
    }
    //handling the each and every response   
    handleResponse(response) {

        if (typeof response === 'object') {
            var speech = response.result.fulfillment.speech;
        }
        else {
            var speech = response;
        }
        // var speech = response;
        var source2 = require("./videos/place_freshdesk_vultize_lifesize_order.mp4");
        // var audio = require("./kollathe.mp3");
        //method to display the response message
        //if user requests Card
        if (speech == "") {
            addResponseMessage("There is no such thing");
            // addResponseMessage("Try The following");
            this.apiAiClient.eventRequest("Greetings").then((response) => {
                this.handleResponse(response);
            })
            // addResponseMessage("About star systems , how can apply for freshers");
        }
        else if (speech.includes("[Suggestion]")) {
            var arr1 = speech.split('[Suggestion]');
            var RequiredSpeech = arr1[0];
            var ButtonText = arr1[1];
            var arr2 = ButtonText.split('__');
            addResponseMessage(RequiredSpeech);
            // alert(count)
            var suggestionView = () => {
                return (
                    <div className="Suggestion">
                        {arr2.map((name, index) => {
                            return <button onClick={() => {
                                this.handlebutton(name);
                            }
                            }> {name.replace(/_/g, " ")}</button>
                        })}
                    </div>
                )
                console.log(names);
            }
            renderCustomComponent(suggestionView);
        }
        else if (speech == "star systems video") {

            var suggestionView = () =>
                <video width="100%" height="240" controls>
                    <source src={source2} type="video/mp4" />
                </video>

            renderCustomComponent(suggestionView);
        }
        //Status enquiry
        else if (speech == "enter your application number") {
            addResponseMessage(speech)
            var suggestionView = () => {
                return (
                    <div className='status'>
                        <input id="statusnumber" type="text" name="statusnumber" placeholder="Status Number" onChange={this.handlestatus} />
                        <button onClick={() => {
                            fetch('http://developer.star-systems.in:9098/applicationStatus', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({
                                    applicantid: this.state.applicationid,

                                })
                            }).then(response => response.json())
                                //.then((response) => {console.log(response)})
                                .catch(error => console.error('Error:', error))
                                .then((response) => {
                                    console.log(response)
                                    document.getElementsByClassName("status")[0].style.display = "none"
                                    this.handleResponse(response.message)

                                    // alert(response.message)
                                });
                        }}><Icon type="check" />Check</button>
                    </div>
                )
            }
            renderCustomComponent(suggestionView);
        }
        else if (speech == "star systems ppt") {
            var suggestionView = () => {
                return (
                    <div className="Presentation">
                        <div style={{ width: 400, height: 400, overflowX: 'visible', overflowY: 'hidden' }}>
                            <SlideShow
                                images={[
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide1.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide2.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide3.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide4.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide5.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide6.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide7.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide8.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide9.JPG',
                                    'http://chatbot.starsystems.in/StarContent/ppt/corpppt/Slide10.JPG'
                                ]}

                            />
                            {/* <a href="/home/starsystems/Downloads/PptxGenJS-Demo.pptx" download>Download<Icon type="download" /></a> */}
                        </div>
                    </div>
                )
            }
            // <Ppt />
            renderCustomComponent(suggestionView);
        }
        else if (speech == 'Please fill below forms') {
            addResponseMessage(speech)
            var suggestionView = () =>
                <AgencySignup />
            renderCustomComponent(suggestionView);
        }
        else if (speech == 'Login') {
            var suggestionView = () =>
                <AgencyLogin />
            renderCustomComponent(suggestionView);
        }
        else if (speech == 'Enquiry/Contact') {
            //addResponseMessage("contact")
            var suggestionView = () =>
                <Contact />
            renderCustomComponent(suggestionView);
        }
        else if (speech == 'BankingDemo') {
            addResponseMessage("demo");
        }
        else if (response.result.metadata.intentName == "Intiate") {
            var msg = [];
            msg = speech.split('.');
            for (let i = 0; i < msg.length; i++) {
                addResponseMessage(msg[i]);
            }
        }
        else if (response.result.metadata.intentName == "Invoices" || response.result.metadata.intentName == "OngoingJobs" || response.result.metadata.intentName == "CompletedJobs" || response.result.metadata.intentName == "OngoingEstimates" || response.result.metadata.intentName == "FsScenario") {
            this.handleFieldService(response);
        }
        else if (response.result.metadata.intentName == "Experienced-custom") {
            var jobs = speech.split('[job]');
            var headings = [], descriptions = [], moredetails = [], jobid = [];
            console.log(jobs);
            for (let i = 0; i < jobs.length; i++) {
                var headandid = jobs[i].split('[heading]');
                var descarr = headandid.splice(1);
                var heading = headandid[0].split('[id]');

                var desc = descarr[0];
                var description = desc.split('[more]');
                var dup = description[0];
                var more = description.splice(1);
                dup = dup.split('.')
                //  console.log("heading ="+heading+"\n description ="+description+"\n more ="+more);

                //  console.log(heading);
                headings[i] = heading[0];
                jobid[i] = heading[1];
                descriptions[i] = description[0];
                moredetails[i] = more[0];
            }
            console.log(jobid);
            // console.log(headings)
            // console.log(descriptions)
            // console.log(moredetails)
            if (jobs.length == 1) {
                var suggestionView = () => {
                    return (

                        <div className="jobs" id="jobs">
                            <Slider {...settings1}>
                                {headings.map((val, id) => {
                                    return (
                                        <div>
                                            <div className="jobtitle">{val}</div>
                                            <img className='image' src={card1} />
                                            <div className="text-block">
                                                {descriptions[id].split('.').map((item, idx) => {
                                                    return (
                                                        <li>{item}</li>
                                                    )
                                                })}
                                            </div>
                                            <div className="apply">Apply onClick={() => { this.handlejob(val, jobid[id]) }}</div>
                                            <div className="moredetails" onClick={() => { this.showModal(moredetails[id]) }}>..more</div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    )

                }
                renderCustomComponent(suggestionView);
            }
            else if (jobs.length == 2) {
                var suggestionView = () => {
                    return (

                        <div className="jobs" id="jobs">
                            <Slider {...settings2}>
                                {headings.map((val, id) => {
                                    return (
                                        <div>
                                            <div className="jobtitle">{val}</div>
                                            <img className='image' src={card1} />
                                            <div className="text-block">
                                                {descriptions[id].split('.').map((item, idx) => {
                                                    return (
                                                        <li>{item}</li>
                                                    )
                                                })}
                                            </div>
                                            <div className="apply" onClick={() => { this.handlejob(val, jobid[id]) }}>Apply</div>
                                            <div className="moredetails" onClick={() => { this.showModal(moredetails[id]) }}>..more</div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    )

                }
                renderCustomComponent(suggestionView);
            }
            else {
                var suggestionView = () => {
                    return (

                        <div className="jobs" id="jobs">
                            <Slider {...settings3}>
                                {headings.map((val, id) => {
                                    return (
                                        <div>
                                            <div className="jobtitle">{val}</div>
                                            <img className='image' src={card1} />
                                            <div className="text-block">
                                                {descriptions[id].split('.').map((item, idx) => {
                                                    return (
                                                        <li>{item}</li>
                                                    )
                                                })}
                                            </div>
                                            <div className="apply" onClick={() => { this.handlejob(val, jobid[id]) }}>Apply</div>
                                            <div className="moredetails" onClick={() => { this.showModal(moredetails[id]) }}>..more</div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    )

                }
                renderCustomComponent(suggestionView);
            }
        }
        else if (speech == '') {
            // var data = speech.json();
            console.log(JSON.parse(speech));
            // console.log(speech[0]);
        }
        else {
            addResponseMessage(speech);
        }
        top = document.getElementsByClassName('messages-container')[0].offsetHeight;
        screenWidth = window.screen.height;
        // alert(((top ) / screenWidth)*100); 
        // alert(top);

    }
    handlejob(job, id) {
        // alert(id)
        // document.getElementById("jobs").style.display = "none";
        var suggestionView = () =>
            <Form title={job} job={id} />
        renderCustomComponent(suggestionView);
    }
    //To handle the response buttons
    handlebutton(name) {
        addUserMessage(name.replace(/_/g, " "));
        this.handleNewUserMessage(name);
    }
    handleFieldService = (response) => {
        if (response.result.metadata.intentName == "Invoices") {
            // this.handleResponse("work");
            console.log(response.result.fulfillment.speech);
            if (response.result.fulfillment.speech !== '[]') {
                var invoice = {}
                invoice = JSON.parse(response.result.fulfillment.speech);
                console.log(invoice);
                var suggestionView = () => {
                    return (
                        <div className="invoices">
                            <Slider {...settings1}>
                                {invoice.map(invoice => (
                                    <div className="invoicedata">
                                        <div className="invoicewraper"><div className="invoicetitle">Invoice Id</div><div className="invoicebody">: {invoice.invoiceid}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Invoice Number</div><div className="invoicebody">: {invoice.invoicenumber}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Date</div><div className="invoicebody">: {invoice.date}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Description</div><div className="invoicebody">: {invoice.description}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Tax</div><div className="invoicebody">: {invoice.tax}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Total</div><div className="invoicebody">: {invoice.total}</div></div>
                                        <div className="invoicewraper"><div className="invoicetitle">Printed By</div><div className="invoicebody">: {invoice.printed}</div></div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )
                }
                renderCustomComponent(suggestionView);
            }
            else {
                var suggestionView = () => {
                    return (
                        <div className="noinvoices">
                            <Slider {...settings1}>
                                <div className="invoicedata">
                                    <div className="noinvoice"> There are no invoices</div>
                                </div>
                            </Slider>
                        </div>
                    )
                }
                renderCustomComponent(suggestionView);
            }
        }
        else if (response.result.metadata.intentName == "OngoingJobs") {
            // this.handleResponse(response.result.fulfillment.speech);
            var jobs = {}
            jobs = JSON.parse(response.result.fulfillment.speech);
            console.log(jobs);
            var suggestionView = () => {
                return (
                    <Card
                        title="Ongoing Jobs"
                        // extra={<a href="#">More</a>}
                        style={{ width: 550 }}
                    >
                        {jobs.jobname.map((name, index) => {
                            return <Card.Grid style={gridStyle}>{name}</Card.Grid>
                        })}
                    </Card>
                )
            }
            renderCustomComponent(suggestionView);
            if (jobs.jobname.length == 1) {
                // console.log("in the element style ongoing jobs");
                document.getElementsByClassName("ant-card-grid")[count].setAttribute('style', 'width:98% !important');
                count++;
            }
            else {
                count = count + jobs.jobname.length;
            }
            // addResponseMessage("worked");
        }
        else if (response.result.metadata.intentName == "CompletedJobs") {
            // this.handleResponse(response.result.fulfillment.speech);
            var jobs = {}
            jobs = JSON.parse(response.result.fulfillment.speech);
            console.log(jobs);
            var suggestionView = () => {
                return (
                    <Card
                        title="Completed Jobs"
                        // extra={<a href="#">More</a>}
                        style={{ width: 550 }}
                        className="jobs"
                    >
                        {jobs.jobname.map((name, index) => {
                            return <Card.Grid style={gridStyle}>{name}</Card.Grid>
                        })}
                    </Card>
                )
            }
            renderCustomComponent(suggestionView);
            if (jobs.jobname.length == 1) {
                // console.log("in the element style completed jobs");
                document.getElementsByClassName("ant-card-grid")[count].setAttribute('style', 'width:98% !important');
                count++;
            }
            else {
                count = count + jobs.jobname.length;
            }
            // addResponseMessage("worked");
        }
        else if (response.result.metadata.intentName == "OngoingEstimates") {
            var estimates = {}
            estimates = JSON.parse(response.result.fulfillment.speech);
            console.log(estimates);
            var suggestionView = () => {
                return (
                    <Card
                        title="Ongoing Estimates"
                        // extra={<a href="#">More</a>}
                        style={{ width: 550 }}
                        className="jobs"
                    >
                        {estimates.estimatename.map((name, index) => {
                            return <Card.Grid style={gridStyle}>{name}</Card.Grid>
                        })}
                    </Card>
                )
            }
            renderCustomComponent(suggestionView);
            if (estimates.estimatename.length == 1) {
                // console.log("in the element style estimates");
                document.getElementsByClassName("ant-card-grid")[count].setAttribute('style', 'width:98% !important');
                count++;
            }
            else {
                count = count + estimates.estimatename.length;
            }
            // addResponseMessage("Worked");
        }
        else if (response.result.metadata.intentName == "FsScenario") {
            var names = {}
            names = JSON.parse(response.result.fulfillment.speech);
            var namelist = [];
            let i;
            console.log(names.name.length);
            for (i = 0; i < names.name.length; i++) {
                var customernames = { 'name': names.name[i] }
                namelist.push(customernames);
                // namelist['name'] = ;
            }
            console.log(names);
            console.log(namelist);
            var suggestionView = () => {
                return (
                    <List
                        itemLayout="horizontal"
                        dataSource={namelist}
                        renderItem={item => (
                            <List.Item >
                                <List.Item.Meta
                                    avatar={<Avatar src="https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png" />}
                                />
                                {item.name}
                            </List.Item>
                        )}
                    />
                )
            }
            renderCustomComponent(suggestionView);
        }
        else {
            this.handleResponse(response);
        }
    }
    render() {
        return (
            <div className="App" >
                <Widget
                    title=""
                    subtitle=""
                    // profileAvatar={logo}
                    fullScreenMode={true}
                    senderPlaceHolder="Please Type Message"
                    showCloseButton={false}
                    // renderavatar = {this.renderavatar}
                    renderCustomComponent={this.renderCustomComponent}
                    handleNewUserMessage={this.handleNewUserMessage}
                // renderavatar = {this.renderavatar}
                />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Description</h2>
                    <div className="modalclose">
                        <Icon type="close-circle" theme="twoTone" onClick={() => {
                            this.setState({ modalIsOpen: false });
                        }} />
                    </div>
                    <div> {more.map(more => (
                        <li>{more}</li>
                    ))}
                    </div>

                </Modal>
            </div>
        );
    }
}
export default App;
