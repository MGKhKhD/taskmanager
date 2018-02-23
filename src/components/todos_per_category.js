import React, {Component} from 'react';


class TodoInfButton extends Component{
    render(){
        return(
            <span className="badge badge-info badge-pill offset-1">
                {this.props.todoExpireDate}</span>
        );
    }
}




class TodoRow extends Component{
    constructor(props){
        super(props);
        this.state={needsUpdating: false};
    }

    render(){
        const subRows =[];
        const elementTodos = this.props.todos.forEach(todo1 =>{
            const todo = todo1.todo;
            const fontColor= todo.deadline === Infinity? 'red' : '#1B1B1B';
            const todoExpireDate = todo.deadline.slice(0, 10);
                if(this.props.category === todo.category){
                    subRows.push(
                    <React.Fragment key={todo1.id}>
                                <li className="offset-1"
                                onClick={() => {
                                this.props.initiatingTodoUpdate(todo);
                                this.setState({needsUpdating: true});
                                }}>
                                        {todo.task}
                                    <TodoInfButton todoExpireDate={todoExpireDate} />
                                </li>
                    </React.Fragment>);
                }
        });
        return(
        <div className="row">
            <div className="col-lg-6">
                <div className="bs-component">
                    <ul className="list-group" style={{marginLeft: '10px'}}>
                        {subRows}
                    </ul>
                </div>
            </div>
        </div>);
    }
}

export default TodoRow;