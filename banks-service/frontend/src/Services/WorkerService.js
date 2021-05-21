import axios from 'axios'


class WorkerService {
    getWorkers = async (idBank) => {
        return await axios.get(`http://localhost:8080/${idBank}/workers`);
    }
}

export default new WorkerService()