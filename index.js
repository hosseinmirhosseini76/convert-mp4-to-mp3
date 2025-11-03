import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import cliProgress from "cli-progress";

const inputFolder = "../../Musics/Country"; // Change this to the input folder
const outputFolder = "../../Musics/Country/mp3s"; // Change this to the output folder

if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

const mp4Files = fs
    .readdirSync(inputFolder)
    .filter((file) => path.extname(file).toLowerCase() === ".mp4");

const totalFiles = mp4Files.length;
let convertedCount = 0;

if (totalFiles === 0) {
    console.log("No MP4 files found in the folder.");
    process.exit(0);
}

console.log(`🎬 Found ${totalFiles} video(s):`);
mp4Files.forEach((f) => console.log(" -", f));

const bar = new cliProgress.SingleBar(
    {
        format: "Converting [{bar}] {percentage}% | {filename}",
        barCompleteChar: "█",
        barIncompleteChar: "-",
        hideCursor: true,
    },
    cliProgress.Presets.shades_classic
);

function convertToMp3(inputFile, outputFile, filename) {
    return new Promise((resolve, reject) => {
        bar.start(100, 0, { filename });

        ffmpeg(inputFile)
            .toFormat("mp3")
            .on("progress", (progress) => {
                bar.update(progress.percent || 0, { filename });
            })
            .on("error", (err) => {
                bar.stop();
                reject(err);
            })
            .on("end", () => {
                bar.update(100, { filename });
                bar.stop();
                convertedCount++;
                console.log(`✅ Converted (${convertedCount}/${totalFiles}): ${outputFile}`);
                resolve();
            })
            .save(outputFile);
    });
}

async function processAll() {
    for (const file of mp4Files) {
        const inputPath = path.join(inputFolder, file);
        const outputName = path.basename(file, ".mp4") + ".mp3";
        const outputPath = path.join(outputFolder, outputName);

        try {
            await convertToMp3(inputPath, outputPath, file);
        } catch (err) {
            console.error("❌ Error converting:", file, err.message);
        }
    }

    console.log(`\n🎵 All ${convertedCount}/${totalFiles} files converted successfully!`);
}

processAll();
