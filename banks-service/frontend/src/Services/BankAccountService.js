import axios from 'axios'


class BankAccountService {
    getBankAccounts = async (idClient) => {
        return await axios.get(`http://localhost:8080/clients/${idClient}/accounts`);
    }
}

export default new BankAccountService()