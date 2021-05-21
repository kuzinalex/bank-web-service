import axios from 'axios'

const BANK_API_BASE_URL = "http://localhost:8080/";

class BankService {
    getBanks() {
        return axios.get(BANK_API_BASE_URL);
    }
}

export default new BankService()