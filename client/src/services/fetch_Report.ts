declare type locAdd = {
  lat: number
  lng: number
}
export const addReportFetch = async (type: string, userLocationText: string, agencyLocationText: string, userCoord: locAdd, agencyCoord: locAdd, distance: number, user : string) => {
	const query = { 
    type, 
    userLocationText,
    agencyLocationText,
    userCoord,
		agencyCoord,
		distance,
		user
   }

	return new Promise((resolve, reject) => {
		fetch('http://localhost:5000/report/add', {
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