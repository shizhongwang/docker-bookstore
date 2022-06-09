// "id" : 101,
// "clientName" : "北京AA有限公司",
// "contractNum" : "ZBS2021-001-006",
// "contractAt" : "2012-01-01",
// "contractAmount" : 6896830.00,
// "projectName" : "AAAAAAAAAAAAAAAA邑上苑热计量改造项目",
// "description" : "世AA邑上苑热计量改造项目",
// "createAt" : "2012-01-01",
// "updateAt" : "2012-01-01"

export class Contract {
    id: number;

    companyName: string;
    clientName: string;
    contractNum: string;

    contractAt: Date;
    contractAmount: number;
    projectName: string;
    description: string;

    createAt: Date;
    updateAt: Date;
}
