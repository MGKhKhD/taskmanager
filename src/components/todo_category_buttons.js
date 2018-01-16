import React, {Component} from 'react';

import FooterActionButtons from './footer_action_buttons';



const Attrs = [
 {color: 'primary', name: "modify", key: "1"}, 
 {color: 'dark', name: "delete", key: "2"}, 
{color: 'success', name: "archive", key: "3"},
  {color: 'danger', name: "todos", key: "4"},
  {color: 'info', name: "add", key: "5"}
];




class TodoCategoryButtons extends Component{
    constructor(props){
        super(props);
        this.state={clickingTodoHead: false};
    }

    handleTodoCategoryChange(name){
        this.props.applyingTodoCategoryChange(name);
        this.setState({clickingTodoHead: false});
    }

    render(){
        if(this.state.clickingTodoHead){
            return(<React.Fragment>
            <span className="badge badge-light badge-pill offset-6"
                  onClick={()=> {
                      this.setState({clickingTodoHead: false});
                  }}>
            ...</span>
            <FooterActionButtons Attrs={Attrs}
            trigerredAction={this.handleTodoCategoryChange.bind(this)}/>
            </React.Fragment>);
        }
        else{
            return <span className="badge badge-light badge-pill offset-6"
            onClick={()=> this.setState({clickingTodoHead: true})}>
            ...</span>;
        }
    }
}

export default TodoCategoryButtons;
