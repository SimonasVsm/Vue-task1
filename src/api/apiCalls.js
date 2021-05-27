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

export async function postData(path, body) {
  try {
    const response = await fetch(`/api/${path}`, {
      method: "POST",
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

export async function getData(path) {
  try {
    const response = await fetch(path)

    if (!response.ok) throw Error("Something went wrong!")

    return response
  } catch (error) {
    alert(error)
    return error.message
  }
}
