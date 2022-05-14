package com.bookstore.controller;

import com.bookstore.entity.Book;
import com.bookstore.entity.Contract;
import com.bookstore.repository.ContractRepository;
import com.bookstore.service.ContractService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ContractController {
    @Autowired
    private ContractService contractService;

    @Autowired
    private ContractRepository contractRepository;

    @GetMapping("/contracts")
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }


    @PostMapping("/contract")
    public Contract createContract(@RequestBody Contract contract) {
        return contractService.saveOrUpdate(contract);
    }

    @PostMapping("/contracts")
    public Contract[] createContracts(@RequestBody Contract[] contracts) {
        return contractService.saveOrUpdateBatch(contracts);
    }
}
