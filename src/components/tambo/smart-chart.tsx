"use client";

import { z } from 'zod';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tambo doesn't support dynamic records, so we use a flexible object with string keys/values
export const smartChartSchema = z.object({
  data: z.array(z.object({}).passthrough()).describe('Array of data objects with any properties'),
  chartType: z.enum(['bar', 'line', 'auto']).describe('Type of chart: bar, line, or auto-detect'),
  xAxis: z.string().describe('Property name for X-axis categories'),
  yAxis: z.string().describe('Property name for Y-axis values'),
  title: z.string().describe('Chart title to display'),
});

export function SmartChart({ 
  data, 
  chartType, 
  xAxis, 
  yAxis, 
  title 
}: { 
  data: Record<string, unknown>[]; 
  chartType: 'bar' | 'line' | 'auto'; 
  xAxis: string; 
  yAxis: string; 
  title: string;
}) {
  const type = chartType === 'auto' ? 'bar' : chartType;
  
  const Chart = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <DataComponent dataKey={yAxis} fill="#8884d8" />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
