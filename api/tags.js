const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db')

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); 
});

const { getAllTags } = require('../db');

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const postByTagName = await getPostsByTagName(tagName);
    res.send({ post: postByTagName })

  } catch ({ name, message }) {
    next({ name, message });

  }
});

module.exports = tagsRouter;