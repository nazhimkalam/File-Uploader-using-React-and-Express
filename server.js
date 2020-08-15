const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

// Upload Endpoint '/upload' and it's a POST request, note that this end point can be of any name
app.post('/upload', (req, res) => {
	if (req.files === null) {
		// checking for error if any file is not uploaded
		return res.status(400).json({ msg: 'No file was uploaded' });
	}

	const file = req.files.file; // getting the uploaded file

	// setting the path to store the file
	file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
		// suppose if the path didn't exist
		if (err) {
			console.error(err);
			return res.status(500).send(err); // sending a server error
		}

		// if there is no issues then the following code will be executed
		res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
	});
});

app.listen(5000, () => console.log('server started'));
