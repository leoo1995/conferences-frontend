// const baseUrl = process.env.REACT_APP_API_URL
const baseUrl = "https://conferences-backend.herokuapp.com/api"
// const baseUrl = "http://localhost:4000/api"
export const fetchTokenLess = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`
  console.log("fetch:", {
    method,
    headers: {
      "Content-type": "aplication/json",
    },
    body: JSON.stringify(data),
  })
  if (method === "GET") {
    return fetch(url)
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    })
  }
}
export const fetchToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`
  const token = localStorage.getItem("token") || ""
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-api-key": token,
      },
    })
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "Application/json",
        "x-api-key": token,
      },
      body: JSON.stringify(data),
    })
  }
}
