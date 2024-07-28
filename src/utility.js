// 字符串转小数-》保留三位小数的字符串 -》字符串转化为小数
export function formatNumber(value) {
    return parseFloat.Number(value).toPrecision(3);
  }
