import { getDataMapper } from '../aws/dynamodb.utils';
import { MetricType } from '../metrics/enums/metric-type';
import { ProtocolMetricSnapshot } from '../metrics/interfaces/protocol-metric-snapshot';
import { getProtocolMetrics } from '../metrics/metric.utils';

export const indexProtocolMetrics = async (): Promise<void> => {
  const mapper = getDataMapper();
  const metric = await getProtocolMetrics();
  const metricSnapshot = Object.assign(new ProtocolMetricSnapshot(), { ...metric, type: MetricType.protocol });

  try {
    await mapper.put(metricSnapshot);
  } catch (err) {
    console.log({ message: err.message, metricSnapshot });
  }
};
