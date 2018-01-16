import React, {Component} from 'react';
import DatePicker from 'react-date-picker';

import FooterTodoForm from './footer_todo_form';

class TodoDatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
        };
    }


    render() {
        return (
            <div>
                <DatePicker
                    onChange={date => {
                        this.setState({ date });
                        this.props.addDate(this.state.date);
                    }}
                    value={this.state.date}
                />
            </div>
        );
    }
}
  
  class FormTodoUpdate extends Component {
    constructor(props){
      super(props);
      this.state={todo: '', startDate: '', expireDate:''};
      this.focus = true;
  }

  getNewInput(e){
    this.setState({todo: e.target.value});       
  }

  onSubmit(e){
      e.preventDefault();
      console.log(this.state);
      this.props.handleTodo(this.state);
      this.setState({todo: '', startDate: '', expireDate:''});
  }

  render(){
      const placeholderText = !!this.props.gettingNewTodo? "add new todo" : "update todo"; 
      return( <div>
              <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder={placeholderText} autoFocus={this.focus}
          onChange={this.getNewInput.bind(this)}
          value={this.state.todo}/>
          <TodoDatePicker addDate={(date) =>this.setState({startDate: date})} />
              <TodoDatePicker addDate={(date) =>this.setState({expireDate: date})} />
                  <button type="submit">Add Todo</button>
              </form>
          <FooterTodoForm applyTodoUpdate={(action) => console.log(action)}/>
              <hr />
      </div>
      );
  }
}

  export default FormTodoUpdate;