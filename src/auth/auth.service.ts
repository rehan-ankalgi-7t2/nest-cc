import { Injectable } from '@nestjs/common';

// Injectable decorator for dependency injection procided by nestjs
@Injectable({})
export class AuthService {
  test() {}

  signin() {}

  signup() {}
}
