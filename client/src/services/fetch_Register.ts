export const registerFetch = async (name: string, email: string, password: string, passwordConfirmation: string) => {
	const query = `{ 
        "name": "${name}",
        "email": "${email}", 
        "password": "${password}",
        "passwordConfirmation": "${passwordConfirmation}"
     }`

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
            },
			credentials: 'include',
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