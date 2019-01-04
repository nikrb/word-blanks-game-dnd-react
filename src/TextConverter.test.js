import { getSentence, getAnswers } from './TextConverter';

describe('text processing', () => {
  const test = "The <brown> fox";
  const test_sentence = [
    { text: "The", type: "word" },
    { text: "brown", type: "answer", placed: false },
    { text: "fox", type: "word" },
  ];
  const test2 = "The quick <brown> fox <jumped> over the <dog>";
  const test2_sentence = [
    { text: "The", type: "word" },
    { text: "quick", type: "word" },
    { text: "brown", type: "answer", placed: false },
    { text: "fox", type: "word" },
    { text: "jumped", type: "answer", placed: false },
    { text: "over", type: "word" },
    { text: "the", type: "word" },
    { text: "dog", type: "answer", placed: false },
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
});
