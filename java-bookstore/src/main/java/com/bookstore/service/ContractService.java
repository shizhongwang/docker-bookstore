package com.bookstore.service;

import com.bookstore.entity.Contract;
import com.bookstore.repository.ContractRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    @Autowired
    ContractRepository contractStatementRepository;

    public Contract saveOrUpdate() {
        Contract contract = new Contract();
        contract.setId(100L);
        contract.setClientName("setClientName00001");

        LogManager.getLogger().debug(contract);

        contractStatementRepository.save(contract);
        return contract;
    }

    public Contract saveOrUpdate(Contract contract) {
        LogManager.getLogger().debug(contract);

        contractStatementRepository.save(contract);
        return contract;
    }
}
