import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsModule } from 'src/authors/authors.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    AuthorsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
