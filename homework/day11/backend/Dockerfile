#  node 14버전 linux
FROM node:14

#  myfolder로 현재폴더 이동
WORKDIR /myfolder/

# yarn isntall을 하기위해 package.json을 옮겨서 패키지들을 넣는다.
# 또한 yarn.lock도 옮겨준다. (종속성을 지키려면 항상 같이 따라가야한다.)
# 이런식으로 하면 도커 이미지를 새로 빌드해도 cached된 데이터를 계속 사용이 가능하다.
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/

#  여러번 입력가능 (RUN) 
RUN yarn install


# 도커파일내에 지정한 파일을 복사.
COPY . /myfolder/
#  한번만 입력가능 (CMD) 보통 마지막에 입력
CMD yarn dev