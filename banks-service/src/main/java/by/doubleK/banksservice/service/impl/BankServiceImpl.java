package by.doubleK.banksservice.service.impl;

import by.doubleK.banksservice.entity.Bank;
import by.doubleK.banksservice.repository.BankRepository;
import by.doubleK.banksservice.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankServiceImpl implements BankService {

    @Autowired
    private BankRepository bankRepository;


    @Override
    public Bank addBank(Bank bank) {
        return bankRepository.saveAndFlush(bank);
    }

    @Override
    public void editBank(Bank bank, Long id){
        Bank existedBank = bankRepository.findById(id).get();
        existedBank.setName(bank.getName());
        bankRepository.save(existedBank);
    }
    @Override
    public void delete(long id) {
        bankRepository.deleteById(id);
    }

    @Override
    public Bank getByName(String name) {
        return bankRepository.findByName(name);
    }

    @Override
    public Bank getById(long id) {
        return bankRepository.findById(id);
    }

    @Override
    public Bank editBank(Bank bank) {
        return bankRepository.saveAndFlush(bank);
    }

    @Override
    public List<Bank> getAll() {
        return bankRepository.findAll();
    }


}
