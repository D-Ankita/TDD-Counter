import React from 'react';
import Counter from './Counter';
import { render, fireEvent, cleanup } from '@testing-library/react';
describe("workflow sidebar",()=>{
  beforeEach(()=>{
    render(
      <WorkflowSideBar />
    )
  });
	afterEach(cleanup);
});


test('count starts with 0', () => {
  const { getByTestId } = render(<Counter />)
  expect(getByTestId("count").textContent).toBe("Count 0");
});

test('click starts with 0', () => {
  const { getByTestId } = render(<Counter />)
  expect(getByTestId("click").textContent).toBe("Total 0 Clicks");
});

test('clicking on button increments counter and clickcount correctly', () => {
  const { getByText, getByTestId } = render(<Counter />)
  fireEvent.click(getByText("Increment"));
  expect(getByTestId("count").textContent).toBe("Count 1");
  expect(getByTestId("click").textContent).toBe("Total 1 Click");

  fireEvent.click(getByText("Increment"));
	expect(getByTestId("count").textContent).toBe("Count 2");
  expect(getByTestId("click").textContent).toBe("Total 2 Clicks");
});

test('clicking on increment button followed by decrement button, shows correct counter and clickcount values', () => {
  const { getByText, getByTestId } = render(<Counter />)
  fireEvent.click(getByText("Increment"));
  expect(getByTestId("count").textContent).toBe("Count 1");
  expect(getByTestId("click").textContent).toBe("Total 1 Click");

  fireEvent.click(getByText("Decrement"));
	expect(getByTestId("count").textContent).toBe("Count 0");
  expect(getByTestId("click").textContent).toBe("Total 2 Clicks");
});


test('window title changes after every click if checkbox is checked', () => {
  global.window.document.title = "React App";
  const { getByText, getByLabelText } = render(<Counter />);
  
  // When checkbox is unchecked, incrementing has no effect
  fireEvent.click(getByText("Increment"));
  expect(global.window.document.title).toBe("React App");

  // Check and assert the document title changes
  const checkbox = getByLabelText("Check to display count in document title");
  fireEvent.click(checkbox);
  expect(global.window.document.title).toBe("Count: 1 ; #Clicks:1");

	// Works if you decrement.
  fireEvent.click(getByText("Decrement"));
  expect(global.window.document.title).toBe("Count: 0 ; #Clicks:2");

  // Unchecking will return to the original document title
  fireEvent.click(checkbox);
  expect(global.window.document.title).toBe("React App");
});