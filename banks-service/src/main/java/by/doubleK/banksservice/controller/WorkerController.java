package by.doubleK.banksservice.controller;

import by.doubleK.banksservice.entity.Worker;
import by.doubleK.banksservice.service.BankService;
import by.doubleK.banksservice.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WorkerController {

    private WorkerService workerService;
    private BankService bankService;

    @Autowired
    public WorkerController(WorkerService workerService, BankService bankService) {
        this.workerService = workerService;
        this.bankService = bankService;
    }

    @GetMapping("/{id}/workers")
    List<Worker> allWorkers(@PathVariable Long id) {
        List<Worker> workers = workerService.getAll();
        List<Worker> workerList = new ArrayList<>();
        for (Worker worker : workers
        ) {
            if (id.equals(worker.getBank().getId())) {
                workerList.add(worker);
            }
        }

        return workerList;
    }


    @PostMapping("/{id}/workers/newWorker")
    public void submitNewWorker(@RequestBody Worker worker, @PathVariable("id") Long id) {
        Long maxId = workerService.getAll().stream().map(Worker::getId).max(Long::compareTo).orElse(0L);
        worker.setId(++maxId);
        worker.setBank(bankService.getById(id));
        workerService.addWorker(worker);
    }

    @GetMapping("/workers/{idW}")
    Worker showWorker(@PathVariable("idW") Long idW) {

        return workerService.getById(idW);
    }

    @DeleteMapping("/workers/{idW}")
    public void deleteWorker(@PathVariable("idW") Long id) {
        workerService.delete(id);
    }


    @PutMapping("/{id}/workers/{idW}/editWorker")
    public void updateWorker(@RequestBody Worker worker, @PathVariable("idW") Long idW, @PathVariable("id") Long id) {

        worker.setBank(bankService.getById(id));
        workerService.editWorker(worker, idW);

    }
}
