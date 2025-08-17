export type AiMode = 'off' | 'browser' | 'ollama';

let _mode: AiMode = 'browser';
export function aiMode() { return _mode; }
export function setAiMode(m: AiMode) { _mode = m; }

export interface AiAdapter {
  warmup?: () => void | Promise<void>;
  chat: (input: string) => Promise<string>;
}

import { browserAi } from './local-browser';
import { ollamaAi } from './ollama';

export function ai(): AiAdapter {
  switch (_mode) {
    case 'ollama': return ollamaAi();
    case 'browser': return browserAi();
    default: return { chat: async () => 'KI ist ausgeschaltet.' };
  }
}
