import mongoose from 'mongoose';

const connectDatabase = async (): Promise<void> => {
	try {
		const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
		await mongoose.connect(uri);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		process.exit(1);
	}
};

export default connectDatabase;
