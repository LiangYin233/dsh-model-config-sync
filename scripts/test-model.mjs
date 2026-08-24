/**
 * Unit tests for the client model logic (src/client/model.ts) — the only
 * pure business logic shared by both mounts. Runs with the Node test runner
 * plus built-in type stripping:
 *
 *   node --experimental-strip-types --test scripts/test-model.mjs
 *
 * (the flag is a no-op on Node 24, where type stripping is default-on).
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildEntry, entryToForm, modelSummary, THINKING_LEVELS, THINKING_FORMATS } from '../src/client/model.ts'

test('shared constants match the canonical source', () => {
  assert.deepEqual(THINKING_LEVELS, ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'])
  assert.deepEqual(THINKING_FORMATS, ['openai', 'deepseek', 'openrouter', 'together', 'zai', 'qwen', 'chat-template', 'qwen-chat-template', 'string-thinking', 'ant-ling'])
})

test('buildEntry: trims id and name, drops empty fields', () => {
  const e = buildEntry({ id: '  deepseek-v5  ', name: '  DS  ', contextWindow: '', maxTokens: '', inputUnset: true, reasoningMode: 'unset', levels: [], compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' })
  assert.deepEqual(e, { id: 'deepseek-v5', name: 'DS' })
})

test('buildEntry: numeric fields only when valid positive integers', () => {
  const base = { id: 'm', name: '', inputUnset: true, reasoningMode: 'unset', levels: [], compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }
  assert.equal(buildEntry({ ...base, contextWindow: '262144', maxTokens: '32768' }).contextWindow, 262144)
  assert.equal(buildEntry({ ...base, contextWindow: '32768' }).maxTokens, undefined)
  assert.equal(buildEntry({ ...base, contextWindow: 'abc' }).contextWindow, undefined)
  assert.equal(buildEntry({ ...base, contextWindow: '0' }).contextWindow, undefined)
  assert.equal(buildEntry({ ...base, contextWindow: '1.5' }).contextWindow, undefined)
})

test('buildEntry: input modes only when unset is off', () => {
  const base = { id: 'm', name: '', contextWindow: '', maxTokens: '', reasoningMode: 'unset', levels: [], compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }
  assert.equal(buildEntry({ ...base, inputUnset: true, inputText: true, inputImage: true }).input, undefined)
  assert.deepEqual(buildEntry({ ...base, inputUnset: false, inputText: true, inputImage: false }).input, ['text'])
  assert.deepEqual(buildEntry({ ...base, inputUnset: false, inputText: true, inputImage: true }).input, ['text', 'image'])
  assert.equal(buildEntry({ ...base, inputUnset: false, inputText: false, inputImage: false }).input, undefined)
})

test('buildEntry: reasoning modes', () => {
  const base = { id: 'm', name: '', contextWindow: '', maxTokens: '', inputUnset: true, compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }
  assert.equal(buildEntry({ ...base, reasoningMode: 'off', levels: [] }).reasoningEfforts, false)
  assert.deepEqual(buildEntry({ ...base, reasoningMode: 'unset', levels: [] }).reasoningEfforts, undefined)
  // Unchecked rows and empty wires are skipped; off writes null.
  const levels = [
    { level: 'off', wire: '', on: true },
    { level: 'low', wire: 'low', on: true },
    { level: 'high', wire: '', on: true },
    { level: 'max', wire: 'max', on: false },
  ]
  assert.deepEqual(buildEntry({ ...base, reasoningMode: 'levels', levels }).reasoningEfforts, { off: null, low: 'low' })
})

test('buildEntry: compat block only when set', () => {
  const base = { id: 'm', name: '', contextWindow: '', maxTokens: '', inputUnset: true, reasoningMode: 'unset', levels: [], compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }
  assert.equal(buildEntry({ ...base, compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }).compat, undefined)
  assert.deepEqual(buildEntry({ ...base, compatThinkingFormat: 'deepseek', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }).compat, { thinkingFormat: 'deepseek' })
  assert.deepEqual(buildEntry({ ...base, compatThinkingFormat: '', compatSupportsReasoningEffort: 'false', compatSupportsDeveloperRole: '' }).compat, { supportsReasoningEffort: false })
  assert.deepEqual(buildEntry({ ...base, compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: 'false' }).compat, { supportsDeveloperRole: false })
  assert.deepEqual(buildEntry({ ...base, compatThinkingFormat: 'openai', compatSupportsReasoningEffort: 'true', compatSupportsDeveloperRole: 'false' }).compat, { thinkingFormat: 'openai', supportsReasoningEffort: true, supportsDeveloperRole: false })
})

test('buildEntry: compat enums, kwargs and extra booleans', () => {
  const base = { id: 'm', name: '', contextWindow: '', maxTokens: '', inputUnset: true, reasoningMode: 'unset', levels: [], compatThinkingFormat: '', compatSupportsReasoningEffort: '', compatSupportsDeveloperRole: '' }
  // Missing boolean keys stay unset (undefined must not become false).
  assert.equal(buildEntry({ ...base }).compat, undefined)
  assert.deepEqual(buildEntry({ ...base, compatMaxTokensField: 'max_tokens' }).compat, { maxTokensField: 'max_tokens' })
  assert.deepEqual(buildEntry({ ...base, compatMaxTokensField: 'max_tokens', compatCacheControlFormat: 'anthropic' }).compat, { maxTokensField: 'max_tokens', cacheControlFormat: 'anthropic' })
  assert.deepEqual(buildEntry({ ...base, compatChatTemplateKwargs: '{"enable_thinking": true, "limit": 3}' }).compat, { chatTemplateKwargs: { enable_thinking: true, limit: 3 } })
  assert.deepEqual(buildEntry({ ...base, compatSupportsStore: 'true', compatRequiresToolResultName: 'false' }).compat, { supportsStore: true, requiresToolResultName: false })
})

test('entryToForm: full round-trip of a built entry', () => {
  const form = {
    id: 'gpt-5', name: 'GPT-5', contextWindow: '400000', maxTokens: '65536',
    inputUnset: false, inputText: true, inputImage: true,
    reasoningMode: 'levels', levels: [{ level: 'off', wire: '', on: true }, { level: 'high', wire: 'high', on: true }],
    compatThinkingFormat: 'chat-template', compatSupportsReasoningEffort: 'true', compatSupportsDeveloperRole: 'false',
    compatMaxTokensField: 'max_tokens', compatCacheControlFormat: 'anthropic',
    compatChatTemplateKwargs: '{"enable_thinking": true}',
    compatSupportsStore: 'true', compatSupportsUsageInStreaming: 'false',
  }
  const back = entryToForm(buildEntry(form))
  assert.equal(back.id, 'gpt-5')
  assert.equal(back.name, 'GPT-5')
  assert.equal(back.contextWindow, '400000')
  assert.equal(back.maxTokens, '65536')
  assert.equal(back.inputUnset, false)
  assert.equal(back.inputText, true)
  assert.equal(back.inputImage, true)
  assert.equal(back.reasoningMode, 'levels')
  assert.equal(back.levels.length, 2)
  assert.equal(back.compatThinkingFormat, 'chat-template')
  assert.equal(back.compatSupportsReasoningEffort, 'true')
  assert.equal(back.compatSupportsDeveloperRole, 'false')
  assert.equal(back.compatMaxTokensField, 'max_tokens')
  assert.equal(back.compatCacheControlFormat, 'anthropic')
  assert.equal(back.compatChatTemplateKwargs, '{\n  "enable_thinking": true\n}')
  assert.equal(back.compatSupportsStore, 'true')
  assert.equal(back.compatSupportsUsageInStreaming, 'false')
  assert.equal(back.compatSupportsTemperature, '')
})

test('entryToForm: absent fields map to unset states', () => {
  const back = entryToForm({ id: 'm' })
  assert.equal(back.inputUnset, true)
  assert.equal(back.reasoningMode, 'unset')
  assert.equal(back.compatThinkingFormat, '')
  assert.equal(back.compatSupportsReasoningEffort, '')
  assert.equal(back.compatSupportsDeveloperRole, '')
  assert.equal(back.compatMaxTokensField, '')
  assert.equal(back.compatCacheControlFormat, '')
  assert.equal(back.compatChatTemplateKwargs, '')
  assert.equal(back.compatSupportsStore, '')
  assert.equal(back.compatForceAdaptiveThinking, '')
})

test('entryToForm: reasoningEfforts false maps to off mode', () => {
  const back = entryToForm({ id: 'm', reasoningEfforts: false })
  assert.equal(back.reasoningMode, 'off')
})

test('modelSummary: renders known fields and dashes for empty entries', () => {
  const s = modelSummary({ id: 'm', name: 'M', contextWindow: 1000, maxTokens: 2000, input: ['text', 'image'], reasoningEfforts: { low: 'low' }, compat: { thinkingFormat: 'openai', supportsReasoningEffort: true, supportsDeveloperRole: false, maxTokensField: 'max_tokens', cacheControlFormat: 'anthropic', chatTemplateKwargs: { enable_thinking: true }, supportsStore: true } })
  assert.ok(s.includes('M'))
  assert.ok(s.includes('ctx 1000'))
  assert.ok(s.includes('out 2000'))
  assert.ok(s.includes('input: text+image'))
  assert.ok(s.includes('reasoning: low'))
  assert.ok(s.includes('tf: openai'))
  assert.ok(s.includes('sre: true'))
  assert.ok(s.includes('sdr: false'))
  assert.ok(s.includes('mtf: max_tokens'))
  assert.ok(s.includes('ccf: anthropic'))
  assert.ok(s.includes('ctk: 1'))
  assert.ok(s.includes('sw: 1'))
  assert.equal(modelSummary({ id: 'm' }), '—')
})
