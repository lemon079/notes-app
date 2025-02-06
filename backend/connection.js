import mongoose from "mongoose"

function connectToDb(url) {
    return mongoose.connect(url)
}

export default connectToDb