import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma/prisma.service';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const authenticateBodySchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema);
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/auth')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateBodySchema) {
    const { username, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials are invalid.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('User credentials are invalid.');
    }

    const accessToken = this.jwt.sign({ sub: user.id, role: user.role });

    return {
      access_token: accessToken,
    };
  }
}
