import { Module } from '@nestjs/common';
import { envSchema } from './env';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
  ],
})
export class AppModule {}
