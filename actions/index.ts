const api_url = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const response = await fetch(`${api_url}/users`);
  const data = await response.json();
  return data;
};
