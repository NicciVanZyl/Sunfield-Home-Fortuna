export const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://sunfieldhomefortuna-h4grgbgdhzg4fwbu.southafricanorth-01.azurewebsites.net/api";
export const authHeader = () => ({
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
});
