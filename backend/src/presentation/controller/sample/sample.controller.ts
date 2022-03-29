import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
