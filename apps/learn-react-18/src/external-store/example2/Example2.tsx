import { useCounterState } from "./clickStore";

export default function Example2() {
  return <>
    <h4>External Store-1</h4>
    <Component1/>
    <Component2/>
    <Component3/>
    </>
}


const Component1 = () => {
  const [count, setCount] = useCounterState();
  console.log("==================Component1")
  return <>
   <div className="">Counter: {count.count}</div>
    <div className="">
        <button onClick={()=>setCount({count:count.count-1})}>Decrease</button>
        <button onClick={()=>setCount({count:count.count+1})}>Increase</button>
    </div>
  </>
}

const Component2 = () => {
  const [count, setCount] = useCounterState();
  console.log("==================Component2")
  return <>
  <div className="">Counter: {count.count}</div>
    <div className="">
        <button onClick={()=>setCount({count:count.count-1})}>Decrease</button>
        <button onClick={()=>setCount({count:count.count+1})}>Increase</button>
    </div>
  </>
}

const Component3 = () => {
  console.log("==================Component3")
  return <>
    <div className="">Hello</div>
  </>
}