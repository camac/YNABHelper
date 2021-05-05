import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
  
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter.counter);

  const incHandler = () => {
    console.log("inchandler");
    dispatch(counterActions.increment());
  }

  const decHandler = () => {
    console.log("dechandler");
    dispatch(counterActions.decrement());
  }


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={incHandler}>Incremento</button>
      <button onClick={decHandler}>Decremento</button>
    </main>
  );
};

export default Counter;
