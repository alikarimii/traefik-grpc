import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  AuthServiceController,
  LoginRequest,
  LoginResponse,
} from './proto/nest.pb';

@Controller()
export class AppGrpcController implements AuthServiceController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(request: LoginRequest): Promise<LoginResponse> {
    if (request.password == '1234') {
      return {
        access_token: 'exlkldfjldk',
        refresh_token: 'kdfglfd',
        roles: ['guest'],
        exp: new Date().getTime(),
      };
    }
    return null;
  }
}
