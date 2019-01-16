import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { cleanup, fireEvent, getNodeText, render, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';
import 'jest-styled-components';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

afterEach(() => {
  cleanup();
});

describe('Answers', () => {
  it('should mark answers as draggable', () => {
    const { getAllByTestId } = render(<App/>);
    const answer = getAllByTestId('answer');
    expect(answer.length).toBe(3);
    answer.forEach(a => {
      expect(a).toHaveAttribute('draggable');
    })
  });
  it('should not mark drop zones as draggable', () => {
    const { getAllByTestId } = render(<App/>);
    // const zones = getAllByTestId('droppable', { exact: false });
    const zones = getAllByTestId(/droppable/);
    expect(zones.length).toBe(3);
    zones.forEach(z => {
      expect(z.getAttribute('draggable')).toBeFalsy();
    });
  });
  it('should call setData on dataTransfer with correct text', () => {
    const { getByTestId } = render(<App />);
    const mockdt = { setData: jest.fn() };
    const answer = getByTestId('answer');
    expect(answer).toBeDefined();
    expect(getNodeText(answer)).toBe('brown');
    TestUtils.Simulate.dragStart(answer, { dataTransfer: mockdt });
    expect(mockdt.setData).toBeCalled();
    expect(mockdt.setData).toBeCalledWith('text/plain', 'brown');
  });

  it('should highlight dropzone on drag over', async () => {
    const { getByTestId } = render(<App/>);
    const dz = getByTestId('droppable1');
    expect(dz).toBeDefined();
    expect(getNodeText(dz)).toBe(' ');
    expect(dz).toHaveStyle('background-color: white');
    const mockEvent = {
      dataTransfer: { types: ['text/plain'] },
      preventDefault: jest.fn(),
    };
    fireEvent.dragOver(dz, mockEvent);
    expect(dz).toHaveStyle('background-color: yellow');
    // FIXME: doesn't get called?!
    // expect(mockEvent.preventDefault).toBeCalled();
  })

  it('should place answer in dropzone on drop', async () => {
    const { getByTestId } = render(<App/>);
    const dz = getByTestId('droppable1');
    expect(dz).toBeDefined();
    const mockEvent = { dataTransfer: { types: ['text/plain'] } };
    mockEvent.dataTransfer.getData = function() { return '\"brown\"'; };

    fireEvent.dragOver(dz, mockEvent);
    expect(dz).toHaveStyle('background-color: yellow');
    TestUtils.Simulate.drop(dz, mockEvent);
    expect(dz).toHaveStyle('background-color: white');
    expect(getNodeText(dz)).toBe('\"brown\"');
  });
});

describe('QuestionBox', () => {
  it('should start the game with the entered question when start is pressed', async () => {
    const { getByTestId, getByText, getAllByTestId, debug } = render(<App/>);
    const question = getByTestId('question-input');
    fireEvent.change(question, { target: { value: 'The <owl> and the <pussycat>' }});
    expect(question.value).toBe('The <owl> and the <pussycat>');
    fireEvent.click(getByText('Start'));
    await waitForElement(() => getByTestId('word'));
    const words = getAllByTestId('word');
    expect(words.length).toBe(3);
    const wordtext = words.map(w => getNodeText(w));
    expect(wordtext).toEqual(['The', 'and', 'the']);
    const answers = getAllByTestId('answer');
    expect(answers.length).toBe(2);
    const answertext = answers.map(w => getNodeText(w));
    expect(answertext).toEqual(['owl', 'pussycat']);
  });
});

