import React, { useState, useEffect } from 'react';

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Repositorio mega daora",
      url: "http://super-url.com",
      techs: [
        "React",
        "Scala",
        "Vue"
      ]
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index) => 
          <li key={index}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
