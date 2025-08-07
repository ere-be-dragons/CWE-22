import chalk from 'chalk';
import express from 'express'
import handlebars from 'express-handlebars';
import {stat, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const app = express();

app.engine('html', handlebars.engine({
  extname: '.html',
}));
app.set('views', './src/views');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/download', (req, res) => {
  res.download(resolve(req.query.file), (error) => {
    if (error) {
      console.log(chalk.blue('[tries]\t'), '🟥 ', req.query.file);
      return res.status(404).render('404', {file: req.query.file});
    }

    if (req.query.file.endsWith('passwd') || req.query.file.endsWith('database.sqlite')) {
      console.log(chalk.blue('[tries]\t'), '🟢 ', req.query.file);
    } else {
      console.log(chalk.blue('[tries]\t'), '🔷 ', req.query.file);
    }
  });
});

app.listen(process.env.PORT ?? '5000', () => {
  console.log(chalk.blue('[start]\t'), `available on http://localhost:${process.env.PORT ?? 5000}`);
  console.log(chalk.blue('[tries]\t'), 'waiting for path traversal attempts...');
});
