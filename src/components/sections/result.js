import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { Row,Col, Form, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { Input,Label } from 'reactstrap';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import toast, { Toaster } from 'react-hot-toast';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Ress = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {



  
  const queryParams = new URLSearchParams(window.location.search)
  const way = queryParams.get("way")
  const cpu = queryParams.get("cpucount")
  const avgtime = queryParams.get("avgtime")
  const clicks = queryParams.get("clicks")
  const simusers = queryParams.get("simusers")
  const noofclicks2 = queryParams.get("noofclicks2")
  const avgtime2 = queryParams.get("avgtime2")
  const [name, setName] = useState("");
  const [email, setEmail] =  useState("");
  const [usecase, setUsecase] =  useState("");
  const [phone, setPhone] =  useState("");
  const [response, setResponse] =  useState("");

  const inputHandleEvent = (e) =>{
    switch(e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "usecase":
        setUsecase(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
    }
  };


  const onSendMailButtonClick = async ()=>{
    if(name==undefined){
        toast('Let us know your name')
        return;
      }
    if(email==undefined){
        toast('Share your email to send you the report')
        return;
      }
    if(usecase==undefined || usecase==""){
        toast('Share your use case of your project')
        return;
      }
      if(phone==undefined || phone==""){
        toast('Share your phone number')
        return;
      }
    if(!email.includes('@')){
        toast('Email is not valid, provide a proper email')
        return;
      }
    console.log(name+" "+email+" "+usecase)
    toast("Your result is getting ready")
    const axios = require('axios').default;
    // Make a request for a user with a given ID
    axios.post('https://6xk6bmp446.execute-api.ap-south-1.amazonaws.com/Dev',{
          way:way,
          vcpucount:cpu,
          avgtime:avgtime,
          noofclicks:clicks,
          simultaneoususers:simusers,
          noofclicks2:noofclicks2,
          avgtime2:avgtime2,
          name:name,
          email:email,
          usecase:usecase,
          phone:phone
      })
      .then(function (response) {
        //console.log(response.data);
        console.log("Request is made successfully!.")
        if (response.data.statusCode === 200) {
            toast.success('Minimum server requirement report is sent to your email address '+email)
            var resp = (response.data.body)
            setResponse(resp);
            setInterval(() => {
              window.location.href = 'https://tekkonnectpro.com/'
            }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  function scrollToToolPosition(){
    window.document.getElementById("toolsId").scrollIntoView();
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Fill your details <span className="text-color-success">For MSR</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              </p>

              <div className="reveal-from-bottom" data-reveal-delay="600">
              <div className="p-3 left">
        <Form>
            <FormGroup className="mt-3">
                <Label style={{color:"#ffffff"}}><strong>How should we call you as ? *</strong></Label><br></br>
                <Input className="form-input" name="name" type="text" onChange={inputHandleEvent} placeholder="Provide your Name"/>
            </FormGroup>
            <FormGroup className="mt-3">
                <Label style={{color:"#ffffff"}}><strong>Where should we send the report to ? *</strong></Label><br></br>
                <Input className="form-input" name="email" type="email" onChange={inputHandleEvent} placeholder="Provide your Email address"/>
            </FormGroup>
            <FormGroup className="mt-3">
                <Label style={{color:"#ffffff"}}><strong>What is the use case of the project ? *</strong></Label>
                <br></br>
                <select className="mb-4 form-input col-md-4 col-offset-2" name="usecase" type="text" onChange={inputHandleEvent}>
                  <option value="">- - Select your use case - -</option>
                  <option value="Staging Server">Staging Server</option>
                  <option value="Micro-Services">Micro-Services</option>
                  <option value="Development Server">Development Server</option>
                  <option value="Code Repositories">Code Repositories</option>
                  <option value="CI/CD Server">CI/CD Server</option>
                  <option value="Web Applications">Web Applications</option>
                  <option value="Mobile Backend Applications">Mobile Backend Applications</option>
                  <option value="API Backend Applications">API Backend Applications</option>
                  <option value="Microsoft Exchange and SharePoint">Microsoft Exchange and SharePoint</option>
                  <option value="SAP Business Suite">SAP Business Suite</option>
                  <option value="MySQL">MySQL</option>
                  <option value="Microsoft SQL Server">Microsoft SQL Server</option>
                  <option value="PostgreSQL databases">PostgreSQL databases</option>
                  <option value="Gaming Servers">Gaming Servers</option>
                  <option value="Caching Fleets">Caching Fleets</option>
                  <option value="Batch Processing">Batch Processing</option>
                  <option value="Distributed Analytics">Distributed Analytics</option>
                  <option value="Highly scalable multiplayer gaming">Highly scalable multiplayer gaming</option>
                  <option value="SAP Databases">SAP Databases</option>
                  <option value="SQL Databases">SQL Databases</option>
                  <option value="NoSQL databases">NoSQL databases</option>
                  <option value="Real time big data analytics">Real time big data analytics</option>
                  <option value="Machine learning">Machine learning</option>
                  <option value="Computational fluid dynamic">Computational fluid dynamic</option>
                  <option value="Computational finance">Computational finance</option>
                  <option value="Seismic analysis">Seismic analysis</option>
                  <option value="Speech recognition">Speech recognition</option>
                  <option value="Autonomous vehicles">Autonomous vehicles</option>
                  <option value="Drug discovery">Drug discovery</option>
                </select>
            </FormGroup>
            <FormGroup className="mt-3">
                <Label style={{color:"#ffffff"}}><strong>Share us your phone number *</strong></Label><br></br>
                <Input className="form-input" name="phone" type="text" onChange={inputHandleEvent} placeholder="Share us your phone number with country code"/>
            </FormGroup>
            <br></br>
            <Button type="button" onClick={onSendMailButtonClick} className="button" size="sm">Send My Report</Button>
        </Form>
        <br/>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Ress.propTypes = propTypes;
Ress.defaultProps = defaultProps;

export default Ress;