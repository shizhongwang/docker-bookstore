package com.sample;


public class ContractInvoice {

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
  private java.sql.Timestamp invoiceAt;
  private String description;
  private java.sql.Timestamp createAt;
  private java.sql.Timestamp updateAt;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getContractNum() {
    return contractNum;
  }

  public void setContractNum(String contractNum) {
    this.contractNum = contractNum;
  }


  public String getInvoiceCategory() {
    return invoiceCategory;
  }

  public void setInvoiceCategory(String invoiceCategory) {
    this.invoiceCategory = invoiceCategory;
  }


  public String getInvoiceId() {
    return invoiceId;
  }

  public void setInvoiceId(String invoiceId) {
    this.invoiceId = invoiceId;
  }


  public String getInvoiceNum() {
    return invoiceNum;
  }

  public void setInvoiceNum(String invoiceNum) {
    this.invoiceNum = invoiceNum;
  }


  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }


  public String getProductCategory() {
    return productCategory;
  }

  public void setProductCategory(String productCategory) {
    this.productCategory = productCategory;
  }


  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }


  public String getProductModel() {
    return productModel;
  }

  public void setProductModel(String productModel) {
    this.productModel = productModel;
  }


  public String getProductUnit() {
    return productUnit;
  }

  public void setProductUnit(String productUnit) {
    this.productUnit = productUnit;
  }


  public double getProductCount() {
    return productCount;
  }

  public void setProductCount(double productCount) {
    this.productCount = productCount;
  }


  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }


  public double getTax() {
    return tax;
  }

  public void setTax(double tax) {
    this.tax = tax;
  }


  public double getSum() {
    return sum;
  }

  public void setSum(double sum) {
    this.sum = sum;
  }


  public double getInvoiceSum() {
    return invoiceSum;
  }

  public void setInvoiceSum(double invoiceSum) {
    this.invoiceSum = invoiceSum;
  }


  public java.sql.Timestamp getInvoiceAt() {
    return invoiceAt;
  }

  public void setInvoiceAt(java.sql.Timestamp invoiceAt) {
    this.invoiceAt = invoiceAt;
  }


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  public java.sql.Timestamp getCreateAt() {
    return createAt;
  }

  public void setCreateAt(java.sql.Timestamp createAt) {
    this.createAt = createAt;
  }


  public java.sql.Timestamp getUpdateAt() {
    return updateAt;
  }

  public void setUpdateAt(java.sql.Timestamp updateAt) {
    this.updateAt = updateAt;
  }

}
