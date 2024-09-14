import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * controller uses the logic from the module service, when any request is recieved
 * we use dependency inject to avoid concerns related to who and where the service instance is managed.
 * its done like so...
 * 
 * @Controller()
    export class AuthController{
        constructor(private authService: AuthService)
    }

    the above code is same as doing something like...

    @Controller()
    export class AuthController{
        authService: AuthService
        constructor(authService: AuthService){
            this.authService = authService
        }
    }
    
    the common pattern is to define the function in the service and api endpoint function with same name
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService.test(); // calling a function from the auth service class
  }

  /**
   * @route /auth/signup
   */
  @Post('signup')
  signup() {
    return this.authService.signup;
  }

  /**
   * @route /auth/signin
   */
  @Post('signin')
  signin() {
    return this.authService.signin;
  }
}
