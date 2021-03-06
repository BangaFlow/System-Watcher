export const loginFetch = async (email: string, password: string) => {
	const query = `{ "email": "${email}", "password": "${password}" }`

	return new Promise((resolve, reject) => {
		fetch('/login', {
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
		fetch('/logout', {
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

export const stayActiveFetch = async () => {

	return new Promise((resolve, reject) => {
		fetch('/stayActive', {
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
		fetch('/password/email', {
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

export const changeFetch = async (id: string, token: string, password: string, passwordConfirmation: string) => {
	const query = `{ "password": "${password}", "passwordConfirmation": "${passwordConfirmation}" }`

	return new Promise((resolve, reject) => {
		fetch(`/password/reset?id=${id}&token=${token}`, {
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

export const resendFetch = async (email: string) => {
	const query = `{ "email": "${email}" }`

	return new Promise((resolve, reject) => {
		fetch('/email/resend', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: query
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

export const verifyFetch = async (id: string, token: string, expires: string, signature: string) => {

	return new Promise((resolve, reject) => {
		fetch(`/email/verify?id=${id}&token=${token}&expires=${expires}&signature=${signature}`, {
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