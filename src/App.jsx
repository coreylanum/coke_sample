import { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import pkg from 'stardog'

const { Connection, query } = pkg;
const stardogURL = '***https://REPLACE_WITH_YOUR.stardog.cloud:5820';
const stardogUser = '***REPLACE_WITH_YOURS';
const stardogPassword = '***REPLACE_WITH_YOURS';

async function getStardogData() {
    const conn = new Connection({
    username: stardogUser,
    password: stardogPassword,
    endpoint: stardogURL,
  });
  let res;
  res = await query
      .execute(
        conn,
        '***DB_NAME',
        `PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX owl:  <http://www.w3.org/2002/07/owl#>

         SELECT ?g ?s ?p ?o
         WHERE {
          GRAPH ?g {
            ?s ?p ?o .
          }
      }}
      LIMIT 100
`,
        'application/sparql-results+json',
      {
        
        reasoning: false,
        offset: 0,
      }
  ).then(({res}) => res.body.bindings);
    return res;
}



function App() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
  // Fetch data from Stardog only on component mount
  getStardogData().then(data => {
    console.log(data);
  });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
