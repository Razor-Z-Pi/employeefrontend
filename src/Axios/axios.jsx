import axios from "axios";

// export default axios.create({
//   baseURL: "",
//   responseType: "json"
// });

export const postInfo = () => {
  return async (dispatch) => {
    const query = axios.post("https://127.0.0.1:8000");
  }
}