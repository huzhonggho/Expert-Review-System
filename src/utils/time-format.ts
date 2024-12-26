export const timeFormat = (
  time: any,
  type: 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD',
): string => {
  if (time == '' || time == undefined || time == null) return '';
  const date = new Date();
  date.setTime(time);
  const YYYY = date.getFullYear();
  const MM = preAddZero((date.getMonth() + 1).toString(), 2);
  const DD = preAddZero(date.getDate().toString(), 2);

  if (type === 'YYYY-MM-DD') return `${YYYY}-${MM}-${DD}`;

  if (type === 'YYYY-MM-DD hh:mm:ss') {
    const hh = preAddZero(date.getHours().toString(), 2);
    const mm = preAddZero(date.getMinutes().toString(), 2);
    const ss = preAddZero(date.getSeconds().toString(), 2);
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  }

  return '时间格式有误';
};

const preAddZero = (str: string, length: number): string => {
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};
