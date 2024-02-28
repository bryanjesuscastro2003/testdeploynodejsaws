// use the aws service and do upload file

const {s3Service, s3} = require('./s3service');
const putObjectCommand = require('@aws-sdk/client-s3');
require('dotenv').config();


// use the aws service and do upload file

const createBucketIfNotExists = async () => {
    try {
        //create the bucket if it doesn't exist
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME
        };
        if (await s3.headBucket(params)) {
            console.log('Bucket already exists');
            return;
        }
        await s3.createBucket(params)
    } catch (error) {
        console.log(error);
    }

};

const uploadFile = async (file) => {
  try {
    await createBucketIfNotExists();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "imagesnode/"+file.name, // File name you want to save as in S3
      Body: file.data, 
    };
    // upload to the nodeimages folder in the bucket

    const result = await s3.putObject(params);

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    console.log(url);
    console.log(result);    
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteFile = async (namefile) => {
    try {
        const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "imagesnode/"+namefile, // File name you want to save as in S3
        };
    
        const result = await s3.deleteObject(params);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {uploadFile, deleteFile};  
        

