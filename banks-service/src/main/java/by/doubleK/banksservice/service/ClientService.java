package by.doubleK.banksservice.service;

import by.doubleK.banksservice.entity.Client;

import java.util.List;

public interface ClientService {
    Client addClient(Client client);

    void delete(Long id);

    Client getByName(String name);

    Client getById(long id);

    void editClient(Client client, Long id);

    List<Client> findClientsByBankId(Long bankId);

    List<Client> getAll();
}
