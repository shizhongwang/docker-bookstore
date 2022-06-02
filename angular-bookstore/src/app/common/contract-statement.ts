        // `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        // `transaction_at`      DATETIME       DEFAULT NULL,
        // `voucher_num`    VARCHAR(255)   DEFAULT NULL,
        // `debit_amount`         DECIMAL(13, 2) DEFAULT NULL,
        // `credit_amount`         DECIMAL(13, 2) DEFAULT NULL,
        // `remaining_balance`         DECIMAL(13, 2) DEFAULT NULL,

        // `bank_serial_id`    VARCHAR(255)   DEFAULT NULL,
        // `opposite_account_num`    VARCHAR(255)   DEFAULT NULL,
        // `opposite_company_name`    VARCHAR(255)   DEFAULT NULL,
        // `category`    VARCHAR(255)   DEFAULT NULL,
        // `invoice_num`    VARCHAR(255)   DEFAULT NULL,

        // `desc`    VARCHAR(10240)   DEFAULT NULL,
        // `create_at`      DATETIME       DEFAULT NULL,
        // `update_at`      DATETIME       DEFAULT NULL

export class ContractStatement {
    id: number;

    clientName: string;
    contractNum: string;

    transactionAt: Date;
    voucherNum: string;
    debitAmount: number;
    creditAmount: number;
    remainingBalance: number;

    bankSerialId: string;
    oppositeAccountNum: string;
    oppositeCompanyName: string;
    category: string;
    invoiceNum: string;

    description: string;
    createAt: Date;
    updateAt: Date;
}
