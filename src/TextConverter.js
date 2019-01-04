
export const getSentence = text => {
  return text.split(' ').map((w, id) => {
    if (w.startsWith('<')) {
      const m = w.match(/[a-z-A-Z]+/);
      return { id, text: m[0], type: 'answer', placed: false, displayed: ''};
    }
    return { id, text: w, type: 'word' };
  });
};
export const getAnswers = text => {
   const word_list = Array.from( new Set(text.split(' ')));
   return word_list.reduce((acc, cur) => {
    if (cur.startsWith('<')) {
      const m = cur.match(/[a-z-A-Z]+/);
      return acc.concat(m[0]);
    }
    return acc;
  }, []);
};
