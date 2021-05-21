package by.doubleK.banksservice.controller;

import by.doubleK.banksservice.entity.BankAccount;
import by.doubleK.banksservice.entity.Client;
import by.doubleK.banksservice.service.BankAccountService;
import by.doubleK.banksservice.service.BankService;
import by.doubleK.banksservice.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@EnableWebMvc
public class ClientController {

    private ClientService clientService;
    private BankService bankService;
    private BankAccountService bankAccountService;

    @Autowired
    public ClientController(ClientService clientService, BankService bankService, BankAccountService bankAccountService) {
        this.clientService = clientService;
        this.bankService = bankService;
        this.bankAccountService = bankAccountService;
    }

    @GetMapping("/{id}/clients")
    List<Client> allClients(@PathVariable Long id) {
        return clientService.findClientsByBankId(id);
    }


    @PostMapping("/{id}/clients/newClient")
    void submitNewClient(@RequestBody Client client, @PathVariable("id") Long id) {
        Long maxId = clientService.getAll().stream().map(Client::getId).max(Long::compareTo).orElse(0L);
        client.setId(++maxId);
        client.setBank(bankService.getById(id));
        clientService.addClient(client);
    }

    @GetMapping("/clients/{idC}")
    Client showClient(@PathVariable("idC") Long id) {
        return clientService.getById(id);
    }

    @DeleteMapping("/clients/{idC}")
    public void deleteClient(@PathVariable("idC") Long id) {
        List<BankAccount> bankAccounts = bankAccountService.getAll();
        for (BankAccount account : bankAccounts
        ) {
            if (id.equals(account.getClient().getId())) {
                Long accountId=account.getId();
                bankAccountService.delete(accountId);
            }
        }
        clientService.delete(id);
    }


    @PutMapping("/{id}/clients/{idC}/editClient")
    public void updateClient(@RequestBody Client client, @PathVariable("idC") Long idC, @PathVariable("id") Long id) {

        client.setBank(bankService.getById(id));
        clientService.editClient(client, idC);

    }
}
