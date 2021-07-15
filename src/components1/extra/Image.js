// Image.js
import React from 'react';
const Image = props => {
    const {
      alt,
      src
     
    } = props;
  
    return (
      <img alt={alt} src={src} />
    );
  }
  
  export default Image;
  
  
  