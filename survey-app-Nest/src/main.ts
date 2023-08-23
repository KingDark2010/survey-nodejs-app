import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import { sqlConnection } from './App/Utils/sql_db';

async function bootstrap() {
  dotenv.config({ path: join(__dirname, '../../.env') });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(__dirname, process.env.views_path || '../public/Views');
  app.useStaticAssets(join(__dirname, '../../public'));
  app.setBaseViewsDir(join(viewsPath, 'Layouts'));
  //add hbs partials
  hbs.registerPartials(join(viewsPath, `Partials`));
  app.setViewEngine('hbs');

  sqlConnection.query(
    `SELECT * FROM Survey_App.Users
                        ORDER BY id ASC `,
    (err, res) => {
      console.log(err, res.rows);
      sqlConnection.end();
    }
  );
  await app.listen(Number(process.env.PORT));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
