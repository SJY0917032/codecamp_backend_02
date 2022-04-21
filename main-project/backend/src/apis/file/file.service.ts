import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import { FileUpload } from 'graphql-upload';


config();

interface IFiles {
  processFiles: FileUpload[];
}

@Injectable()
export class FileService {

  async uploadFileToStorage( {processFiles} : IFiles)  {
    const storage = new Storage({
      keyFilename: process.env.KEY_FILENAME,
      projectId: process.env.PROJECT_ID,
    }).bucket(process.env.GOOGLE_BUCKET);

    // 파일을 받아온다 
    // const  processFiles = await Promise.all(files)    

    // 받은 파일을 promise 형태로 바꾸고, all을통해 업로드한다.
    const results = await Promise.all(
        processFiles.map((e) => {
            const res: Promise<string> = new Promise((resolve, reject) => {
                e.createReadStream()
                .pipe(storage.file(e.filename).createWriteStream())
                .on('finish', () =>
                  // 성공시에 해당함수
                  resolve(`${process.env.GOOGLE_BUCKET}/${e.filename}`),
                )
                .on('error', () =>
                  // 실패시에 해당함수
                  reject("업로드중 에러가 발생했습니다."),
                );
            })
            return res
        })
    )
    return results
}


}
