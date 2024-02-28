// for s3 service


const { S3, S3Client } = require('@aws-sdk/client-s3');

require('dotenv').config();

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})

const s3Client = new S3Client({
    credentials: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})



module.exports = {s3Client, s3};

