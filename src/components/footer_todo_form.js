import React, { Component } from 'react';

import FooterActionButtons from './footer_action_buttons';

const Attrs = [
 {color: 'primary', name: "comment", key: "1"}, 
 {color: 'dark', name: "detele", key: "2"}, 
{color: 'success', name: "flag", key: "3"},
  {color: 'danger', name: "deadline", key: "4"},
  {color: 'info', name: "archive", key: "5"}
];


const FooterTodoForm = (props) => {
    return( 
    <FooterActionButtons Attrs={Attrs} trigerredAction={(name)=> props.applyTodoUpdate(name)}
    />);
}

export default FooterTodoForm;

