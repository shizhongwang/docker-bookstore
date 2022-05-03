package com.bookstore.repository;

import com.bookstore.entity.Contract;
import com.bookstore.entity.ContractStatement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface ContractStatementRepository extends JpaRepository<ContractStatement, Long> {
    @RestResource(path = "searchbykeyword")
    Page<Contract> findByOppositeCompanyNameContaining(@Param("oppositeCompanyName") String keyword, Pageable pageable);
}
