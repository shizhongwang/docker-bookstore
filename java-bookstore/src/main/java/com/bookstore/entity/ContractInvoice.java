package com.bookstore.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "contract_invoice")
@Data
@ToString
public class ContractInvoice {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String contractNum;
  private String invoiceCategory;
  private String invoiceId;
  private String invoiceNum;
  private String clientName;
  private String productCategory;
  private String productName;
  private String productModel;
  private String productUnit;
  private double productCount;
  private double amount;
  private double tax;
  private double sum;
  private double invoiceSum;
  private Date invoiceAt;
  private String description;
  private Date createAt;
  private Date updateAt;
}
