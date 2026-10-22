export const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://sunfieldhomefortuna.azurewebsites.net/api";
export const authHeader = () => ({
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
});
