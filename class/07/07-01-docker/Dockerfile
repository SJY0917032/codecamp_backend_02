#  node 14버전 linux
FROM node:14

#  myfolder로 현재폴더 이동
WORKDIR /myfolder/
# 도커파일내에 지정한 파일을 복사.
COPY ./index.js /myfolder/

#  여러번 입력가능 (RUN) 
# RUN node index.js

#  한번만 입력가능 (CMD) 보통 마지막에 입력
CMD node index.js