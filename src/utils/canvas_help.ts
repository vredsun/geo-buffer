import { createBuffer } from 'utils/app';
import { testLineGeoSimple } from 'mock';

const transform = (coordinate: [number, number]): [number, number] => {
  return [
    coordinate[0],
    600 - coordinate[1]
  ];
};

const renderOneLine = (ctx: CanvasRenderingContext2D, coordinates: Array<[number, number]>) => {
  for (let i = 0, length = coordinates.length; i < length; i++) {
    if (i === 0) {
      ctx.moveTo(...transform(coordinates[i]));
    } else {
      ctx.lineTo(...transform(coordinates[i]));
    }
  }
};

const renderOneNewLine = (ctx: CanvasRenderingContext2D, coordinates: ReturnType<typeof createBuffer>['coordinatesLeftLine']) => {
  renderOneLine(
    ctx,
    coordinates.reduce(
      (newArr, rowData) => {
        newArr.push(rowData.a, rowData.b);

        return newArr;
      },
      [],
    )
  );
};

export const renderLines = (testLineGeoLocal: typeof testLineGeoSimple, testA: ReturnType<typeof createBuffer>) => {
  const canvas = document.getElementById('test') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  renderOneLine(ctx, testLineGeoLocal);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  renderOneNewLine(ctx, testA.coordinatesLeftLine);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'green';
  renderOneNewLine(ctx, testA.coordinatesRightLine);
  ctx.stroke();
};