import React, {useRef, useState } from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { Button,Row, Col, Form, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { Input,Label } from 'reactstrap';

const propTypes = {
  ...SectionSplitProps.types
}



const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Fill the form to obtain Result',
    paragraph: 'Obtain Minimum virtual server requirement result.'
  };

  const [clickscount, setClicksCount] = useState(undefined);
  const [avgtime, setAvgTimeCount] =  useState(undefined);
  const [cpucount, setCpuCount] =  useState(undefined);
  const [simuserscount,setSimUsersCount] = useState(undefined);
  const [noofClicks2,setNoofClicks2] = useState(undefined);
  const [avgtime2,setavgtime2] = useState(undefined);
  const [button1,setButton1] = useState(0);
  const [button2,setButton2] = useState(0);


  const handleUserInputChange = (e) =>{
    switch(e.target.name) {
      case "nofcore":
        setCpuCount(e.target.value);
        break;
      case "avgtime":
        setAvgTimeCount(e.target.value);
        break;
      case "nofclicks":
        setClicksCount(e.target.value);
        break;
      case "maxsusers":
        setSimUsersCount(e.target.value);
        break;
      case "noofclicks2":
        setNoofClicks2(e.target.value);
        break;
      case "avgtime2":
        setavgtime2(e.target.value);
        break;
    }
  };

  const handleButton1 = () =>{
    if(clickscount!=undefined){
      if(avgtime!=undefined){
        if(cpucount!=undefined){
          window.location.href = "/fetchresult?way=1&cpucount="+cpucount+"&avgtime="+avgtime+"&clicks="+clickscount
        }else{
          toast('Specify vCPUs')
        }
      }else{
        toast('Specify average request-response time')
    }
  }else{
      toast('Specify no of user click actions per minute')
    }
  }

  const handleButton2 = () =>{
      if(simuserscount!=undefined){
        if(noofClicks2!=undefined){
          if(avgtime2!=undefined){
          window.location.href = "/fetchresult?way=2&simusers="+simuserscount+"&noofclicks2="+noofClicks2+"&avgtime2="+avgtime2;
          }else{
            toast('Specify average request response time')
          }
        }else{
          toast('Specify no of clicks per user per minute')
        }
      }else{
        toast('Specify assumed simultaneous users per minute')
      }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <div id="toolsId" className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
                Calculate vCPU and RAM
                  </h3>
                <div className="m-0">
                <div className="row">
                <Form>
                  <div className="col-md-12">
                    <FormGroup>
                      <Label style={{color:"#ffffff"}}>Concurrent users per minute</Label><br></br>
                      <Input className="form-input" name="maxsusers" placeholder="No of users per minute" type="number" min="10" onChange={handleUserInputChange} required/>
                    </FormGroup>
                    </div>
                    <div className="col-md-12">
                    <FormGroup>
                      <Label style={{color:"#ffffff"}}> No of clicks per minute</Label><br></br>
                      <Input className="form-input" name="noofclicks2" value={noofClicks2} placeholder="No of clicks per user per minute" type="number" min="10" onChange={handleUserInputChange} required/>
                    </FormGroup>
                    </div>
                    <div className="col-md-12">
                    <FormGroup>
                      <Label style={{color:"#ffffff"}}>Load time in ms</Label><br></br>
                      <Input className="form-input" name="avgtime2" value={avgtime2} placeholder="Press F12, click on Network, press F5 to get load time" type="number" min="1" onChange={handleUserInputChange} required/>
                    </FormGroup>
                  </div>
                  <div className="col-md-12">
                  <FormGroup className="pt-4">
                  <br></br>
                  <Button className="button button-wide-mobile button-sm form-inpu"size="md" onClick={handleButton2} block>Generate Result</Button>
                  </FormGroup>
                  </div>
                  </Form>
                </div>
                </div>
              </div>
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
                Calculate capacity of Server
                  </h3>
                <div className="m-0">
                <Form>
                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup>
                        <Label style={{color:"#ffffff"}}>No of vCPUs</Label><br></br>
                        <Input className="form-input" name="nofcore" placeholder="Count of vCPUs" type="number" min="1" onChange={handleUserInputChange} required/>
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                      <FormGroup>
                        <Label style={{color:"#ffffff"}}>Load time in ms</Label><br></br>
                        <Input className="form-input" name="avgtime" placeholder="Press F12, click on Network, press F5 to get load time" min="1" value={avgtime} type="number" onChange={handleUserInputChange} required/>
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                      <FormGroup>
                        <Label style={{color:"#ffffff"}}>No of clicks per minute</Label><br></br>
                        <Input className="form-input" name="nofclicks" placeholder="No of clicks by a user per minute" value={clickscount} type="number"  min="10" onChange={handleUserInputChange} required/>
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                    <FormGroup className="pt-4">
                    <br></br>
                    <Button className="button button-wide-mobile button-sm"size="md" onClick={handleButton1}>Generate Result</Button>
                      </FormGroup>
                    </div>
                  </div>
                </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;