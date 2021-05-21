package by.doubleK.banksservice.controller;

import by.doubleK.banksservice.entity.Bank;
import by.doubleK.banksservice.entity.BankAccount;
import by.doubleK.banksservice.entity.Client;
import by.doubleK.banksservice.entity.Worker;
import by.doubleK.banksservice.service.BankAccountService;
import by.doubleK.banksservice.service.BankService;
import by.doubleK.banksservice.service.ClientService;
import by.doubleK.banksservice.service.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@EnableWebMvc
public class BankController {

    private BankService bankService;
    private ClientService clientService;
    private BankAccountService bankAccountService;
    private WorkerService workerService;


    @Autowired
    public BankController(BankService bankService, ClientService clientService, BankAccountService bankAccountService, WorkerService workerService) {
        this.clientService = clientService;
        this.bankService = bankService;
        this.bankAccountService = bankAccountService;
        this.workerService = workerService;
    }

    @GetMapping("/")
    List<Bank> allBanks() {
        return bankService.getAll();
    }


    @PostMapping("/newBank")
    void newBankSubmit(@RequestBody Bank bank) {
        bankService.addBank(bank);
    }


    @GetMapping("/{id}")
    Bank showBank(@PathVariable("id") Long id) {
        return bankService.getById(id);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        List<Client> clients = clientService.getAll();
        for (Client client : clients) {
            if (id.equals(client.getBank().getId())) {
                Long clientId = client.getId();
                List<BankAccount> bankAccounts = bankAccountService.getAll();
                for (BankAccount account : bankAccounts) {
                    if (clientId.equals(account.getClient().getId())) {
                        Long accountId = account.getId();
                        bankAccountService.delete(accountId);
                    }
                }
                clientService.delete(clientId);
            }
        }
        List<Worker> workers = workerService.getAll();
        for (Worker worker : workers
        ) {
            if (id.equals(worker.getBank().getId())) {
                Long workerId=worker.getId();
                workerService.delete(workerId);
            }
        }

        bankService.delete(id);
    }


    @PutMapping("/{id}/edit")
    public void update(@RequestBody Bank bank, @PathVariable Long id) {
        bankService.editBank(bank, id);
    }
}
