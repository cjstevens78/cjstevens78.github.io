import React from 'react';

const job = ( props ) => {

 // I set innerHtml here because I know for sure that this a 'dumb' component for presentation only
 // and its not going to be subject to a state change that could lead to a cross scripting attack.

 // Check if Highlights data exists, if not dont render the block

    return (
      <div>
        <h3>{props.jobdata.startdate}&nbsp;>&nbsp;{props.jobdata.enddate}</h3>
        <h4>{props.jobdata.jobtitle}</h4>
        <dl>
          <dt>{props.jobdata.company}</dt>
          <dd>{props.jobdata.location}</dd>
        </dl>

        <a href={props.jobdata.link} target="_blank" rel="noopener noreferrer" title={props.jobdata.company} className="mb-4 job-image">
        <img src={"Images/" + props.jobdata.imagetitle + "-screenshot.jpg"} alt={props.jobdata.imagetitle} className="img-fluid" />
        </a>
       
        <p dangerouslySetInnerHTML={{__html: props.jobdata.summary}}></p> 
        
        {props.jobdata.glance1 && (
        <div>
          <h6>Highlights:</h6>
          <ul>
            <li>{props.jobdata.glance1}</li>
            <li>{props.jobdata.glance2}</li>
            <li>{props.jobdata.glance3}</li>
            <li>{props.jobdata.glance4}</li>
          </ul>
        </div>
        )}
      </div>
    )
};

export default job;