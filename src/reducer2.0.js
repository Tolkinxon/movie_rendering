const reducer20 = (state, action) => {
  switch (action.type) {
    case 'top':
      return {
        ...state,
        top: state.top + 5,
      }
    case 'bottom':
      return {
        ...state,
        bottom: state.bottom + 5,
      }
    case 'left':
        return {
            ...state,
            left: state.left + 5,
        }
    case 'right':
        return {
            ...state,
             right: state.right + 5,
        }

    default:
      return state
  }
}

export default reducer20
