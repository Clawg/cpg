//import EntrantForm from '../components/forms/entrant-form.js'
import clone from 'ramda/src/clone'

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'
export const ADD_GUESS = 'counter/ADD_GUESS'
export const TOGGLE_ENTRY_ENABLED = 'counter/TOGGLE_ENTRY_ENABLED'
export const SET_TOTAL = 'counter/SET_TOTAL'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  entrants: [{
      name: 'Chalrie',
      guess: '1098.78'
  }],
  //buttonState: false,
  wagerTotal: 0,
  entryEnabled: false
}

export default (state = initialState, action) => {

  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }


    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }


    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }


    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }


    case ADD_GUESS:
        let newState = clone(state)
        newState.entrants.push(action.details)
        return newState


    // case TOGGLE_STATE:
    //     let newToggleState = clone(state)
    //     let toggleState = action === true ? false : true
    //     newToggleState.buttonState = toggleState
    //     return newToggleState

    case TOGGLE_ENTRY_ENABLED:
        let newToggleEntryEnabled = clone(state)
        let entryState = action === true ? false : true
        newToggleEntryEnabled.entryEnabled = entryState
        return newToggleEntryEnabled


    case SET_TOTAL:
        let newTotalState = clone(state)
        newTotalState.wagerTotal = action.wagerTotal
        console.log(newTotalState)
        return newTotalState

    default:
      return state
  }
}

// Actions
export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}

export const addGuess = (details) => {
  return dispatch => {
    dispatch({
      type: ADD_GUESS,
      details
    })
  }
}

export const toggleEntryEnabled = (entryState) => {
//console.log('HI')
//console.log(entryState)
  return dispatch => {
    dispatch({
      type: TOGGLE_ENTRY_ENABLED,
      toggleState: entryState
    })
  }
}

// export const toggleButtonState = (buttonState) => {
//   return dispatch => {
//     dispatch({
//       type: TOGGLE_STATE,
//       toggleState: buttonState
//     })
//   }
// }

export const calcTotal = (total) => {
    return dispatch => {
      dispatch({
        type: SET_TOTAL,
        wagerTotal: total
      })
    }
}
