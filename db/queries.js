const pool = require("./pool");

async function getAllSendernames(searchQuery = "") {
  if(searchQuery==""){
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
  }else{
   const result = await pool.query(
    "SELECT sender FROM messages WHERE sender ILIKE $1", 
    [`%${searchQuery}%`]  // % is a wildcard for the LIKE operator
  );
  return result.rows;
}
}

async function insertSendername(text,sender) {
  await pool.query("INSERT INTO messages (text,sender) VALUES ($1,$2)", [text,sender]);
}
async function deleteAllSendernames(){
  await pool.query("DELETE FROM messages")
}
module.exports = {
  getAllSendernames,
  insertSendername,
  deleteAllSendernames,
};
