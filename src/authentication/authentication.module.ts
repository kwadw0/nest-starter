import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './jwt/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: User.name, schema: UserSchema
      }]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: process.env.JWT_CONSTANT,
          signOptions: { expiresIn: '120s' },
        }),
        inject: [ConfigService],
      }),
    
],
  controllers: [AuthenticationController],
  providers: [AuthService, LocalStrategy]
})
export class AuthenticationModule {}
