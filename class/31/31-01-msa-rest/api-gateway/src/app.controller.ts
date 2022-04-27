import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Get('/auth/login')
  login() {
    return this.clientAuthService.send({ cmd: 'aaa' }, {});
  }

  @Get('/boards')
  fetchBoard() {
    return this.clientResourceService.send({ cmd: 'bbb' }, {});
  }
}
