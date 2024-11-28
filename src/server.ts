import app from './app';
import connectDatabase from './config/database';

const PORT = process.env.PORT || 5000;

connectDatabase();

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
