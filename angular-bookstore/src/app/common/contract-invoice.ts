//         `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         `contract_num`    VARCHAR(255)   DEFAULT NULL,

//         `invoice_category`    VARCHAR(255)   DEFAULT NULL,
//         `invoice_id`    VARCHAR(255)   DEFAULT NULL,
//         `invoice_num`    VARCHAR(255)   DEFAULT NULL,
//         `client_name`           VARCHAR(255)   DEFAULT NULL,

//         `product_category`           VARCHAR(255)   DEFAULT NULL,
//         `product_name`           VARCHAR(255)   DEFAULT NULL,
//         `product_model`           VARCHAR(255)   DEFAULT NULL,
//         `product_unit`           VARCHAR(255)   DEFAULT NULL,
//         `product_count`           DECIMAL(13, 2) DEFAULT NULL,

//         `amount`         DECIMAL(13, 2) DEFAULT NULL,
//         `tax`         DECIMAL(13, 2) DEFAULT NULL,
//         `sum`         DECIMAL(13, 2) DEFAULT NULL,

//         `invoice_sum`         DECIMAL(13, 2) DEFAULT NULL,
//         `invoice_at`      DATETIME       DEFAULT NULL,

//         `desc`    VARCHAR(10240)   DEFAULT NULL,
//         `create_at`      DATETIME       DEFAULT NULL,
//         `update_at`      DATETIME       DEFAULT NULL

export class ContractInvoice {
    id: number;

    clientName: string;
    contractNum: string;

    invoiceCategory: string;
    invoiceId: string;
    invoiceNum: string;

    productCategory: string;
    productName: string;
    productModel: string;
    productUnit: string;
    productCount: number;

    amount: number;
    tax: number;
    sum: number;

    invoiceSum: number;
    invoiceAt: Date;

    description: string;
    createAt: Date;
    updateAt: Date;
}
