import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { cleanup, fireEvent, getNodeText, render } from 'react-testing-library';
import 'jest-styled-components';

import AnswerBox from './AnswerBox';

afterEach(() => cleanup());

it('should mark answers as draggable', () => {
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const answer = getByTestId('answer');
  expect(answer.textContent).toBe('brown');
});

it('should start drag', () => {
  // var container = TestUtils.renderIntoDocument(<AnswerBox answers={['brown']} />);
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const mockdt = { setData: jest.fn() };
  const answer = getByTestId('answer');
  expect(answer).toBeDefined();
  expect(getNodeText(answer)).toBe('brown');
  TestUtils.Simulate.dragStart(answer, { dataTransfer: mockdt });
  expect(mockdt.setData).toBeCalled();
  expect(mockdt.setData).toBeCalledWith('text/plain', 'brown');
});

