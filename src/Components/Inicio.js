//import React, { Component } from 'react'
import React, { Fragment, useState } from 'react';
import p1 from '../ima/1.jpg';
import p2 from '../ima/2.jpg';
import p3 from '../ima/3.jpg';
import p4 from '../ima/4.jpg';

import Carousel from 'react-bootstrap/Carousel'

const Inicio = () => {

//export default class Inicio extends Component {
  

        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };

        return (
            <Carousel>
            <Carousel.Item interval={800} >
              <img
                className="d-block w-100"
                src={p1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item  interval={800} >
              <img
                className="d-block w-100"
                src={p2}
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={800}>
              <img
                className="d-block w-100"
                src={p3}
                alt="Third slide"
              />
          
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
            
        )
    }
    export default Inicio
