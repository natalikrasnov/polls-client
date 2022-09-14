
export const pollsInitialState = [];

const PollsReducer = (items, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return [...action.items];
    case "ADD_ITEM":
      return [...items, action.item];
    default:
      return [...items];
  }
};

export default PollsReducer;
