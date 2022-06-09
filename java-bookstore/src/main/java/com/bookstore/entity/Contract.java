package com.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

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

    private String companyName;
    private String contractNum;
    private String clientName;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "dd/MM/yyyy")         //to accept the json string format
    private Date contractAt;
    private BigDecimal contractAmount;
    private String projectName;
    private String description;
    private Date createAt;
    private Date updateAt;
}
