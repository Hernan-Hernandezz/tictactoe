const getStorage = (key) => window.localStorage.getItem(key);
const removeStorage = (key) => window.localStorage.removeItem(key);
const setStorage = (key, value) => window.localStorage.setItem(key, value);
const getGameStorage = () => {
  const board = getStorage("board");
  const turn = getStorage("turn");
  const gameCount = getStorage("gameCount");
  return (board != undefined) & (turn != undefined) & (gameCount != undefined)
    ? true
    : false;
};

const setGameStorage = (board, turn, gameCount) => {
  setStorage("board", JSON.stringify(board));
  setStorage("turn", turn);
  setStorage("gameCount", JSON.stringify(gameCount));
};

const removeGameStorage = () => {
  removeStorage("board");
  removeStorage("turn");
  removeStorage("gameCount");
};
export {getGameStorage, setGameStorage, removeGameStorage};
