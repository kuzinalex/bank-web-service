package by.doubleK.banksservice.service;

import by.doubleK.banksservice.entity.BankAccount;

import java.util.List;

public interface BankAccountService {
    BankAccount addBankAccount(BankAccount bankAccount);
    void delete(Long id);
    BankAccount getById(long id);
    void editBankAccount(BankAccount bankAccount,Long id);
    List<BankAccount> getAll();
}
