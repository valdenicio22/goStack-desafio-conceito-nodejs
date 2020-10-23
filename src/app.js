const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1){
    return response.status(400).json({ Error: 'Repository does not exist.' });
  }
  
  const repositoryUpdated = {
    id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = repositoryUpdated;

  return response.json(repositoryUpdated);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    repositories.slice(repositoryIndex, 1);
  }else {
    return response.status(400).json({ Error: 'Repository does not exist'});
  }
  
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
