import axios from 'axios'


class ClientService {
    getClients = async (idBank) => {
        return await axios.get(`http://localhost:8080/${idBank}/clients`);
    }
}

export default new ClientService()