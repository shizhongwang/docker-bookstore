package com.bookstore.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "contract")
@Data
@ToString
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;
    private String contractNum;
    private Date contractAt;
    private BigDecimal contractAmount;
    private String projectName;
    private String description;
    private Date createAt;
    private Date updateAt;
}
