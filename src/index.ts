import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import hbs from 'hbs';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 3000;
const viewsPath = process.env.views_path || "App/Views"
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '../public')))
app.use('/bootstrap',express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))


//use hbs template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, viewsPath, 'Layouts'));

//add hbs partials
hbs.registerPartials(path.join(__dirname, viewsPath, `Partials`));


// add routing for / path
app.get('/login',  (req: Request, res: Response) => {
  res.render('login')
});
app.get('/', (req: Request, res: Response) => {
  res.render('home')
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
