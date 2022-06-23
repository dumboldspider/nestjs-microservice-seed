import { Controller, Get } from '@nestjs/common';

@Controller('')
export class BaseController {
  // health check
  @Get('/status')
  status() {
    return {
      status: 'ok',
    };
  }
}
