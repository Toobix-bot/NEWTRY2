export type AiMode = 'off' | 'browser' | 'ollama';
type AiConfig = { host: string; model: string };

let _mode: AiMode = 'browser';
export function aiMode() { return _mode; }
export function setAiMode(m: AiMode) { _mode = m; }

let _config: AiConfig = {
  host: 'http://127.0.0.1:11434',
  model: 'gemma3:1b',
};
export function getAiConfig(): AiConfig { return _config; }
export function setAiConfig(c: Partial<AiConfig>) { _config = { ..._config, ...c }; }

export interface AiAdapter {
  warmup?: () => void | Promise<void>;
  chat: (input: string) => Promise<string>;
}

import { browserAi } from './local-browser';
import { ollamaAi } from './ollama';

export function ai(): AiAdapter {
  switch (_mode) {
  case 'ollama': return ollamaAi(_config);
    case 'browser': return browserAi();
    default: return { chat: async () => 'KI ist ausgeschaltet.' };
  }
}
