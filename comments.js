//Create web server
const express = require('express');
const app = express();
const port = 3000;

//Import functions from comments.js
const comments = require('./comments');

//Middleware
app.use(express.json());

//Get all comments
app.get('/comments', (req, res) => {
  res.json(comments.getComments());
});

//Get comment by id
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.getCommentById(id);

  if (!comment) {
    res.status(404).send('Comment not found');
  } else {
    res.json(comment);
  }
});

//Create a new comment
app.post('/comments', (req, res) => {
  const { author, text } = req.body;
  const newComment = comments.createComment(author, text);

  res.json(newComment);
});

//Update a comment
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;
  const updatedComment = comments.updateComment(id, author, text);

  if (!updatedComment) {
    res.status(404).send('Comment not found');
  } else {
    res.json(updatedComment);
  }
});

//Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedComment = comments.deleteComment(id);

  if (!deletedComment) {
    res.status(404).send('Comment not found');
  } else {
    res.json(deletedComment);
  }
});

//Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});