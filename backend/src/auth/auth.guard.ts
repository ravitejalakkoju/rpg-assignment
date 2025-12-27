import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext<{
      req?: { headers?: Record<string, string> };
      connectionParams?: Record<string, unknown>;
      authHeader?: string;
      author?: { sub: string; email: string };
    }>();

    const authHeader =
      gqlContext?.authHeader ??
      gqlContext?.req?.headers?.authorization ??
      (typeof gqlContext?.connectionParams?.authorization === 'string'
        ? String(gqlContext.connectionParams.authorization)
        : undefined);

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header.');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization header.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      gqlContext.author = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
