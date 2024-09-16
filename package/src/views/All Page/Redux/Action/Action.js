import axios from "axios"
import { Delete, Get, Add, Update } from "../type"

let token = '0026c102a3f12109c7514188e7b4bc5e85dd8c828a8aa00beceb7983364a5219';

    let header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

export const Callapi = () => {
  return (dispatch) => {
    axios
      .get("https://gorest.co.in/public/v2/users", header)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: Get,
          ary: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const InsertToken = (obj) => {
  return (dispatch) => {
    axios
      .post("https://gorest.co.in/public/v2/users",obj, header)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: Add,
        })
        dispatch(Callapi())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const UpdateData = (obj) => {
  return (dispatch) => {
    axios
      .put(`https://gorest.co.in/public/v2/users/${obj.id}`,obj, header)
      .then((res) => {
        dispatch({
          type: Update
        })
        dispatch(Callapi())
      })
      .catch((err) => {
        console.log(err)
      })

  }
}
export const DeleteData = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://gorest.co.in/public/v2/users/${id}`, header)
      .then((res) => {
        dispatch({
          type: Delete,
        })
        dispatch(Callapi())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
