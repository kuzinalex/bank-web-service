import React, {Component} from 'react';
import BankService from '../Services/BankService';
import {Link} from "react-router-dom";
import axios from "axios";

class ListBankComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banks: []
        }

        // this.addBank=this.addBank.bind(this);
    }

    componentDidMount() {
        BankService.getBanks().then((res) => {
                this.setState({banks: res.data});
            }
        );
    }

    async deleteBankHandler (bankId) {
        await axios.delete(`http://localhost:8080/${bankId}`)

        const response = await axios.get(`http://localhost:8080/`)
        this.setState({
            banks: response.data
        })
    }

    clickAddBankHandler() {
        this.props.history.push("/add-bank");
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Bank List</h2>
                <div className="row">
                    <button className="btn-btn-primary" onClick={this.clickAddBankHandler.bind(this)}>Add bank</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Bank name</th>
                            <th>Clients</th>
                            <th>Workers</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.banks.map(
                                banks =>
                                    <tr key={banks.id}>
                                        <td> {banks.name} </td>
                                        <td><Link to={`/clients/${banks.id}`}>Clients</Link></td>
                                        <td><Link to={`/workers/${banks.id}`}>Workers</Link></td>
                                        <td><Link to={`/${banks.id}/update`}>Update</Link></td>
                                        <td><button onClick={this.deleteBankHandler.bind(this, banks.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>
                <div className="background" align="center">
                    <h2>HELLO MY FRIENDS</h2>
                </div>
            </div>
        );
    }
}

export default ListBankComponent;
