package com.bookstore.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "contract_statement")
@Data
@ToString
public class ContractStatement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contractNum;
    private String clientName;

    private Date transactionAt;
    private String voucherNum;
    private double debitAmount;
    private double creditAmount;
    private double remainingBalance;
    private String bankSerialId;
    private String oppositeAccountNum;
    private String oppositeCompanyName;
    private String category;
    private String invoiceNum;
    private String description;
    private Date createAt;
    private Date updateAt;

}
