import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, } from './dto/signup.dto';
import { User } from 'src/users/entities/user.entity';
import { hashPassword, isMatched } from 'src/utils/hashing';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const {
        password,
        email
      } = signUpDto;
      const exiatingUser = await this.userModel.findOne({email});
      if (exiatingUser) {
        throw new UnauthorizedException('User already exists');
      }
      const hashedPass = await hashPassword(password);

      const user = await this.userModel.create({
        ...signUpDto,
        password: hashedPass,
        createdAt: Date.now()
      });

      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedException) {
        throw error;
        
      }
      throw new InternalServerErrorException();
    }

  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && user.password) {
        const isPasswordValid = await isMatched(password, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user._doc.email, sub: user._doc._id };
    console.log('payload', payload);
    return {
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}