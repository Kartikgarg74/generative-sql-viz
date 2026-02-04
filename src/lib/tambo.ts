import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';
import { exportPanelSchema, ExportPanel } from '@/components/tambo/export-panel';
import { pythonTransformSchema, PythonTransform } from '@/components/tambo/python-transform';
import { schemaVisualizerSchema, SchemaVisualizer } from '@/components/tambo/schema-visualizer';
import { erDiagramSchema, ERDiagram } from '@/components/tambo/er-diagram';
import { neonDemoSchema, NeonDemo } from '@/components/tambo/neon-demo';
import { connectCardSchema, ConnectCard } from '@/components/tambo/connect-card';

export const components = [
  {
    name: 'Graph',
    description: 'Display data as a chart',
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: 'SmartChart',
    description: 'Chart component for SQL results',
    component: SmartChart,
    propsSchema: smartChartSchema,
  },
  {
    name: 'ExportPanel',
    description: 'Export data as CSV or JSON',
    component: ExportPanel,
    propsSchema: exportPanelSchema,
  },
  {
    name: 'PythonTransform',
    description: 'Python AI transformation display',
    component: PythonTransform,
    propsSchema: pythonTransformSchema,
  },
  {
    name: 'SchemaVisualizer',
    description: 'Database schema list view',
    component: SchemaVisualizer,
    propsSchema: schemaVisualizerSchema,
  },
  {
    name: 'ERDiagram',
    description: 'Interactive ER diagram',
    component: ERDiagram,
    propsSchema: erDiagramSchema,
  },
  {
    name: 'NeonDemo',
    description: 'Interactive Neon database browser with demo data',
    component: NeonDemo,
    propsSchema: neonDemoSchema,
  },
  {
    name: 'ConnectCard',
    description: 'Universal connection card for any service (Neon, GitHub, Brave, Airtable, Notion)',
    component: ConnectCard,
    propsSchema: connectCardSchema,
  },
];
