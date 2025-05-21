import fs from "fs"
import { getStorage, getDownloadURL } from "firebase-admin/storage"
import { fileTypeFromBuffer } from "file-type"
import { randomUUID } from "crypto"
import { ValidationError } from "../errors/validation.error.js"

export class UploadFileService {

    constructor (private path: string=""){}

    async upload(base64: string): Promise<string>{
        const fileBuffer =  Buffer.from(base64, "base64")

        const fileType = await fileTypeFromBuffer(fileBuffer)
        if (!fileType) {
            throw new ValidationError("Invalid file extension")
        }

        if(fileType.mime !== "image/png" && fileType.mime !== "image/jpeg"){
            throw new ValidationError("Image must be png or jpeg")
        }

        const fileName = `${randomUUID().toString()}.${fileType?.ext}`
        fs.writeFileSync(fileName, fileBuffer)

        const bucket = getStorage().bucket("e-commerce-faa37.firebasestorage.app")
        const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName
        })

        fs.unlinkSync(fileName)

        return getDownloadURL(uploadResponse[0])
    }
}