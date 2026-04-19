# 🎵 Dhir Dhir Music Academy Backend

This is a production-ready Node.js/TypeScript backend for the Dhir Dhir Music Academy mobile app. It specializes in high-quality, audio-based Lehra playback with dynamic tempo adjustment.

## 🚀 Features

- **Dilruba Playback**: Uses high-quality instrument samples.
- **Dynamic Tempo**: Adjust tempo from **60 BPM to 200 BPM** without affecting pitch.
- **Audio Streaming**: Supports seamless streaming of processed audio.
- **Caching**: Smart processing that avoids re-processing files with the same BPM.

---

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Install FFmpeg
The backend requires FFmpeg for audio processing.

- **Windows**: `choco install ffmpeg` or download from [ffmpeg.org](https://ffmpeg.org/download.html).
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg`

### 3. Run the Project
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

---

## 🧪 API Testing

### Tempo Adjustment
Adjust the speed of the Dilruba Lehra.

**Endpoint**: `POST /audio/tempo`

**Request Body**:
```json
{
  "bpm": 80
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/audio/tempo \
-H "Content-Type: application/json" \
-d '{"bpm":80}' --output output.mp3
```

**Postman**:
1. Set method to `POST`.
2. URL: `http://localhost:3000/audio/tempo`.
3. Body: `raw` -> `JSON`.
4. Enter `{"bpm": 80}`.
5. Send and Download the response.

---

## 📁 Folder Structure

- `src/controllers/`: Request handling and response coordination.
- `src/routes/`: API endpoint definitions.
- `src/services/`: Core business logic (audio processing orchestration).
- `src/utils/`: Helper functions for FFmpeg and tempo calculations.
- `src/config/`: Environment and global configuration.
- `src/types/`: TypeScript interfaces and types.
- `src/constants/`: App-wide constants (BPM limits, paths).
- `src/middlewares/`: Error handling and request processing.
- `assets/audio/`: Storage for base instrument samples.
- `temp/processed/`: Cache for processed audio files.

---

## 🔄 Development Workflow

### Backend
- Run `npm run dev` to start the TypeScript server with auto-reload.

### Frontend (Expo)
- Run `npx expo start` to launch the mobile app.

---

## 🔮 Future Improvements

- **Multiple Instruments**: Support for Sitar, Sarangi, and Harmonium.
- **Scale Support**: Dynamic pitch shifting to change scales (e.g., C, D, E).
- **Real-time Chunking**: Stream chunks for even faster response times.
- **Cloud Storage**: Offload processed files to AWS S3 or Google Cloud Storage.
