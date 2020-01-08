const getAngle = (a: Array<number>, b: Array<number>) => {
  return Math.atan((b[1] - a[1])/ (b[0] - a[0])) + Math.PI / 2;
};

const getCoordinates = (pointStart: Array<number>, pointEnd: Array<number>, radius: number, angle: number) => {
  return {
    pointStart,
    pointEnd,
    angle,
    a: [
      radius * Math.cos(angle) + pointStart[0],
      radius * Math.sin(angle) + pointStart[1],
    ],
    b: [
      radius * Math.cos(angle) + pointEnd[0],
      radius * Math.sin(angle) + pointEnd[1],
    ],
  };
};

export const createBuffer = (geo: GeoLine, radius: number) => {
  const coordinatesLeftLine: Array<ReturnType<typeof getCoordinates>> = [];
  const coordinatesRightLine: Array<ReturnType<typeof getCoordinates>> = [];

  for (let i = 0, length = geo.length - 1; i < length; i++) {
    const angle = getAngle(geo[i], geo[i + 1]);
    coordinatesLeftLine.push(
      getCoordinates(geo[i], geo[i + 1], radius, angle + (geo[i + 1][0] < geo[i][0] ? Math.PI : 0)),
    );
    coordinatesRightLine.push(
      getCoordinates(geo[i], geo[i + 1], radius, angle + (geo[i + 1][0] >= geo[i][0] ? Math.PI : 0)),
    );
  }

  return {
    coordinatesLeftLine,
    coordinatesRightLine,
  };
};