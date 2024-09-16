import { Injectable } from '@nestjs/common';

// Injectable decorator for dependency injection procided by nestjs
@Injectable({})
export class UserService {
  constructor() {}

  async findOne(userId: string): Promise<any> {}
}
