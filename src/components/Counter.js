import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

function Counter() {
  const [count, setCount] = useState(0);
	const [click, setClick] = useState(0);
  const [checked, setChecked] = useState(false);
  const initialTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = checked 
      ? `Count: ${count} ; #Clicks:${click}` 
      : initialTitleRef.current;
  }, [checked, count, click]);

  return (
    <div>
			<h2> Counter </h2>
      <span data-testid="count">Count {count}</span>
      <br />
      <Button onClick={() => {setCount(count + 1); setClick(click + 1) }} text="Increment" />
			<Button onClick={() => {setCount(count - 1); setClick(click + 1) }} text="Decrement" />
			<br/>
			<br/>
			<span data-testid="click">Total {click} Click{click === 1 ? "" : "s"}</span>
      <br />
      <div>
        <input 
          type="checkbox" 
          id="checkbox-title" 
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <label htmlFor="checkbox-title">Check to display count in document title</label>
      </div>
    </div>
  );
}

export default Counter;