const express = require('express');
const fileUpload = require('express-fileupload');
const {uploadFile, deleteFile} = require('./aws/filesactions');

const app = express();



app.use(fileUpload({
    createParentPath: true, 
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
    tempFileDir : './tmp',
}));

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //upload file to s3
            const result = await uploadFile(avatar);
            console.log(result);
            
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/delete/:namefile', async (req, res) => {
    try {
        const result = await deleteFile(req.params.namefile);
        console.log(result);
        res.send({
            status: true,
            message: 'File is deleted',
            data: {
                name: req.params.namefile
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    })

    

