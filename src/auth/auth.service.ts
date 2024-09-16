import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

// Injectable decorator for dependency injection procided by nestjs
@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      // Remove sensitive information like password
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin() {}

  async verifyToken() {}

  decodeToken() {}
}
