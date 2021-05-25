//process.env allows us to access the environment variable to be used in a file.
module.exports = {

	API_URL: process.env.REACT_APP_API_URL,
	getAccessToken: () => localStorage.getItem('token'),

}