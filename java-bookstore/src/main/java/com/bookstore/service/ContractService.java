package com.bookstore.service;

import com.bookstore.entity.Contract;
import com.bookstore.repository.ContractRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static cn.hutool.core.date.DateTime.now;

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

        contract.setUpdateAt(now());
        contractStatementRepository.save(contract);
        return contract;
    }

    public Contract[] saveOrUpdateBatch(Contract[] contracts) {
        LogManager.getLogger().debug(contracts);

        for (Contract contract : contracts) {
            contract.setUpdateAt(now());
            contractStatementRepository.save(contract);
        }
        return contracts;
    }
}
