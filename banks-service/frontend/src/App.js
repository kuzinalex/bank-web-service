import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import logo from './logo.svg'
import ListBankComponent from "./components/ListBankComponent";
import ListClientComponent from "./components/ListClientComponent";
import ListWorkerComponent from "./components/ListWorkerComponent";
import ListBankAccountComponent from "./components/ListBankAccountComponent";
import BankAddComponent from "./components/BankAddComponent";
import AddClientComponent from "./components/AddClientComponent";
import UpdateClientComponent from "./components/UpdateClientComponent";
import UpdateWorkerComponent from "./components/UpdateWorkerComponent";
import AddWorkerComponent from "./components/AddWorkerComponent";
import AddBankAccountComponent from "./components/AddBankAccountComponent";
import UpdateBankAccountComponent from "./components/UpdateBankAccountComponent";
import UpdateBankComponent from "./components/UpdateBankComponent";

function App() {
    return (
        <div>
            <Router>
                <div className="container">
                    <Switch>
                        <Route path={'/:bankId/clients/:clientId/update'} component={UpdateClientComponent}/>
                        <Route path={'/:bankId/workers/:workerId/update'} component={UpdateWorkerComponent}/>
                        <Route path={"/:clientId/accounts/:accountId/update"} component={UpdateBankAccountComponent}/>
                        <Route path={"/:bankId/update"} component={UpdateBankComponent}/>
                        <Route path="/clients/accounts/:clientId" component={ListBankAccountComponent}/>
                        <Route path="/clients/:bankId" component={ListClientComponent}/>
                        <Route path="/workers/:bankId" component={ListWorkerComponent}/>
                        <Route path="/add-bank" component={BankAddComponent}/>
                        <Route path={"/:bankId/add-client"} component={AddClientComponent}/>
                        <Route path={"/:bankId/add-worker"} component={AddWorkerComponent}/>
                        <Route path={"/:clientId/add-bankAccount"} component={AddBankAccountComponent}/>
                        <Route path="/" exact component={ListBankComponent}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;