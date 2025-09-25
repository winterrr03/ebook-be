import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/type';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserEntity | null => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    return request.user ?? null;
  },
);
