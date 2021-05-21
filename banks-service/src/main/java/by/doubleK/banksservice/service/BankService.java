package by.doubleK.banksservice.service;

import by.doubleK.banksservice.entity.Bank;

import java.util.List;

public interface BankService {

    Bank addBank(Bank bank);
    void editBank(Bank bank, Long id);
    void delete(long id);
    Bank getByName(String name);
    Bank getById(long id);
    Bank editBank(Bank bank);
    List<Bank> getAll();

}
