import { getSentence, getAnswers } from './TextConverter';

describe('text processing', () => {
  const test = "The <brown> fox";
  const test_sentence = [
    { id: 0, text: "The", type: "word" },
    { id: 1, text: "brown", type: "answer", placed: false, displayed: '' },
    { id: 2, text: "fox", type: "word" },
  ];
  const test2 = "The quick <brown> fox <jumped> over the <dog>";
  const test2_sentence = [
    { id: 0, text: "The", type: "word" },
    { id: 1, text: "quick", type: "word" },
    { id: 2, text: "brown", type: "answer", placed: false, displayed: '' },
    { id: 3, text: "fox", type: "word" },
    { id: 4, text: "jumped", type: "answer", placed: false, displayed: '' },
    { id: 5, text: "over", type: "word" },
    { id: 6, text: "the", type: "word" },
    { id: 7, text: "dog", type: "answer", placed: false, displayed: '' },
  ];
  it('should get sentence', () => {
    const s = getSentence(test);
    expect(s.length).toBe(3);
    expect(s).toEqual(test_sentence);
  });
  it('should get second sentence:', () => {
    const s = getSentence(test2);
    expect(s.length).toBe(8);
    expect(s).toEqual(test2_sentence);
  });
  it('should get answers', () => {
    const a = getAnswers(test);
    expect(a.length).toBe(1);
    expect(a).toEqual(['brown']);
  });
  it('should get second answers', () => {
    const a = getAnswers(test2);
    expect(a.length).toBe(3);
    expect(a).toEqual(['brown', 'jumped', 'dog']);
  });
  it('should return unique answer list', () => {
    const s = '<The> good, <the> bad and <the> ugly';
    expect(getAnswers(s)).toEqual(['The', 'the'])
  });
});
