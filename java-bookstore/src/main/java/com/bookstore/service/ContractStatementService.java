package com.bookstore.service;

import com.bookstore.entity.ContractStatement;
import com.bookstore.repository.ContractStatementRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static cn.hutool.core.date.DateTime.now;

@Service
public class ContractStatementService {

    @Autowired
    ContractStatementRepository contractStatementRepository;

    public ContractStatement saveOrUpdate() {
        ContractStatement contractStatement = new ContractStatement();
        contractStatement.setId(100L);

        LogManager.getLogger().debug(contractStatement);

        contractStatementRepository.save(contractStatement);
        return contractStatement;
    }

    public ContractStatement saveOrUpdate(ContractStatement contractStatement) {
        LogManager.getLogger().debug(contractStatement);

        contractStatement.setUpdateAt(now());
        contractStatementRepository.save(contractStatement);
        return contractStatement;
    }

    public ContractStatement[] saveOrUpdateBatch(ContractStatement[] contractStatements) {
        LogManager.getLogger().debug(contractStatements);

        for (ContractStatement contract : contractStatements) {
            contract.setUpdateAt(now());
            contractStatementRepository.save(contract);
        }
        return contractStatements;
    }
}
