export const updateSettingsFetch = async (apiKey: string, distance: number, radius: number, holdTime: number) => {
	const query = { 
    apiKey,
		distance,
    radius,
    holdTime
   }

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/settings', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(query),
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

export const SettingsFetch = async () => {

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/settings', {
			method: 'GET',
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