import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter(
        (todo) => todo.id !== action.payload
      );
    },
    setTodos: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  setTodos,
  setLoading,
} = todosSlice.actions;

export const carregarTarefas = () => async (dispatch) => {
  dispatch(setLoading(true));

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  dispatch(
    setTodos([
      {
        id: 1,
        title: 'Revisar Mobile-First',
        status: 'pendente',
      },
      {
        id: 2,
        title: 'Estudar Redux',
        status: 'pendente',
      },
    ])
  );

  dispatch(setLoading(false));
};

export default todosSlice.reducer;
