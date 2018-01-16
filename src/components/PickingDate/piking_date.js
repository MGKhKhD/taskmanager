import React, {Component} from 'react';
import DatePicker from 'react-date-picker';

class PickDate extends Component {
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
                    required={true}
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

export default PickDate;