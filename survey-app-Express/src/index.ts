import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import hbs from 'hbs';
import { join } from 'path';
dotenv.config({path: join(__dirname, "../../.env")});

const PORT = process.env.PORT || 3000;
const viewsPath = join(__dirname, process.env.views_path || "../public/Views")
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));
app.use(express.static(join(__dirname, '../../public')))

//use hbs template engine
app.set("view engine", "hbs");
app.set("views", join(viewsPath, 'Layouts'));

//add hbs partials
hbs.registerPartials(join(viewsPath, `Partials`));

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
