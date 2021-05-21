import React, {Component} from 'react';
import {withRouter} from "react-router";
import WorkerService from "../Services/WorkerService";
import {Link} from "react-router-dom";
import ClientService from "../Services/ClientService";
import axios from "axios";

class ListWorkerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
            bankId: ''
        }
    }

    async deleteWorkerHandler(workerId) {
        await axios.delete(`http://localhost:8080/workers/${workerId}`)

        const response = await axios.get(`http://localhost:8080/${this.state.bankId}/workers`)
        this.setState({
            workers: response.data
        })
    }

    componentDidMount() {
        const bankId = this.props.match.params.bankId;

        this.setState({
            bankId
        })

        WorkerService.getWorkers(bankId).then((res) => {
                this.setState({workers: res.data});
            }
        );
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Workers List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Worker first name</th>
                            <th>Worker last name</th>
                            <th>Worker phone number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.workers && this.state.workers.map(
                            workers =>
                                <tr key={workers.id}>
                                    <td>{workers.firstName}</td>
                                    <td>{workers.lastName}</td>
                                    <td>{workers.phoneNumber}</td>
                                    <td><Link to={`/${this.state.bankId}/workers/${workers.id}/update`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={this.deleteWorkerHandler.bind(this, workers.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                    <Link to={`/${this.state.bankId}/add-worker`}>Add worker</Link>
                </div>
                <div className="background" align="center">
                    {/*<h2>HELLO BANK WORKERS</h2>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(ListWorkerComponent);
