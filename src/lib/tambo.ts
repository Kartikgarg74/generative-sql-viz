import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';

export const components = [
  {
    name: 'Graph',
    description: 'Display data as a chart',
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: 'SmartChart',
    description: 'Chart component for SQL results. Use for visualizing query data.',
    component: SmartChart,
    propsSchema: smartChartSchema,
  },
];
