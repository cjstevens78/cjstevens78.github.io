import React from 'react';

const details = ( props ) => {

  return (
    
      <div className="col-12">
        <ul>
          <li className="text-center"><strong> Availability: {props.availability} </strong></li>
          <li className="text-center"><a href={"mailto:" + props.email}>{props.email}</a></li>
          <li className="text-center">{props.mobile}</li>
          <li className="text-center d-none d-lg-block">{props.phone}</li>
          <li className="text-center"><a href={"/Documents/chris_stevens_webdev_contract_" + props.cvlink + ".docx"} target="_blank" rel="noopener noreferrer">{props.cvtext}</a></li>
        </ul>
      </div>
   
  )
};

export default details;