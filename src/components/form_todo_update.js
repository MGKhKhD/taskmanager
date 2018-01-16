import React, {Component} from 'react';


import FooterTodoForm from './footer_todo_form';
import PickDate from './PickingDate/piking_date';



  
  class FormTodoUpdate extends Component {
    constructor(props){
      super(props);
      this.state={todo: '', startDate: new Date(), expireDate: new Date()};
      this.focus = true;
  }

  getNewInput(e){
    this.setState({todo: e.target.value});       
  }

  onSubmit(e){
      e.preventDefault();
      this.props.handleTodo({todo: this.state.todo,
      startDate: this.state.startDate.toISOString(),
      expireDate: this.state.expireDate.toISOString()});
      this.setState({todo: '', startDate: '', expireDate:''});
  }

  render(){
      const placeholderText = !!this.props.gettingNewTodo? "add new todo" : "update todo"; 
      return( <div >
        <form onSubmit={this.onSubmit.bind(this)} > 
          <input type="text"  className="col-md-6 "
          placeholder={placeholderText} autoFocus={this.focus}
          onChange={this.getNewInput.bind(this)}
          value={this.state.todo}/>
          <button style={{marginLeft: '10px'}} type="submit" className="btn btn-primary" 
          disabled={!this.state.todo}>Add </button>
          <button style={{marginLeft: '5px'}} type="butoon" className="btn btn-secondary" 
          onClick={()=>this.props.calcellationOfTodoUpdate(this)}>Cancel</button>
          <button style={{marginLeft: '5px'}} type="butoon" className="btn btn-info" >More</button>
          <div className="row">
          <label > Start Date:
          <PickDate addDate={(date)=>this.setState({startDate: date.startDate})} />
          </label>
          <pre>   </pre>
          <label> Expire Date:
          <PickDate addDate={(date)=>this.setState({expireDate: date.expireDate})} />
          </label>
              </div>     
              </form>
              <hr />
      </div>
      );
  }
}

  export default FormTodoUpdate;