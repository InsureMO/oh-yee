import dayjs from 'dayjs';

const last15m = 'Last 15 min';
const last1h = 'Last 1 hour';
const last24h = 'Last 24 hours';
const last1d = 'Last day';
const last1w = 'Last week';
const last1mh = 'Last month';

export const SINGLEPANELDEFAULTRANGES = {
  [last15m]: [dayjs().add(-15, 'minute'), dayjs()],
  [last1h]: [dayjs().add(-1, 'hour'), dayjs()],
  [last24h]: [dayjs().add(-1, 'day'), dayjs()],
  [last1w]: [dayjs().add(-7, 'day'), dayjs()],
  [last1mh]: [dayjs().add(-1, 'month'), dayjs()],
};

export const DOUBLEPANELDEFAULTRANGES = {
  [last1d]: [dayjs().add(-1, 'day'), dayjs()],
  [last1w]: [dayjs().add(-7, 'day'), dayjs()],
  [last1mh]: [dayjs().add(-1, 'month'), dayjs()],
};
