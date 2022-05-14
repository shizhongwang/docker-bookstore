// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /**
   * below is for PROF
   */
  // urlContracts: "http://49.7.182.249:9200/contracts",
  // urlBooks: "http://49.7.182.249:9200/books",
  // urlCategory: "http://49.7.182.249:9200/book-category",

  /**
   * below is for local
  */
  urlContracts: "http://localhost:8080/contracts",
  urlBooks: "http://localhost:8080/books",
  urlCategory: "http://localhost:8080/book-category",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
