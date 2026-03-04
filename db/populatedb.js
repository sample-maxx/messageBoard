#! /usr/bin/env node
require('dotenv').config();
const pool = require('./pool');
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   sender VARCHAR ( 255 ) ,
   text VARCHAR ( 255 ) ,
   added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text,sender) 
VALUES
  ('Hi There!','Amando'),
  ('Hello World!','Charles')
`;

async function main() {
  try {
    await pool.query(SQL); 
    console.log("done");
  } catch (error) {
    console.error("Error seeding database:", error);
  }

}

main();
