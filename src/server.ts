import app from './app';
import { APP_CONSTANTS } from './constants/app.constants';

const PORT = APP_CONSTANTS.PORT;

app.listen(PORT, () => {
  console.log(`
  🎵 Dhir Dhir Music Academy Backend
  🚀 Server is running on port ${PORT}
  📍 Health check: http://localhost:${PORT}/health
  `);
});
