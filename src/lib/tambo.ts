import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';
import { exportPanelSchema, ExportPanel } from '@/components/tambo/export-panel';
import { pythonTransformSchema, PythonTransform } from '@/components/tambo/python-transform';
import { schemaVisualizerSchema, SchemaVisualizer } from '@/components/tambo/schema-visualizer';
import { erDiagramSchema, ERDiagram } from '@/components/tambo/er-diagram';

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
    description: 'Export data as CSV or JSON file',
    component: ExportPanel,
    propsSchema: exportPanelSchema,
  },
  {
    name: 'PythonTransform',
    description: 'Show Python code that transformed data with AI',
    component: PythonTransform,
    propsSchema: pythonTransformSchema,
  },
  {
    name: 'SchemaVisualizer',
    description: 'Visual database schema showing tables and columns in list format',
    component: SchemaVisualizer,
    propsSchema: schemaVisualizerSchema,
  },
  {
    name: 'ERDiagram',
    description: 'Interactive Entity-Relationship diagram showing tables as boxes with relationship lines. Use when user asks for ER diagram, visual schema, or table relationships.',
    component: ERDiagram,
    propsSchema: erDiagramSchema,
  },
];
