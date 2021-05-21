package by.doubleK.banksservice.service.impl;

import by.doubleK.banksservice.entity.Worker;
import by.doubleK.banksservice.repository.WorkerRepository;
import by.doubleK.banksservice.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Override
    public Worker addWorker(Worker worker) {
        return workerRepository.saveAndFlush(worker);
    }

    @Override
    public void delete(Long id) {
        workerRepository.deleteById(id);
    }

    @Override
    public Worker getByName(String name) {
        return null;
    }

    @Override
    public Worker getById(long id) {
        return workerRepository.findById(id);
    }

    @Override
    public void editWorker(Worker worker, Long id) {
        workerRepository.setWorkerInfoById(worker.getFirstName(),worker.getLastName(),worker.getPhoneNumber(),worker.getStatus(),id);
    }

    @Override
    public List<Worker> getAll() {
        return workerRepository.findAll();
    }
}
