package com.bookstore.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "contract_statement")
@Data
@ToString
public class ContractStatement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private java.sql.Timestamp transactionAt;
  private String voucherNum;
  private double debitAmount;
  private double creditAmount;
  private double remainingBalance;
  private String bankSerialId;
  private String oppositeAccountNum;
  private String oppositeCompanyName;
  private String category;
  private String invoiceNum;
  private String desc;
  private java.sql.Timestamp createAt;
  private java.sql.Timestamp updateAt;

//
//  public long getId() {
//    return id;
//  }
//
//  public void setId(long id) {
//    this.id = id;
//  }
//
//
//  public java.sql.Timestamp getTransactionAt() {
//    return transactionAt;
//  }
//
//  public void setTransactionAt(java.sql.Timestamp transactionAt) {
//    this.transactionAt = transactionAt;
//  }
//
//
//  public String getVoucherNum() {
//    return voucherNum;
//  }
//
//  public void setVoucherNum(String voucherNum) {
//    this.voucherNum = voucherNum;
//  }
//
//
//  public double getDebitAmount() {
//    return debitAmount;
//  }
//
//  public void setDebitAmount(double debitAmount) {
//    this.debitAmount = debitAmount;
//  }
//
//
//  public double getCreditAmount() {
//    return creditAmount;
//  }
//
//  public void setCreditAmount(double creditAmount) {
//    this.creditAmount = creditAmount;
//  }
//
//
//  public double getRemainingBalance() {
//    return remainingBalance;
//  }
//
//  public void setRemainingBalance(double remainingBalance) {
//    this.remainingBalance = remainingBalance;
//  }
//
//
//  public String getBankSerialId() {
//    return bankSerialId;
//  }
//
//  public void setBankSerialId(String bankSerialId) {
//    this.bankSerialId = bankSerialId;
//  }
//
//
//  public String getOppositeAccountNum() {
//    return oppositeAccountNum;
//  }
//
//  public void setOppositeAccountNum(String oppositeAccountNum) {
//    this.oppositeAccountNum = oppositeAccountNum;
//  }
//
//
//  public String getOppositeCompanyName() {
//    return oppositeCompanyName;
//  }
//
//  public void setOppositeCompanyName(String oppositeCompanyName) {
//    this.oppositeCompanyName = oppositeCompanyName;
//  }
//
//
//  public String getCategory() {
//    return category;
//  }
//
//  public void setCategory(String category) {
//    this.category = category;
//  }
//
//
//  public String getInvoiceNum() {
//    return invoiceNum;
//  }
//
//  public void setInvoiceNum(String invoiceNum) {
//    this.invoiceNum = invoiceNum;
//  }
//
//
//  public String getDesc() {
//    return desc;
//  }
//
//  public void setDesc(String desc) {
//    this.desc = desc;
//  }
//
//
//  public java.sql.Timestamp getCreateAt() {
//    return createAt;
//  }
//
//  public void setCreateAt(java.sql.Timestamp createAt) {
//    this.createAt = createAt;
//  }
//
//
//  public java.sql.Timestamp getUpdateAt() {
//    return updateAt;
//  }
//
//  public void setUpdateAt(java.sql.Timestamp updateAt) {
//    this.updateAt = updateAt;
//  }

}
