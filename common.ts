export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function log(...data: any[]) {
  console.log("[" + new Date().toISOString() + "] ", ...data);
}

export function date2Snowflake(date: Date) {
  return ((date.getTime() - 1420070400000) * 4194304).toString();
}
