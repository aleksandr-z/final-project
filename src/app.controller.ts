import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { encodePassword } from './utils/bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
