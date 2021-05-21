import React, { Component } from 'react';
import ClientService from '../Services/ClientService'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ListClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            bankId: ''
        }
    }

    componentDidMount () {
        const bankId = this.props.match.params.bankId;

        this.setState({
            bankId
        })

        ClientService.getClients(bankId).then((res) => {
            this.setState({clients: res.data});
            }
        );
    }

    async deleteClientHandler (clientId) {
        await axios.delete(`http://localhost:8080/clients/${clientId}`)

        const response = await axios.get(`http://localhost:8080/${this.state.bankId}/clients`)
        this.setState({
            clients: response.data
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Clients List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Client first name</th>
                            <th>Client last name</th>
                            <th>Client phone number</th>
                            <th>Client email</th>
                            <th>Client address</th>
                            <th>Bank accounts</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                            {this.state.clients && this.state.clients.map(
                                clients =>
                                    <tr key={clients.id}>
                                        <td>{clients.firstName}</td>
                                        <td>{clients.lastName}</td>
                                        <td>{clients.phoneNumber}</td>
                                        <td>{clients.email}</td>
                                        <td>{clients.address}</td>
                                        <td><Link to={`/clients/accounts/${clients.id}`}>Bank accounts</Link></td>
                                        <td><Link to={`/${this.state.bankId}/clients/${clients.id}/update`}>Update</Link></td>
                                        <td><button onClick={this.deleteClientHandler.bind(this, clients.id)}>Delete</button></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    <Link to={`/${this.state.bankId}/add-client`}>Add client</Link>
                </div>
                <div className="background" align="center">
                    {/*<h2>HELLO MY CLIENTS</h2>*/}
                </div>
            </div>
        );
    }
}

export default ListClientComponent;
