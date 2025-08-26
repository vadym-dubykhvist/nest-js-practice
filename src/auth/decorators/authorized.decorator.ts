import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'generated/prisma';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;

    const user = request.user as User;

    return data && user ? user[data] : user;
  },
);
