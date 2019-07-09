export function fetchJSON(url, params, target) {
	const data = {
		'method': 'POST',
		'Content-Type': 'application/json',
		'body': JSON.stringify(params)
	};
	if (target) {
		url = `${target}${url}`;
	} else {
		url = `${url}`;
	}
	return fetch(url, data);
}
export function getData(url) {
	return fetch(url, {
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		method: 'GET'
	})
		.then(response => {
			if(response.status !== 200) {
				console.log('Error:'+ response.status);
			}
			return response.json();
		});
}
export const postData = (url, data) => {
	return fetch(url, {
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		method: 'POST',
		body: JSON.stringify(data)
	})
		.then(response => {
			if(response.status !== 200) {
				console.log('Error:'+ response.status);
			}
			return response.json();
		})
		.catch((err) => {
			console.log('Fetch Error:', err);
		});
};
export const updateData = (url, data) => query => {
	return fetch(url, {
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		method: 'PUT',
		body: query
	})
		.then(response => {
			if(response.status !== 200) {
				console.log('Error:'+ response.status);
			}
			return response.json();
		})
		.catch((err) => {
			console.log('Fetch Error:', err);
		});
};