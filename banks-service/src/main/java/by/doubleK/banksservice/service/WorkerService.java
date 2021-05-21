package by.doubleK.banksservice.service;

import by.doubleK.banksservice.entity.Worker;

import java.util.List;

public interface WorkerService {
    Worker addWorker(Worker worker);

    void delete(Long id);

    Worker getByName(String name);

    Worker getById(long id);

    void editWorker(Worker worker, Long id);

    List<Worker> getAll();
}
