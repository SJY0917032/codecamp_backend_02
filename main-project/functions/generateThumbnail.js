"use strict";
const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

// 구글 클라우드 스토리지 객체를 하나 생성합니다.
const storage = new Storage();

// 함수 ON
exports.processThumbImage = async (file, context) => {
  // if문으로 썸네일이 들어왔으면 그냥 리턴시켜서 함수를 종료시킨다.
  if (file.name.search(`thumb@`) != -1) return;

  // 현재 버킷을 찾아서 객체할당한다.
  const scrBucket = storage.bucket(file.bucket);

  // 변환할 사이즈
  const sizes = [320, 640, 1280];
  // 사이즈 크기만큼 돈다 (Promise객체를 만들기위해~)
  const uploadPromises = sizes.map((size) => {
    // 썸네일 디렉토리 / 사이즈 / 썸네일사이즈이름 / 파일명
    let thumbName = "";
    // 분류
    if (size == 320) {
      thumbName = `thumb/s/thumb@${size}_${file.name}`;
    }
    if (size == 640) {
      thumbName = `thumb/m/thumb@${size}_${file.name}`;
    }
    if (size == 1280) {
      thumbName = `thumb/l/thumb@${size}_${file.name}`;
    }

    // if else로 분기한다.
    // 분기하지 않으면 무한으로 파일이 만들어짐
    if (file.name.search(`thumb@`) == -1) {
      // 만약 파일의이름에 썸네일이 들어가있지 않다면
      const gcsObject = scrBucket.file(file.name);
      const gcsNewObject = scrBucket.file(thumbName);

      // 현재 파일을 읽는 스트림과
      const srcStream = gcsObject.createReadStream();
      // 앞으로 쓸 파일에대한 스트림을 만든다
      const dstStream = gcsNewObject.createWriteStream();

      // Sharp 이미지 리사이즈 객체 생성
      const resizer = sharp().resize(size).png();

      // 현재파일에 pipe로 사이즈를 조절후
      // dstStream에 덮어쓴다
      srcStream.pipe(resizer).pipe(dstStream);

      // 최종적으로 결과물을 프로미스에 담아 저장한다.
      return new Promise((resolve, reject) => {
        dstStream
          .on("error", (err) => {
            console.log(`error : ${err}`);
            reject(err);
          })
          .on("finish", () => {
            console.log(`Success : ${file.name} -> ${thumbName}`);
          });
      });
    } else {
      // 들어온파일이 썸네일파일이라면 에러발생
      console.log("Error Error!");
      return;
    }
  });

  // 들어온 프로미스를 all을통해 병렬실행
  await Promise.all(uploadPromises);

  return;
};
