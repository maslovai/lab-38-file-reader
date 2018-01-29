'use strict';
const fs = require('fs-extra');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.ACCESS_ID_Key,
    secretAccessKey: process.env.SECRET_ACCESS_Key
    // "region": "sa-east-1"   <- If you want send something to your bucket, you need take off this settings, because the S3 are global. 
});
const s3 = new AWS.S3()
console.log('in s3 upload, params: ');

const upload  = function(path, key){
    let params = {Bucket: process.env.AWS_BUCKET||irynasbucket, Key: key, ACL: 'public-read', Body:fs.createReadStream(path)}
    console.log('in s3 upload, params: ', params);
    return s3.upload(params)
    .promise()
    .then(res => { // onSuccess
        return fs.remove(path) // delete local file
        .then(() => res.Location) // resolve s3 url 
      })
      .catch(err => { // onFailure
        return fs.remove(path) // delete local file
        .then(() => Promise.reject(err)) // continue rejecting error
      })
        
    }
    
    const remove = (key) => {
      return s3.deleteObject({
        Key: key,
        Bucket: process.env.Bucket,
      })
      .promise()
}
 module.exports={upload, remove}
