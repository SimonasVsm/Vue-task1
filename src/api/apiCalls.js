export function deleteData(path, id) {
	return fetch(`/api/${path}/${id}`, {
		method: 'DELETE',
	})
}

export function putData(path, body) {
	return fetch(`api/${path}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	})
}

export function postData(path, body) {
	return fetch(`/api/${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	})
}
