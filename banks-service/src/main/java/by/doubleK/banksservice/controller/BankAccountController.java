package by.doubleK.banksservice.controller;

import by.doubleK.banksservice.entity.BankAccount;
import by.doubleK.banksservice.service.BankAccountService;
import by.doubleK.banksservice.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@EnableWebMvc
public class BankAccountController {

    private BankAccountService bankAccountService;
    private ClientService clientService;

    @Autowired
    public BankAccountController(BankAccountService bankAccountService, ClientService clientService) {
        this.bankAccountService = bankAccountService;
        this.clientService = clientService;
    }

    @GetMapping("/clients/{idC}/accounts")
    List<BankAccount> allAccounts(@PathVariable("idC") Long idC) {
        List<BankAccount> accounts = bankAccountService.getAll();
        List<BankAccount> accountList = new ArrayList<>();
        for (BankAccount account : accounts
        ) {
            if (idC.equals(account.getClient().getId())) {
                accountList.add(account);
            }
        }
        return accountList;
    }

    @PostMapping("/clients/{idC}/accounts/newAccount")
    void submitNewAccount(@RequestBody BankAccount bankAccount, @PathVariable("idC") Long idC) {
        Long maxId = bankAccountService.getAll().stream().map(BankAccount::getId).max(Long::compareTo).orElse(0L);
        bankAccount.setId(++maxId);
        bankAccount.setClient(clientService.getById(idC));
        bankAccountService.addBankAccount(bankAccount);
    }

    @GetMapping("/accounts/{idAc}")
    BankAccount showAccount(@PathVariable("idAc") Long idAc) {
        return bankAccountService.getById(idAc);
    }
    @DeleteMapping("/accounts/{idAc}")
    public void deleteAccount(@PathVariable Long idAc){
        bankAccountService.delete(idAc);
    }

    @PutMapping("/clients/{idC}/accounts/{idAc}/editAccount")
    public void updateAccount(@RequestBody BankAccount bankAccount,@PathVariable("idC") Long idC, @PathVariable("idAc") Long idAc){

        bankAccount.setClient(clientService.getById(idC));
        bankAccountService.editBankAccount(bankAccount,idAc);

    }
}
