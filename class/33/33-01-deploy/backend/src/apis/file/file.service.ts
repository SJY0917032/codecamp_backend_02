import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';


interface IFiles {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFiles) {
    const storage = new Storage({
      keyFilename: '/my-secret/gcp-file-storage.json',
      projectId: "united-idea-347705",
    }).bucket("sjy0917-1");

    // 일단 먼저 다 받아오기
    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      // 다 받아온 파일들을 각각 Promise형태로 바꿔주고 위에서 ALL로 처리한다.
      waitedFiles.map((e) => {
        return new Promise((res, rej) => {
          e.createReadStream()
            .pipe(storage.file(e.filename).createWriteStream())
            .on('finish', () =>
              // 성공시에 해당함수
              res(`sjy0917-1/${e.filename}`),
            )
            .on('error', (error) =>
              // 실패시에 해당함수
              rej(error),
            );
        });
      }),
    );

    return results;
  }
}
