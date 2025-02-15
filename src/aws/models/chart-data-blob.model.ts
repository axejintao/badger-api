import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { ChartTimeFrame } from '@badger-dao/sdk';
import { ChartData } from '../../charts/chart-data.model';
import { CHART_DATA } from '../../config/constants';

@table(CHART_DATA)
export class ChartDataBlob<T extends ChartData<T>> {
  @hashKey()
  id!: string;

  @attribute()
  timeframe!: ChartTimeFrame;

  @attribute({ memberType: { type: 'Any' } })
  data!: Array<T>;
}
