import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  carregarTarefas,
  removeTodo,
} from './todosSlice.js';

export default function TodoList() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { list, loading } = useSelector(
    (state) => state.todos
  );

  function handleAddTodo() {
    const title = input.trim();
    if (!title) return;

    dispatch(
      addTodo({
        id: Date.now(),
        title,
        status: 'pendente',
      })
    );

    setInput('');
  }

  return (
    <main>
      <h1>Lista de Tarefas</h1>

      <input
        value={input}
        onChange={(event) =>
          setInput(event.target.value)
        }
        placeholder="Digite uma tarefa"
      />

      <button onClick={handleAddTodo}>
        Adicionar
      </button>

      <button
        onClick={() => dispatch(carregarTarefas())}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Carregar tarefas'}
      </button>

      {list.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.status}
              <button
                onClick={() =>
                  dispatch(removeTodo(todo.id))
                }
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
