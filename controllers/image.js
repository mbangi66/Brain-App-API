const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '328a45c9298443008fe66c58354ee8f1'
});

const handleApiCall =(req, res) => {
	app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
       	 res.json(data);
       })
       .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage =  (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get count'))

}



module.exports = {
	 handleImage: handleImage, handleApiCall
};
 