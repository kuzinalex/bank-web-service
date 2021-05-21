import React, {Component} from 'react';
import axios from 'axios'
import { Formik } from 'formik'

class BankAddComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            
        }
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={async (values, actions) => {
                        await axios.post('http://localhost:8080/newBank', {
                            ...values
                        })

                        this.props.history.push('/')
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.name}
                                name="name"
                            />

                            <button type="submit">Add</button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default BankAddComponent;