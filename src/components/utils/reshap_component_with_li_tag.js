import React, {Component} from 'react';

const reshapeComponentWithLiTag =  (WrappedComponent) => (props) =>{
    if(props.children){
        return <li>{props.children}<WrappedComponent {...props}/></li>
    } else {
        return <WrappedComponent {...props}/>
    }
};

export default reshapeComponentWithLiTag;
