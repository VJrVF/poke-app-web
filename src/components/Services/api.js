export const API_URL = "http://localhost:3001";

const _get = async (url) => {
  return await fetch(url);
};

const _post = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const _delete = async (url, id) => {
  await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: { "Content-Type": "application/json" },
  });
};

export const pokemonApi = {
  get: _get,
  post: _post,
  delete: _delete,
};
