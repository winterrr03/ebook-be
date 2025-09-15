import * as fsp from 'fs/promises';
import { DownloaderHelper } from 'node-downloader-helper';
import path from 'path';
import { TEMP_FILES_DIR } from 'src/constants/path';
import { CONTROL_CHAR_REGEX } from 'src/constants/regex';

async function ensureTmpDir(): Promise<string> {
  await fsp.mkdir(TEMP_FILES_DIR, { recursive: true });
  return TEMP_FILES_DIR;
}

export async function downloadTmpFile(url: string): Promise<string> {
  const dir = await ensureTmpDir();
  const ext = path.extname(new URL(url).pathname) || '';
  const fileName = `${Date.now()}${ext}`;
  const filePath = path.join(dir, fileName);

  const dl = new DownloaderHelper(url, dir, {
    fileName,
    override: true,
  });

  return new Promise<string>((resolve, reject) => {
    dl.on('end', () => resolve(filePath));
    dl.on('error', (err) => reject(toError(err)));
    dl.start().catch((err) => reject(toError(err)));
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

export function sanitizeText(input: string): string {
  if (!input) return input;

  return input.replace(CONTROL_CHAR_REGEX, '');
}

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
