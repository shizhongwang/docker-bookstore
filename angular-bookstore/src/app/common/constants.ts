export class Constants
{
    static Configuration = class
    {
        static CookieName:string = 'etl_language';
    };

    static View = class
    {
        static Militaries:string = 'militaries';
        static Mutants:string = 'mutants';
        static Objects:string = 'objects';
        static Scientists:string = 'scientists';
    };

    // static categories = [
    //     { "id": "bj", "category": "北京" },
    //     { "id": "sh", "category": "上海" },
    //     { "id": "zz", "category": "郑州" }
    // ];

    static categories = [
	    {id : "Google", category : "http://www.google.com"},
	    {id : "Runoob", category : "http://www.runoob.com"},
	    {id : "Taobao", category : "http://www.taobao.com"}
	];

    // static categories =
    // [
    //     "Writing code",
    //     "Testing code",
    //     "Fixing bugs",
    //     "Dancing"
    // ];
}
