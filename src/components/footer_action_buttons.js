import React, { Component } from 'react';

const prefixClassName = "badge badge-pill badge-";

const SingleButton =(props) =>{
    return(
        <span style={{fontSize: '.85rem', textAlign: 'center', paddingLeft: '10px'}}
        className={prefixClassName + props.color} onClick={() => 
            props.handleClick(props.text)}>{props.text}</span>
    );
}

class FooterActionButtons extends Component{
render(){
    const rows =[];
    this.props.Attrs.forEach((entry) => {
        rows.push(<SingleButton key={entry.key} color={entry.color} text={entry.name} 
           handleClick={(name)=>this.props.trigerredAction(name)} />)
    });
    return(
        <React.Fragment>
            <br />
            <ul style={{display: 'inline-block'}}>
                {rows}
            </ul>
        </React.Fragment>
    );
}
}

export default FooterActionButtons;