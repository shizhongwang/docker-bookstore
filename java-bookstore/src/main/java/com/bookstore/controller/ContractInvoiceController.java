package com.bookstore.controller;

import com.bookstore.entity.ContractInvoice;
import com.bookstore.repository.ContractInvoiceRepository;
import com.bookstore.service.ContractInvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ContractInvoiceController {
    @Autowired
    private ContractInvoiceService contractService;

    @Autowired
    private ContractInvoiceRepository contractRepository;

    @GetMapping("/contractInvoices")
    public List<ContractInvoice> getAllContractInvoices() {
        return contractRepository.findAll();
    }


    @PostMapping("/contractInvoice")
    public ContractInvoice createContractInvoice(@RequestBody ContractInvoice contract) {
        return contractService.saveOrUpdate(contract);
    }

    @PostMapping("/contractInvoices")
    public ContractInvoice[] createContractInvoices(@RequestBody ContractInvoice[] contracts) {
        return contractService.saveOrUpdateBatch(contracts);
    }
}
