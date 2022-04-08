export const sortObj = (obj) =>
  Object.keys(obj)
    .sort()
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const getDenormalizedRecord = (startDate, endDate, sizeGB) => {
  let dt = new Date(startDate);
  let end = new Date(endDate);
  let diff_days = (end - dt) / 86400000 + 1;
  let sizeGBperDay = sizeGB / diff_days;

  let output = [];
  let record = {};
  while (dt <= end) {
    record["cutover_date"] = new Date(dt).toISOString().slice(0, 10);
    record["sizeGBperDay"] = sizeGBperDay;
    record["GbpsPerDay"] = (sizeGBperDay * 8) / (24 * 60 * 60);

    output.push(record);
    record = {};
    dt.setDate(dt.getDate() + 1);
  }
  return output;
};
