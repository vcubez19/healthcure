"use server";

import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_STORAGE_BUCKET_ID, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newUser);
    } catch (error: any) {
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal("email", [user.email])
            ])

            return documents?.users[0];
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {

    }
}

// TODO: Replace with .env variables.

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;

        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get("blobfile") as Blob,
                identificationDocument?.get("fileName") as string,
            )

            file = await storage.createFile("6697e00e00309f6aee6a", ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument("6697df95001474bc8962",
            "6697dfb30006febfd995",
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${"https://cloud.appwrite.io/v1"}/storage/buckets/${"6697e00e00309f6aee6a"}/files/${file?.$id}/view?project=${"6696b6a10007b9e4cff3"}`,
                ...patient
            }
        )

        return parseStringify(newPatient);
    } catch(error) {
        console.log(error)
    }
}
