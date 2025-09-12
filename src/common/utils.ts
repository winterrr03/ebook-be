import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as https from 'https';
import path from 'path';
import { TEMP_FILES_DIR } from 'src/constants/path';

async function ensureTmpDir(): Promise<string> {
  await fsp.mkdir(TEMP_FILES_DIR, { recursive: true });
  return TEMP_FILES_DIR;
}

export async function downloadTmpFile(url: string): Promise<string> {
  const filePath = path.join(
    await ensureTmpDir(),
    `${Date.now()}${path.extname(new URL(url).pathname)}`,
  );

  const file = fs.createWriteStream(filePath);

  return new Promise<string>((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(filePath, () => {});
          return reject(
            new Error(`Failed to download: ${response.statusCode}`),
          );
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve(filePath);
        });
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
}

export async function removeFile(filePath: string): Promise<void> {
  try {
    await fsp.unlink(filePath);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Failed to remove file ${filePath}: ${err.message}`);
    } else {
      console.error(`Failed to remove file ${filePath}: Unknown error`);
    }
  }
}
