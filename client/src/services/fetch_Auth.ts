export const loginFetch = async (email: string, password: string) => {
	const query = `{ "email": "${email}", "password": "${password}" }`

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: query,
		})
		  .then(resp => {
			if (!resp.ok) {
			  resp.text().then(text => reject(text))
			}
			else {
			  resolve(resp.json());
			}
		  })
		  .catch(error => { reject(error) })
	  })
}

export const logOutFetch = async () => {

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/logout', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		  .then(resp => {
			if (!resp.ok) {
			  resp.text().then(text => reject(text))
			}
			else {
			  resolve(resp.json());
			}
		  })
		  .catch(error => { reject(error) })
	  })
}

export const forgetFetch = async (email: string) => {
	const query = `{ "email": "${email}" }`

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/password/email', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: query,
		})
		  .then(resp => {
			if (!resp.ok) {
			  resp.text().then(text => reject(text))
			}
			else {
			  resolve(resp.json());
			}
		  })
		  .catch(error => { reject(error) })
	  })
}