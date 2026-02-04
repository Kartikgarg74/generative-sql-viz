"use client";

import { z } from 'zod';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const pythonTransformSchema = z.object({
  code: z.string().describe('Python code that was executed'),
  explanation: z.string().describe('What this code does in plain English'),
  inputRows: z.number().describe('Number of input rows'),
  outputRows: z.number().describe('Number of output rows after transformation'),
});

export function PythonTransform({ code, explanation, inputRows, outputRows }: any) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm border border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-lg">🐍</span>
          <span className="text-green-400 font-semibold">Python AI Transformation</span>
        </div>
        <button 
          onClick={() => setShowCode(!showCode)}
          className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>
      
      <p className="text-slate-300 mb-3 text-sm leading-relaxed">{explanation}</p>
      
      {showCode && (
        <div className="mb-3 rounded overflow-hidden">
          <SyntaxHighlighter 
            language="python" 
            style={vscDarkPlus}
            customStyle={{ margin: 0, fontSize: '12px' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
      
      <div className="flex gap-4 text-xs text-slate-400 border-t border-slate-700 pt-2">
        <span>📥 Input: {inputRows} rows</span>
        <span>📤 Output: {outputRows} rows</span>
        <span className="text-green-500">✓ Executed successfully</span>
      </div>
    </div>
  );
}
