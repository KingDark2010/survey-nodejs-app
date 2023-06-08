import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/survay-list')
  @Render('survay-list')
  surveyList() {
    return ;
  }
}
