import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(import.meta.dirname ?? '.', '.env') });

const BASE_URL = process.env.BASE_URL ?? 'https://dev.delekhomes.com';
const TIMEOUT_MS = 15_000;

export default async function globalSetup() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(BASE_URL, { method: 'HEAD', signal: controller.signal });
    if (!response.ok) {
      throw new Error(`${BASE_URL} returned HTTP ${response.status}`);
    }
  } catch (error) {
    const reason = error.name === 'AbortError'
      ? `${BASE_URL} did not respond within ${TIMEOUT_MS / 1000}s`
      : error.message;
    throw new Error(`Health check failed — aborting test run.\n${reason}`);
  } finally {
    clearTimeout(timer);
  }
}
