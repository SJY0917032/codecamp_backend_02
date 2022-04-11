import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const email = ctx.getContext().req.user.email;
    const id = ctx.getContext().req.user.id;
    return `${email}의 아이디는 ${id}입니다.`;
  },
);
