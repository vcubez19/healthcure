import * as sdk from "node-appwrite";

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_STORAGE_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT
} = process.env;

const client = new sdk.Client();

// TODO: Replace with env variables

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6696b6a10007b9e4cff3")
    .setKey("e5f2f7c08c9f30a66ca6214c02524ff73147b07ea3bc7dec99aebe184566479da9804bc13c98ed99398e05a8343f93d064ee45e541653febd41ec996025e2a47d029cd4af2f7046b606b49d4f089e33c122d29c4212be4fe10c04dee26f8072744c455f6684332a7367e0ffbbc4ad9fe471a0939092bcd3d0126cc8310c017ce")

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
