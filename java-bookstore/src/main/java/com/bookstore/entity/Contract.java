package com.bookstore.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tbl_contract")
@Data
@ToString
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String firstParty;
    private String secondParty;
    private BigDecimal amount;

    private String memo;
    private String imageUrl;

    private Date createAt;
    private Date updateAt;

//	@ManyToOne
//	@JoinColumn(name="category_id", nullable=false)
//	private BookCategory category;

    private boolean active;
}
