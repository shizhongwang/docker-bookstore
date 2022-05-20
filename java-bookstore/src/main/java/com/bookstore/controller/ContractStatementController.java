package com.bookstore.controller;

import com.bookstore.entity.ContractStatement;
import com.bookstore.repository.ContractStatementRepository;
import com.bookstore.service.ContractStatementService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ContractStatementController {
    @Autowired
    private ContractStatementService contractService;

    @Autowired
    private ContractStatementRepository contractRepository;

    @GetMapping("/contractStatements")
    public List<ContractStatement> getAllContractStatements() {
        return contractRepository.findAll();
    }


    @PostMapping("/contractStatement")
    public ContractStatement createContractStatement(@RequestBody ContractStatement contract) {
        return contractService.saveOrUpdate(contract);
    }

    @PostMapping("/contractStatements")
    public ContractStatement[] createContractStatements(@RequestBody ContractStatement[] contracts) {
        return contractService.saveOrUpdateBatch(contracts);
    }
}
