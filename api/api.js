const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ca6c2b070emsh0583caa35ceee88p16e3ccjsn89eb2b9e42d5',
		'X-RapidAPI-Host': 'astronomy-picture-of-the-day.p.rapidapi.com'
	}
};

fetch('https://astronomy-picture-of-the-day.p.rapidapi.com/apod?api_key=nWYhQQdmCKwd0cVvrfyge124OrW4fnVOEL7QDdJH', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));