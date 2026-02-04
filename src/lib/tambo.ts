import { graphSchema } from '@/components/tambo/graph';
import { Graph } from '@/components/tambo/graph';
import { smartChartSchema, SmartChart } from '@/components/tambo/smart-chart';
import { exportPanelSchema, ExportPanel } from '@/components/tambo/export-panel';
import { pythonTransformSchema, PythonTransform } from '@/components/tambo/python-transform';
import { schemaVisualizerSchema, SchemaVisualizer } from '@/components/tambo/schema-visualizer';
import { erDiagramSchema, ERDiagram } from '@/components/tambo/er-diagram';
import { neonStatusSchema, NeonStatus } from '@/components/tambo/neon-status';
import { braveResultsSchema, BraveResults } from '@/components/tambo/brave-results';
import { githubActionSchema, GitHubAction } from '@/components/tambo/github-action';
import { airtableExportSchema, AirtableExport } from '@/components/tambo/airtable-export';
import { notionPageSchema, NotionPage } from '@/components/tambo/notion-page';

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
    description: 'Visual database schema showing tables and columns',
    component: SchemaVisualizer,
    propsSchema: schemaVisualizerSchema,
  },
  {
    name: 'ERDiagram',
    description: 'Interactive Entity-Relationship diagram',
    component: ERDiagram,
    propsSchema: erDiagramSchema,
  },
  {
    name: 'NeonStatus',
    description: 'Show connection status to Neon database with available tables',
    component: NeonStatus,
    propsSchema: neonStatusSchema,
  },
  {
    name: 'BraveResults',
    description: 'Display web search results from Brave search engine',
    component: BraveResults,
    propsSchema: braveResultsSchema,
  },
  {
    name: 'GitHubAction',
    description: 'Show GitHub action result like creating gist or viewing repo',
    component: GitHubAction,
    propsSchema: githubActionSchema,
  },
  {
    name: 'AirtableExport',
    description: 'Show export status to Airtable or Google Sheets',
    component: AirtableExport,
    propsSchema: airtableExportSchema,
  },
  {
    name: 'NotionPage',
    description: 'Show created Notion page with link',
    component: NotionPage,
    propsSchema: notionPageSchema,
  },
];
