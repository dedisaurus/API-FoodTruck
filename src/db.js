import mongoose from 'mongoose';
import configu from './config';

var dbUrl = 'mongodb://user:di.201291@ds155293.mlab.com:55293/testdbz'

export default callback => {
    let db = mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
        console.log('mongo db connection', err)
    })
    callback(db);  
};