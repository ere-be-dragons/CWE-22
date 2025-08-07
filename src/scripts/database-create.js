import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {DatabaseSync} from 'node:sqlite';

const db = new DatabaseSync(resolve(process.cwd(), 'database.sqlite'));

db.exec(
  `
	CREATE TABLE IF NOT EXISTS users (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name TEXT,
	  pass TEXT
	);
  `,
);


for (const person of ['alice', 'bob', 'carol']) {
  db.prepare('INSERT INTO users (name, pass) VALUES (?, ?);')
    .run(
      person,
      createHash('md5')
        .update('ch4ng3m3!')
        .digest('hex'),
    );
  console.log(`created user ${person}`);
}
