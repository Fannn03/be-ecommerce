import { JwtPayload } from "jsonwebtoken";
import fs from 'fs';
import { UserJWT } from "@middleware/auth-middleware";
import { insertDocument } from "@domain/repositories/document"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationErrorAdapter } from "@common/adapters/error/validation-error.adapter";

interface documentInterface {
  fullname  :   string,
  nik       :   string,
  photos    :   Express.Multer.File
}

export default async (user: UserJWT | JwtPayload, body: documentInterface) => {
  const extension = body.photos.mimetype.split('/')[1]
  const fileName = `${user.name}.${extension}`

  try {
    const document = await insertDocument({
      user_id: user.id,
      fullname: body.fullname,
      nik: body.nik,
      photos: fileName
    })

    fs.renameSync(body.photos.path, `public/images/documents/${document.photos}`);
    const response = {
      user_id: document.user_id,
      fullname: document.fullname,
      nik: document.nik,
      photos: `documents/${document.photos}`,
      createdAt: document.createdAt
    }

    return response;
  } catch (err: any) {
    fs.rmSync(body.photos.path);
    
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code === "P2002" && err.meta?.target === "documents_user_id_key") {
        throw new ValidationErrorAdapter("User document already exist", 400, "bad request");
      } else if(err.code === "P2002" && err.meta?.target === "documents_nik_key") {
        throw new ValidationErrorAdapter("User nik already taken", 400, "bad request");
      } else {
        throw err
      }
    } else {
      throw new Error(err)
    }
  }
}