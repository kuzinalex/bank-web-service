import React, {Component} from 'react';
import { withRouter } from "react-router";
import BankAccountService from "../Services/BankAccountService";
import ClientService from "../Services/ClientService";
import {Link} from "react-router-dom";
import axios from "axios";


class ListBankAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccounts: [],
            clientId: ''
        }
    }

    componentDidMount(){
        const clientId = this.props.match.params.clientId;

        this.setState({
            clientId
        })

        BankAccountService.getBankAccounts(clientId).then((res) => {
                this.setState({bankAccounts: res.data});
            }
        );
    }

    async deleteBankAccountHandler (bankAccounts) {
        await axios.delete(`http://localhost:8080/accounts/${bankAccounts}`)
        console.log(this.state.clientId)
        const response = await axios.get(`http://localhost:8080/clients/${this.state.clientId}/accounts`)
        this.setState({
            bankAccounts: response.data
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Bank Accounts List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Amount of credits</th>
                            <th>Currency</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.bankAccounts && this.state.bankAccounts.map(
                            bankAccounts =>
                                <tr key={bankAccounts.id}>
                                    <td>{bankAccounts.amount}</td>
                                    <td>{bankAccounts.amountOfCredit}</td>
                                    <td>{bankAccounts.currency}</td>
                                    <td><Link to={`/${this.state.clientId}/accounts/${bankAccounts.id}/update`}>Update</Link></td>
                                    <td><button onClick={this.deleteBankAccountHandler.bind(this, bankAccounts.id)}>Delete</button></td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                    <Link to={`/${this.state.clientId}/add-bankAccount`}>Add bank account</Link>
                </div>
                <div className="background" align="center">
                    {/*<h2>HELLO BANK ACCOUNTS</h2>*/}
                </div>
            </div>
        );
    }
}

export default ListBankAccountComponent;
