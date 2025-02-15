import { ChartTimeFrame, ONE_DAY_MS, ONE_HOUR_MS } from '@badger-dao/sdk';
import { getDataMapper } from '../aws/dynamodb.utils';
import { ChartDataBlob } from '../aws/models/chart-data-blob.model';
import { ChartData } from './chart-data.model';

export function toChartDataBlob<T extends ChartData<T>>(
  id: string,
  timeframe: ChartTimeFrame,
  data: T[],
): ChartDataBlob<T> {
  return Object.assign(new ChartDataBlob(), {
    id,
    timeframe,
    data,
  });
}

export function toChartDataKey(namespace: string, id: string, timeframe: ChartTimeFrame): string {
  return [namespace, id, timeframe].join('_');
}

export function shouldUpdate(reference: number, timestamp: number, timeframe: ChartTimeFrame): boolean {
  const difference = reference - timestamp;
  let update = false;
  switch (timeframe) {
    case ChartTimeFrame.Max:
    case ChartTimeFrame.Year:
    case ChartTimeFrame.ThreeMonth:
    case ChartTimeFrame.Month:
    case ChartTimeFrame.YTD:
      update = difference >= ONE_DAY_MS;
      break;
    case ChartTimeFrame.Week:
      update = difference >= ONE_HOUR_MS * 6;
      break;
    default:
      update = difference >= ONE_HOUR_MS;
  }
  return update;
}

export function shouldTrim(reference: number, timestamp: number, timeframe: ChartTimeFrame): boolean {
  const difference = reference - timestamp;
  let update;
  switch (timeframe) {
    case ChartTimeFrame.Year:
      update = difference >= ONE_DAY_MS * 365;
      break;
    case ChartTimeFrame.ThreeMonth:
      update = difference >= ONE_DAY_MS * 90;
      break;
    case ChartTimeFrame.Month:
      update = difference >= ONE_DAY_MS * 30;
      break;
    case ChartTimeFrame.Week:
      update = difference >= ONE_DAY_MS * 7;
      break;
    case ChartTimeFrame.Day:
      update = difference >= ONE_DAY_MS;
      break;
    // Year to date needs a full clear - so we will never trim
    case ChartTimeFrame.YTD:
    default:
      update = false;
  }
  return update;
}

export async function updateSnapshots<T extends ChartData<T>>(namespace: string, snapshot: T) {
  const mapper = getDataMapper();
  const isFirstOfYear = (date: Date) => date.getDay() === 0 && date.getMonth() === 0;

  const { id, timestamp: now } = snapshot;
  for (const timeframe of Object.values(ChartTimeFrame)) {
    const searchKey = Object.assign(new ChartDataBlob<T>(), {
      id: toChartDataKey(namespace, id, timeframe),
    });

    let cachedChart: ChartDataBlob<T> | undefined;
    try {
      cachedChart = await mapper.get(searchKey);
      if (timeframe === ChartTimeFrame.YTD) {
        const date = new Date(now);
        if (isFirstOfYear(date) && cachedChart.data.length > 1) {
          // new year, force a new object to be created
          cachedChart = undefined;
        }
      }
    } catch (err) {
      console.log({ message: 'Unable to query cached chart, may simply not exist', err });
    } // no item found

    let updateCache = false;
    if (!cachedChart) {
      const blob = toChartDataBlob(searchKey.id, timeframe, []);
      console.log(`Create blob for ${searchKey.id}`);
      try {
        cachedChart = await mapper.put(blob);
      } catch (err) {
        console.error({ message: 'Unable to save blob', err });
      }
      updateCache = true;
    } else {
      const { timeframe, data } = cachedChart;
      const recentSnapshot = data[0].timestamp;
      updateCache = shouldUpdate(now, recentSnapshot, timeframe);

      const lastSnapshot = data[data.length - 1].timestamp;
      if (shouldTrim(now, lastSnapshot, timeframe)) {
        cachedChart.data = cachedChart.data.slice(0, data.length - 1);
      }
    }

    if (updateCache && cachedChart) {
      cachedChart.data.splice(0, 0, snapshot);
      console.log(`Update ${searchKey.id} (${cachedChart.data.length} entries)`);
      try {
        await mapper.put(cachedChart);
      } catch (err) {
        console.error({ message: 'Unable to save blob', err });
      }
    }
  }
}
