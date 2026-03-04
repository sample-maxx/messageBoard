const db = require("../db/queries");

async function getSendernames(req, res) {
  const searchQuery = req.query.search || '';
  const messages = await db.getAllSendernames(searchQuery);
  console.log("Sendernames: ", messages);
  res.render('index', { title: 'Mini MessageBoard', messages });
}

async function createSendernameGet(req, res) {
  res.render('form.ejs', { errors: [] });
}

async function createSendernamePost(req, res) {
  let { text,sender} = req.body;
  const sanitizeHtml = require('sanitize-html');
   // Sanitize the inputs to prevent XSS attacks
  text = sanitizeHtml(text);
  sender = sanitizeHtml(sender);
  const errors = [];
  
  // Check if the sender is empty or too short
  if (!sender || sender.trim().length === 0) {
    errors.push("Sender name is required and cannot be empty.");
  }

  // Check if the text message is empty or too short/long
  if (!text || text.trim().length === 0) {
    errors.push("Message cannot be empty.");
  } else if (text.trim().length > 255) {
    errors.push("Message cannot be longer than 255 characters.");
  }

  // If there are errors, return to the form with the error messages
  if (errors.length > 0) {
    res.render('form.ejs', { errors });
    return;
  }

  // Proceed with inserting into the database if no errors
  try {
    await db.insertSendername(text, sender);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ message: "Error posting message" });
  }
}

async function deleteAllSendernames(req, res) {
  await db.deleteAllSendernames();  // Assuming this function exists in your db queries
  res.send('All Senders deleted successfully' );
}

module.exports = {
  getSendernames,
  createSendernameGet,
  createSendernamePost,
  deleteAllSendernames
};
