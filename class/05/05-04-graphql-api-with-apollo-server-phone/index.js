import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, createToken, sendTokenToPhone } from "./phone.js";

// The GraphQL schema
const myTypeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    content: String
  }

  # 받아오는 타입은 input으로 가져와야한다.
  input createBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => Object
    fetchBoards: [BoardReturn] # Array in Object
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    createBoard2(createBoardInput: createBoardInput): String
    createTokenOfPhone(myphone: String): String
  }
`;

// A map of functions which return data for the schema.
// api -> resolvers
const myResolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
        { number: 1, writer: "철수", title: "this title!", content: "this content?!" },
        { number: 2, writer: "철철", title: "this this!", content: "content content?!" },
        { number: 3, writer: "수수", title: "title title!", content: "this this?!" },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 안쓰는 elements는 _로 처리한다.
      // parent => api to api (api의 데이터는 parent로 들어간다.)
      // args => front to api (args.name, args.title ....)
      // context => req,res의 정보를 담는다
      // info => api의정보를 받는다.
      console.log(args);

      return "등록됨..";
    },
    createBoard2: (_, args) => {
      console.log(args);

      return "등록됨..";
    },
    createTokenOfPhone: (_, args) => {
      // 1. 휴대폰번호 유효성 검증
      const isValid = checkValidationPhone(args.myphone);
      if (isValid) {
        // 2. 휴대폰 토큰 6자리 만들기.
        const token = createToken();
        // 3. 휴대폰에 토큰 전송.
        sendTokenToPhone(args.myphone, token);
        return "인증완료.";
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
