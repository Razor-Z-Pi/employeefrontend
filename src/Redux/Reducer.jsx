const InittialState = {
  filterProject: [],
}

export default function Reducer(state = InittialState, action) {

  switch (action.type) {
    case "AddFilter":
      return {
        ...state,
        filterProject: action.filterP
      };
      break;
    default:
      break;
  }

  return state;
}