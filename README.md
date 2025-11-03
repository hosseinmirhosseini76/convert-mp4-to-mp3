## 🎵 MP4 → MP3 Batch Converter (Node.js)

Convert entire folders of `.mp4` videos to high-quality `.mp3` audio with a clean progress bar. Built with Node.js, powered by `fluent-ffmpeg`, and designed for simple, reliable batch processing.

### ✨ Features
- **Batch conversion**: Processes every `.mp4` in a folder
- **Progress bar**: Live, per-file progress display
- **Safe-by-default**: Creates the output folder if it doesn’t exist
- **Clear logging**: Friendly start/end summaries and per-file status

### 📦 Prerequisites
- **Node.js** 16+ (LTS recommended)
- **FFmpeg** installed and available on your `PATH`
  - Windows (PowerShell): `choco install ffmpeg`
  - macOS (Homebrew): `brew install ffmpeg`
  - Linux (APT): `sudo apt-get install ffmpeg`
  - Verify: `ffmpeg -version`

### 🧰 Install Dependencies
```bash
npm install
```

### 🔧 Configure Input/Output Folders
Edit the paths near the top of `index.js` to point to your source videos and destination for MP3s:

```6:8:index.js
const inputFolder = "../../Musics/Country";
const outputFolder = "../../Musics/Country/mp3s";
```

- **`inputFolder`**: Directory containing `.mp4` files
- **`outputFolder`**: Directory where `.mp3` files will be saved (auto-created)

Tip: Use absolute paths on Windows to avoid drive/path issues, e.g. `"D:/Media/Videos"`.

### ▶️ Run
```bash
node index.js
```

You’ll see a list of detected videos and a progress bar for each file:

```text
🎬 Found 5 video(s):
 - clip1.mp4
 - clip2.mp4
 ...
Converting [███████-----] 63% | clip1.mp4
✅ Converted (1/5): D:/Media/Videos/mp3s/clip1.mp3
...
🎵 All 5/5 files converted successfully!
```

### 🧪 How It Works (High-Level)
- Scans `inputFolder` for `.mp4` files
- Uses `fluent-ffmpeg` to transcode audio to `.mp3`
- Renders a progress bar via `cli-progress`
- Writes output to `outputFolder` using the original base filename

### ⚙️ Dependencies Used
- [`fluent-ffmpeg`](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg): FFmpeg wrapper for Node.js
- [`cli-progress`](https://github.com/AndiDittrich/Node.CLI-Progress): Terminal progress bars

### ❗ Troubleshooting
- **“No MP4 files found in the folder.”**
  - Confirm `inputFolder` path exists and contains `.mp4` files
  - Check for typos and correct path separators (use `/` or escaped `\\` on Windows)
- **“ffmpeg not found” or conversion doesn’t start**
  - Ensure FFmpeg is installed and `ffmpeg -version` works in your terminal
  - If not on `PATH`, set it or provide the binary location per `fluent-ffmpeg` docs
- **Windows path issues**
  - Prefer absolute paths like `D:/self-work/input` rather than relative `../../..`

### 🗂️ Project Structure
```text
convert-mp4-to-mp3/
├─ index.js           # Batch converter script
├─ package.json       # Dependencies and scripts
└─ README.md          # You are here
```

### 🔒 Notes
- Existing files with the same name in `outputFolder` may be overwritten by FFmpeg.
- The script currently targets `.mp4` inputs only. Extend the filter if needed.

### 📝 License
MIT. Feel free to use, modify, and share.


