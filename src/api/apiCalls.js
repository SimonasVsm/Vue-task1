export async function deleteData(path, id) {
  try {
    const response = await fetch(`/api/${path}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw Error("Something went wrong!")
  } catch (error) {
    alert(error)
    return error.message
  }
}

export async function putData(path, body) {
  try {
    const response = await fetch(`api/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    if (!response.ok) throw Error("Something went wrong!")

    return await response.json()
  } catch (error) {
    alert(error)
    return error.message
  }
}

export function postData(path, body) {
  // TODO - implement error handling when add button added
  return fetch(`/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
}
