export const updateSettingsFetch = async (id: string, apiKey: string, distance: number, radius: number, holdTime: number) => {
	const query = { 
		id,
    apiKey,
		distance,
    radius,
    holdTime
   }

	return new Promise((resolve, reject) => {
		fetch('/settings', {
			method: 'PUT',
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
		fetch('/settings', {
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