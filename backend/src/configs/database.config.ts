import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!)
        .then(() => console.log("Connected to MongoDB"))
        .catch(error => console.log("Connection error:", error));
}