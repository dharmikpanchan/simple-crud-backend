import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION);
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export { dbConnection }