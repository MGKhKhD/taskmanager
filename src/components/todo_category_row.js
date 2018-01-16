import React, {Component} from 'react';

import TodoCategoryButtons from './todo_category_buttons';
import TodoRow from './todos_per_category';
import reshapeComponentWithLiTag  from './utils/reshap_component_with_li_tag';

const TodoCategoryRowBaseComponent = reshapeComponentWithLiTag(TodoCategoryButtons);


class TodoCategoryRow extends Component{
    constructor(props){
        super(props);
        this.state={shouldCategoryModify: false,
                modifiedInput: '',
                showingTodos: false
        } ;
    }

    handleTodoCategoryAction(option){
        if(option === "modify"){
            this.setState({shouldCategoryModify:true});
            this.props.canclingOtherCategoryModification(this.props.category)
        }else if (option === "delete"){
            this.props.handleTodoCategoryDelete(true);
        }else if(option === "todos"){
            this.setState({showingTodos: true});
        }else if(option === "archive"){
            this.props.handleTodoCategoryArchive(true);
        }else if (option === "add"){
            this.props.handleAddTodos(true);
            this.setState({showingTodos: true});
        }
    }




    render(){
        
        const elementTodoCat = (<TodoCategoryRowBaseComponent
            applyingTodoCategoryChange={this.handleTodoCategoryAction.bind(this)}>
            {this.props.category.todoCategory}
        </TodoCategoryRowBaseComponent>);

        const elementMofiable = (<div>
            <span className="badge badge-light badge-pill"
            onClick={()=> this.setState({shouldCategoryModify: false})}>
            X</span>
            <input  autoFocus="true"
        value={this.state.modifiedInput} 
        placeholder={this.props.category.todoCategory}
        onChange={(e) => {
            this.setState({modifiedInput: e.target.value});
                        }}
        onKeyPress={(e) => {
            if(e.key === 'Enter'){
                this.props.handleTodoCategoryModification(this.state.modifiedInput);
                this.setState({modifiedInput: ''});
                this.setState({shouldCategoryModify: false});
            }
        }}/>
        <TodoCategoryRowBaseComponent
            applyingTodoCategoryChange={this.handleTodoCategoryAction.bind(this)}/>
        </div>);

        if(this.state.shouldCategoryModify &&
            this.props.categoryUnderUpdate.id === this.props.category.id ){
            if(!this.state.showingTodos){
                return(
                    <div>{elementMofiable} </div>
                );
            }else{
                return(
                    <div>{elementMofiable}
                    <TodoRow
                        todos={this.props.todos}
                        category={this.props.category.todoCategory}
                        initiatingTodoUpdate={(todo)=>this.props.secondStageTodoUpdate(todo)}/>
                    </div>
                );
            }
            
        }else{
            if(!this.state.showingTodos){
                return(
                    <div>{elementTodoCat} </div>
                );
            }else{
                return(
                    <div>{elementTodoCat}
                    <TodoRow todos={this.props.todos}
                             category={this.props.category.todoCategory}
                             initiatingTodoUpdate={(todo)=>this.props.secondStageTodoUpdate(todo)}/>
                    </div>
                );
            }
        }        
    }
}




export default TodoCategoryRow;