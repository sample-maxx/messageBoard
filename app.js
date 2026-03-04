const express = require("express");
const app = express();
const path = require("node:path");
const userRouter = require("./routes/userRouter");
const pool = require('./db/pool');
require('./db/populatedb.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

app.get("/",async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY added DESC");
    const messages = result.rows;
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});
app.get("/new", (req, res) => {
  res.render("form");
});
app.post("/new",async (req, res) => {
  const { text,sender } = req.body;
  
  try {
    await pool.query("INSERT INTO messages (text,sender) VALUES ($1, $2)", [text,sender]);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ message: "Error posting message" });
  }
});
app.get('/delete', async (req, res) => {
  try {
    // SQL query to delete all rows in the users table
    await pool.query('DELETE FROM messages');
    
    res.json({ message: 'All messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).json({ message: 'Error deleting messages' });
  }
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
