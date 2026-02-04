import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';
import { exportPanelSchema, ExportPanel } from '@/components/tambo/export-panel';
import { pythonTransformSchema, PythonTransform } from '@/components/tambo/python-transform';

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
  {
    name: 'PythonTransform',
    description: 'Show Python code that transformed data. Use after executePython to display the code and results to user.',
    component: PythonTransform,
    propsSchema: pythonTransformSchema,
  },
];
