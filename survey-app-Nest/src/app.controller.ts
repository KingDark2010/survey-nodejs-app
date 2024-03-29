import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/survey-list')
  @Render('survey-list')
  surveyList() {
    return;
  }
}
