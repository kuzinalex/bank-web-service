package by.doubleK.banksservice.service.impl;

import by.doubleK.banksservice.entity.Client;
import by.doubleK.banksservice.repository.ClientRepository;
import by.doubleK.banksservice.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client addClient(Client client) {
        Client savedClient = clientRepository.saveAndFlush(client);
        return savedClient;
    }

    @Override
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Client getByName(String name) {
        return null;
    }

    @Override
    public Client getById(long id) {

        return clientRepository.findById(id);
    }

    @Override
    public void editClient(Client client, Long id) {
        clientRepository.setUserInfoById(client.getFirstName(), client.getLastName(), client.getAddress(), client.getEmail(), client.getPhoneNumber(), id);
    }

    @Override
    public List<Client> findClientsByBankId(Long bankId) {
        return clientRepository.findClientsByBankId(bankId);
    }


    @Override
    public List<Client> getAll() {
        return clientRepository.findAll();
    }


}
