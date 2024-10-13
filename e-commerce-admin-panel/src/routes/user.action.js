import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT_ID)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function getUsers() {
  try {
    const response = await databases.listDocuments(
      process.env.REACT_APP_APPWRITE_DATABSE_ID,
      process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID,
      [ID]
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}
