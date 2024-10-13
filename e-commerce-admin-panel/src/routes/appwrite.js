import { Account, Client, Databases } from "appwrite";
 const client = new Client();
 client
  .setEndpoint(process.env.APPWRITE_ENDPOINT_ID)
  .setProject('66ed86b2000aff9435f4');

  export const account = Account(client);

  export const {database} = Databases(client);





