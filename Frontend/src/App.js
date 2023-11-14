import axios from 'axios';
import './App.css';
import Header from './component/Header';
import { useEffect, useState } from 'react';


function App() {

  const [list, setList] = useState([]);
  const [task, setTask] = useState('');


  //Printing all the todos
  const showTodos = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/show/showtodos');
      setList(data);
    } catch (error) {
      console.log(error);
    }
  }

  //Getting all the todos into the list
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/create/list', { task },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (response.status === 200) {
        setTask('');
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Deleting a todo from the list
  const deleteTodo = async (id) => {
    try {
      const todoDelete = await axios.delete(`http://localhost:8000/api/delete/todo/${id}`);
      if (todoDelete.status === 200) {
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    showTodos();
  }, [])


  return (
    <>
      <Header></Header>
      <div className='container b'>
        <form onSubmit={addTodo}>
          <div className="input-group mb-3">
            <button
              className='b'
              type="button"
              id="button-addon2"
              style={{fontFamily:"cursive", background:"white"}}
              disabled>
              Enter the task:
            </button>
            <input
              type="text"
              className="form-control"
              style={{fontFamily:"cursive"}}
              placeholder="Get Groceries"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button className="btn btn-success" type="submit" style={{fontFamily:"cursive"}}><i className="fa-solid fa-plus"></i> 
              Add Task 
            </button>
          </div>
        </form>
      </div>

      <table className='container table' style={{fontFamily:"cursive"}}>
        <thead>
          <tr>
            <th colSpan={2}>To-Dos</th>
          </tr>
        </thead>


        <tbody>
          {
            list && list.map(d => (
              <tr key={d.id}>
                <td>{d.task}</td>
                <td>
                  <button onClick={() => deleteTodo(d.id)} class="btn btn-light" type="button" id="button-addon2">     
                  <i style={{ color: 'red' }} class="fa-solid fa-trash-can"></i>   
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
