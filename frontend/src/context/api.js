export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const authHeader = () => ({
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
});