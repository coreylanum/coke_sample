import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import pkg from 'stardog'

const { Connection, query } = pkg;
const stardogURL = 'https://pwc.stardog.cloud:5820';
const stardogUser = 'metaphactory';
const stardogPassword = '53gn0%szh4lOT1$';

async function getStardogData() {
    const conn = new Connection({
    username: stardogUser,
    password: stardogPassword,
    endpoint: stardogURL,
  });
  const res = await query
      .execute(
        conn,
        'TCCC_WriteOff_Final_20251119',
        `select distinct ?s ?p ?o where { GRAPH <urn:Write_Off:oba_database> {?s ?p ?o }} LIMIT 10`,
        'application/sparql-results+json',
      {
        
        reasoning: false,
        offset: 0,
      }
  ).then(({ body }) => body.results.bindings); 

  return res;
}



function App() {
  const [data, setData] = useState([])
   
   
  useEffect(() => {
    const fetchData = async () => {
      const bindings = await getStardogData();
      setData(bindings);
    };

    fetchData();
  }, []);
  let tableData = '';
  if (data) {
    tableData = data.map((item) => (
      <tr key={item.s.value + item.p.value + item.o.value}>
        <td>{item.s.value}</td>
        <td>{item.p.value}</td>
        <td>{item.o.value}</td>
      </tr>
    ));
  }
  return (
    <>
      <table className="data-table">
        <tbody>{tableData}</tbody>
      </table>

    </>
  )
}

export default App
