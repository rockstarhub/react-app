import { React,useState } from "react";
import { Button,Row,Col, Form, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { Input,Label } from 'reactstrap';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {
    useHistory
  } from "react-router-dom";
import Ress from '../components/sections/result';
import toast, { Toaster } from 'react-hot-toast';


const HandleCustomerData = (props) => {
  return (<>
  <Ress className="illustration-section-01" />
    </>);
};

export default HandleCustomerData;