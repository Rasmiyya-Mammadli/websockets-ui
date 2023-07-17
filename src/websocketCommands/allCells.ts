export const allCells = new Array(10)
  .fill(0)
  .map((_, i) =>
    new Array(10).fill(0).map((_, j) => JSON.stringify({ x: i, y: j })),
  )
  .flat(1);
