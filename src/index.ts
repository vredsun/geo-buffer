import { renderLines } from 'utils/canvas_help';
import { createBuffer } from 'utils/app';
import { testLineGeoSimple } from 'mock';

console.time('a');
const a = createBuffer(testLineGeoSimple, 10);
console.timeEnd('a');
// test
console.info({ a });

renderLines(testLineGeoSimple, a);

export default createBuffer;
