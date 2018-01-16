import React, {Component} from 'react';
import { FireBaseKey } from '../configs/config';
import firebase from 'firebase/app';
import 'firebase/database';

import InputForm from './input_form';
import FormTodoUpdate from './form_todo_update';

import ShowTodosCategory from './show_category';

class App extends Component{
    constructor(props){
        super(props);
        this.state={todosCategory: [],
                    todos:[],
                    archivedCategory: [],
                    archivedTodos: [],
                    categoryUnderUpdate: '',
                    allowingNewTodo: false,//it is false or the id of the todoCategory
                    shouldTodoUpdate: false, //it is false or the todo should be updated
            };

        this.app = firebase.initializeApp(FireBaseKey);
        this.todoCategoryDB = this.app.database().ref().child('todoCategory');
        this.todosDB = this.app.database().ref().child('todos');
        this.archiveCategoryDB = this.app.database().ref().child('archiveCategory');
        this.archiveTodosDB = this.app.database().ref().child('archiveTodos');
        this.commentsTodosDB=this.app.database().ref().child('commentsTodos');
    }

    evaluateOldCategory(id){
        let { todosCategory } = this.state;
        let  oldCategory ='';
        for (let index=0; index < todosCategory.length; index++){
            if(todosCategory[index].id === id){
                oldCategory = todosCategory[index].todoCategory;
            }
        }
        if(oldCategory){
            return oldCategory
        }else{
            return false;
        }

    }

    componentWillMount(){
        const previousTodoCategory = this.state.todosCategory;
        this.todoCategoryDB.on('child_added', snap => {
            previousTodoCategory.push({
                id: snap.key,
                todoCategory: snap.val().todoCategory,
            });

            this.setState({
                todoCategory: previousTodoCategory
            });
        });


        this.todoCategoryDB.on('child_removed', snap => {
            for(let i=0; i < previousTodoCategory.length; i++){
                if(previousTodoCategory[i].id === snap.key){
                    previousTodoCategory.splice(i, 1);
                }
            }

            this.setState({
                todoCategory: previousTodoCategory
            });
        });

        this.todoCategoryDB.on('child_changed', snap => {
            for(let i=0; i < previousTodoCategory.length; i++){
                if(previousTodoCategory[i].id === snap.key){
                    previousTodoCategory.splice(i, 1);
                    previousTodoCategory.push({
                        id: snap.key,
                        todoCategory: snap.val().todoCategory,
                    });
                }
            }

            this.setState({
                todoCategory: previousTodoCategory
            });
        });


        const previousArchiveCategory = this.state.archivedCategory;
        this.archiveCategoryDB.on('child_added', snap => {
            previousArchiveCategory.push({
                id: snap.key,
                todoCategory: snap.val().todoCategory,
            });

            this.setState({
                archivedCategory: previousArchiveCategory
            });
        });


        const previousTodos = this.state.todos;
        this.todosDB.on('child_added', snap => {
            previousTodos.push({
                id: snap.key,
                todo: snap.val().todo,
            });

            this.setState({
                todos: previousTodos
            });
        });

    }

    onHandleTodoCategory(newCat){
        this.todoCategoryDB.push().set({ todoCategory: newCat});
    }

    handleDeletingCategory(id){
        const oldCategory = this.evaluateOldCategory(id);

        this.todoCategoryDB.child(id).remove();

        if(oldCategory){
            let { todos } = this.state;
            for(let i=0; i< todos.length; i++){
                if (todos[i].todo.category === oldCategory){
                    const id = todos[i].id;
                    this.todosDB.child(id).remove();
                }
            }
        }

    }

    handleModifiedCategory(category) {
        const oldCategory = this.evaluateOldCategory(category.id);

        this.todoCategoryDB.child(category.id).update({todoCategory: category.todoCategory});

        if(oldCategory) {
            let { todos } = this.state;
            for(let i=0; i< todos.length; i++){
                if (todos[i].todo.category === oldCategory){
                    const id = todos[i].id;
                    todos[i].todo.category = category.todoCategory;
                    this.todosDB.child(id).update({todo: todos[i].todo});
                }
            }
        }


    }

    handleArchiving(category){
        const oldCategory = this.evaluateOldCategory(category.id);

        this.todoCategoryDB.child(category.id).remove();
        this.archiveCategoryDB.push().set({ todoCategory: category.todoCategory});

        if(oldCategory) {
            let { todos } = this.state;
            for(let i=0; i< todos.length; i++){
                if (todos[i].todo.category === oldCategory){
                    const id = todos[i].id;
                    this.todosDB.child(id).remove();
                    this.archiveTodosDB.push().set({ todo: todos[i]});
                }
            }
        }

    }

    onHandleTodo(newTodo){
        const id = this.state.allowingNewTodo;
        let { todosCategory } = this.state;
        let addedTodo;
        for (let index=0; index < todosCategory.length; index++){
            if(todosCategory[index].id === id){
                addedTodo = {
                    task: newTodo.todo,
                    comments: [],
                    commentsDate:[],
                    createdTime: newTodo.startDate,
                    deadline: newTodo.expireDate,
                    category: todosCategory[index].todoCategory};
            }
        }
        if(addedTodo){
            this.todosDB.push().set({ todo: addedTodo});
        }

        this.setState({allowingNewTodo: false});
    }


    addingNewTodos(id){
        this.setState({allowingNewTodo: id});
    }

    onHandlingTodoUpdate(todo){
        this.setState({shouldTodoUpdate: todo});
        console.log(todo);
    }

    filterAction(action){
        console.log(action);
    }

    render(){
        const todoDecision = !!this.state.allowingNewTodo || !! this.state.shouldTodoUpdate;
        const elementInputForm = todoDecision?  
        <FormTodoUpdate handleTodo={this.onHandleTodo.bind(this)}
        gettingNewTodo={this.state.allowingNewTodo}
        updatingTodo={this.state.shouldTodoUpdate}/> :
        <InputForm startApplyingFilter={this.filterAction.bind(this)}
                    handleTodoCategory={this.onHandleTodoCategory.bind(this)}
                    />
        return(<div>
                <br />
                <br />
            <div className="container col-md-6" style={{backgroundColor: '#EBECF0'}}>
                {elementInputForm}
                    <ShowTodosCategory todosCategory={this.state.todosCategory} todos={this.state.todos}
                    doModificationOnTodoCategory={this.handleModifiedCategory.bind(this)}
                    onCategoryDelete={this.handleDeletingCategory.bind(this)}
                    onCategoryArchive={this.handleArchiving.bind(this)}
                    onAddingNewTodos={this.addingNewTodos.bind(this)}
                    handlingTodoUpdate={this.onHandlingTodoUpdate.bind(this)}
                    makingSureOnlyOneCategoryIsUpdatable={(category)=>{
                        this.setState({categoryUnderUpdate:category})
                    }}
                    categoryUnderUpdate={this.state.categoryUnderUpdate}/>
                </div>
            </div>
        );              
    }
}

export default App;

