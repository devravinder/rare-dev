import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react';
import { useLocalStorage } from './useBrowserStorage';
export const queryClient = new QueryClient();
export default function App() {
  return <QueryClientProvider client={queryClient}>
    <div className="">Hello</div>
    <Todos />
    <hr />
    <Name />
    <hr />
    <Name />
  </QueryClientProvider>
}


const Todos = () => {
  const [todos, setTodos] = useLocalStorage("todos", [] as string[])
  const [value, setValue] = useState('')
  return (
    <div>
      <h1>Todos</h1>

      {
        todos.map((todo, index) => <div key={index}>{todo}</div>)
      }
      <hr />
      Add todo: <input type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTodos([...todos, value])
            setValue('')
          }
        }} />
    </div>
  )
}


const Name = () => {
  const [name, setName] = useLocalStorage<string | undefined>("name")
  const [value, setValue] = useState('')

  return <div >
    <h3>Name: {name}</h3>
    <input
      type="text" value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setName(e.currentTarget.value)
          setValue('')
        }
      }}
    />
    <button onClick={() => setName(undefined)}>Clear</button>
  </div>

}

