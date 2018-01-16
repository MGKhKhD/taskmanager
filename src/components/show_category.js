import React, {Component} from 'react';

import TodoCategoryRow from './todo_category_row';

class ShowTodosCategory extends Component{
    constructor(props){
        super(props);
        this.state={newTodoCategory: ''};
    }


    render(){
        const rows = [];
        const { todosCategory, todos } = this.props; 

        todosCategory.forEach((category) => {
            rows.push(<React.Fragment key={category.id}>
                <TodoCategoryRow
                category={category} todos={todos}
                handleTodoCategoryModification={(data) =>
                { const newData={id: category.id,
                   todoCategory: data};
                   this.props.doModificationOnTodoCategory(newData);
                }}
                handleTodoCategoryDelete={() => 
                    this.props.onCategoryDelete(category.id)}
                    handleTodoCategoryArchive={() => 
                        this.props.onCategoryArchive(category)}
                        handleAddTodos={() => this.props.onAddingNewTodos(category.id)}
                secondStageTodoUpdate={(todo)=>this.props.handlingTodoUpdate(todo)}
                                 canclingOtherCategoryModification={(todoHead)=>
                                 this.props.makingSureOnlyOneCategoryIsUpdatable(todoHead)}
                                 categoryUnderUpdate={this.props.categoryUnderUpdate}/>
                <hr style={{ border: '0',
                    height: '0',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)'}} />
            </React.Fragment>)
                });

        return(
            <ul  style={{listStyle: 'none'}}>
                {rows}
            </ul>
        );
    }
}

export default ShowTodosCategory;