import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';
import { exportPanelSchema, ExportPanel } from '@/components/tambo/export-panel';

export const components = [
  {
    name: 'Graph',
    description: 'Display data as a chart',
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: 'SmartChart',
    description: 'Chart component for SQL results with auto type detection',
    component: SmartChart,
    propsSchema: smartChartSchema,
  },
  {
    name: 'ExportPanel',
    description: 'Export data as CSV or JSON file. Use after showing query results to let user download data.',
    component: ExportPanel,
    propsSchema: exportPanelSchema,
  },
];
