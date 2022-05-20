package com.bookstore.service;

import com.bookstore.entity.ContractInvoice;
import com.bookstore.repository.ContractInvoiceRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static cn.hutool.core.date.DateTime.now;

@Service
public class ContractInvoiceService {

    @Autowired
    ContractInvoiceRepository contractInvoiceRepository;

    public ContractInvoice saveOrUpdate() {
        ContractInvoice contractStatement = new ContractInvoice();
        contractStatement.setId(100L);

        LogManager.getLogger().debug(contractStatement);

        contractInvoiceRepository.save(contractStatement);
        return contractStatement;
    }

    public ContractInvoice saveOrUpdate(ContractInvoice contractInvoice) {
        LogManager.getLogger().debug(contractInvoice);

        contractInvoice.setUpdateAt(now());
        contractInvoiceRepository.save(contractInvoice);
        return contractInvoice;
    }

    public ContractInvoice[] saveOrUpdateBatch(ContractInvoice[] contractInvoices) {
        LogManager.getLogger().debug(contractInvoices);

        for (ContractInvoice contract : contractInvoices) {
            contract.setUpdateAt(now());
            contractInvoiceRepository.save(contract);
        }
        return contractInvoices;
    }
}
