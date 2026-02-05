import { NextResponse } from 'next/server';

interface PythonResult {
  data: any[];
  newColumns: string[];
}

export async function POST(request: Request) {
  try {
    const { code, data } = await request.json();

    // Execute mock Python transformation
    const result = executePythonMock(code, data);

    return NextResponse.json({
      success: true,
      result: result.data,
      newColumns: result.newColumns,
      rowsProcessed: data?.length || 0,
      rowsReturned: result.data.length
    });

  } catch (error: unknown) {
    console.error('Python execution error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}

function executePythonMock(code: string, data: any[]): PythonResult {
  const newColumns: string[] = [];
  let transformedData = [...(data || [])];

  // Pattern 1: Prediction / Forecasting
  if (code.includes('predict') || code.includes('forecast') || code.includes('linear_regression')) {
    newColumns.push('predicted', 'confidence');
    transformedData = data.map((row, index) => ({
      ...row,
      predicted: calculateTrend(data, index),
      confidence: Math.round((Math.random() * 0.3 + 0.7) * 100) / 100,
    }));
  }

  // Pattern 2: Aggregation / GroupBy
  else if (code.includes('groupby') || code.includes('aggregate') || code.includes('sum')) {
    const grouped = aggregateData(data);
    transformedData = Object.values(grouped);
  }

  // Pattern 3: Calculate new column
  else if (code.includes('calculate') || code.includes('new_column') || code.includes('revenue_per_unit')) {
    newColumns.push('calculated_value');
    transformedData = data.map(row => ({
      ...row,
      calculated_value: (row.amount || 0) / (row.quantity || 1),
    }));
  }

  // Pattern 4: Filter / Query
  else if (code.includes('filter') || code.includes('where')) {
    transformedData = data.filter(row => {
      const amount = row.amount || 0;
      return amount > 100;
    });
  }

  // Pattern 5: Sort
  else if (code.includes('sort') || code.includes('order')) {
    transformedData = [...data].sort((a, b) => (b.amount || 0) - (a.amount || 0));
  }

  // Default: return as-is with row_number
  else {
    newColumns.push('row_number');
    transformedData = data.map((row, i) => ({
      ...row,
      row_number: i + 1,
    }));
  }

  return { data: transformedData, newColumns };
}

function calculateTrend(data: any[], index: number): number {
  const base = data[index]?.amount || data[index]?.total_sales || 100;
  const trend = index * 10;
  const noise = Math.random() * 20 - 10;
  return Math.round((base + trend + noise) * 100) / 100;
}

function aggregateData(data: any[]): Record<string, any> {
  const grouped: Record<string, any> = {};

  data.forEach(row => {
    const key = row.category || row.region || 'Unknown';
    if (!grouped[key]) {
      grouped[key] = {
        group: key,
        count: 0,
        total: 0,
        avg: 0,
        max: -Infinity,
        min: Infinity,
      };
    }

    const amount = row.amount || row.total_sales || 0;
    grouped[key].count += 1;
    grouped[key].total += amount;
    grouped[key].max = Math.max(grouped[key].max, amount);
    grouped[key].min = Math.min(grouped[key].min, amount);
    grouped[key].avg = Math.round((grouped[key].total / grouped[key].count) * 100) / 100;
  });

  return grouped;
}
