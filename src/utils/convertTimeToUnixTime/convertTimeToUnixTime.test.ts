import { test } from 'vitest';
import dayjs from 'dayjs';
import { HHMMSS_Format } from '@/config/constants';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
test('convert should work', () => {
  const time = dayjs('09:00:00', HHMMSS_Format);
  console.log(time);
});
