const neverRender = (WrappedComponent) => (
    class extends Component{
        shouldComponentUpdate(){
            return false;
        }
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
);
