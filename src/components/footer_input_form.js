import React, { Component } from 'react';

import FooterActionButtons from './footer_action_buttons';

const Attrs = [
 {color: 'primary', name: "all", key: "1"}, 
 {color: 'dark', name: "active", key: "2"}, 
{color: 'success', name: "inactive", key: "3"},
  {color: 'danger', name: "expired", key: "4"},
  {color: 'info', name: "archive", key: "5"}
];

const FooterInputForm = (props) => {
            return( 
            <FooterActionButtons Attrs={Attrs} trigerredAction={(name)=> props.applyFilter(name)}
            />);
}

export default FooterInputForm;
