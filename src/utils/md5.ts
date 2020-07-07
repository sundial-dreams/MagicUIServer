import { createHash } from 'crypto';

export function md5(str: string) {
  const hash = createHash('md5');
  return hash.update(str).digest('base64');
}