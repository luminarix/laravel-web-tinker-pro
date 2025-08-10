export interface ReplCell {
  id: string;
  code: string;
  ts: number;
  historyId?: string;
}

export interface ReplState {
  enabled: boolean;
  cells: ReplCell[];
}

export interface ExecutionRecord {
  id: string;
  code: string;
  result: ExecuteCodeResponse | null;
  error: string | null;
  ts: number;
  pinned?: boolean;
}

export interface Tab {
  id: string;
  name: string;
  code: string;
  isActive: boolean;

  pinned?: boolean;
  locked?: boolean;
  history?: ExecutionRecord[];
  replState?: ReplState;
}

export interface ExecuteCodeRequest {
  code: string;
  stdin?: string;
}

export interface ServerResponse {
  timestamp: number;
  runtime: number;
  memoryUsage: string;
  output: string;
  outputSize: string;
}

export interface ExecuteCodeResponse {
  timestamp: string;
  runtime: string;
  memoryUsage: string;
  output: string;
  outputSize: string;
  status: number;
}

export interface ShareCodeRequest {
  code: string;
  title?: string;
}

export interface ShareCodeResponse {
  shareId: string;
  url: string;
}

export interface ExecutionState {
  isExecuting: boolean;
  result: ExecuteCodeResponse | null;
  error: string | null;
}

export interface AppState {
  tabs: Tab[];
  activeTabId: string;
  executionState: ExecutionState;
  theme: 'light' | 'dark';
}
