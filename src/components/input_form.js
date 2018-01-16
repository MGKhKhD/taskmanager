import React, {Component} from 'react';

import FooterInputForm from './footer_input_form';

class InputForm extends Component{
    constructor(props){
        super(props);
        this.state={todoCategory: '',
            clickingToAppearFooterInput: false};
        this.focus = true;
    }

    getNewInput(e){
        this.setState({todoCategory: e.target.value});      
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.props.handleTodoCategory(this.state.todoCategory);
            this.setState({todoCategory: ''});
        }
    }



    render(){
        const placeholderText = "add new todo Category"; 
        const value= this.state.todoCategory;
        return( <div>
                <br />
            <input className="col-md-9 offset-1" type="text"
                   placeholder={placeholderText} autoFocus={this.focus}
            onChange={this.getNewInput.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            value={value}/><span className="badge badge-light badge-pill offset-1"
            onClick={()=>{
                if(!this.state.clickingToAppearFooterInput){
                    this.setState({clickingToAppearFooterInput: true});
                }else{
                    this.setState({clickingToAppearFooterInput: false});
                }
            }}>...</span>
                {this.state.clickingToAppearFooterInput &&
                <span>
                    <FooterInputForm applyFilter={(action) => this.props.startApplyingFilter(action)}/>
                </span> }
                <hr />
        </div>
        );
    }
}

export default InputForm;