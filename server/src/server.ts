import app from './app';
import dotenv from 'dotenv';
import './auth/google'; // 👈 Add this line

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
