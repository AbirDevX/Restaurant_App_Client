export function isFloat(number) {
  // Check if the number has a fractional part
  return Number(number) === number && number % 1 !== 0;
}

export const paginationPages = (data, limit) => {
  if (data && data.totalLength) {
    if (isFloat(data.totalLength / limit)) {
      const res = data.totalLength / limit;
      return parseInt(res.toString().split(".")[0]) + 1;
    } else {
      return data.totalLength / limit;
    }
  }
};
