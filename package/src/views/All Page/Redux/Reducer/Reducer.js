import {Delete, Get, Add, Update} from "../type"

const initial = {
  tokenData: [],
}
export const Reducer = (state = initial, action) => {
  switch (action?.type) {
    case Get:
      return {tokenData: action.ary}
    case Add:
      return {tokenData: action.ary}
    case Update:
      return {tokenData : action.ary}
    case Delete:
      return {tokenData: action.ary}
    default:
      return state
  }
}
