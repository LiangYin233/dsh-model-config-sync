/**
 * Canonical reasoning-effort levels, reasoning-dispatch wire formats and
 * compat-profile value domains — the single source of truth for both plugin
 * halves.
 *
 * Imported by the host contract (src/host/contract.js), the client model
 * logic (src/client/model.ts) and verified against the standalone dynamic
 * host body (src/host/dynamic.js) by scripts/check-dynamic.mjs, so the three
 * copies can never drift silently. Copied to shared/thinking.js (package
 * root) by build.mjs for the shipped package — lib/contract.js imports it
 * via '../shared/thinking.js', which resolves to that root directory.
 *
 * The value domains mirror dsh-llm-pi-ai's settings schema (lib/index.js):
 *   - THINKING_FORMATS        ↔ SUPPORTED_THINKING_FORMATS
 *   - MAX_TOKENS_FIELDS       ↔ MAX_TOKENS_FIELDS
 *   - CACHE_CONTROL_FORMATS   ↔ CACHE_CONTROL_FORMATS
 *   - CHAT_TEMPLATE_VARS      ↔ CHAT_TEMPLATE_VARS
 *   - COMPAT_BOOLS            ↔ the boolean members of compatProfile
 *   - COMPAT_API_GROUPS       ↔ the offer gates in COMPAT_GATES
 */

/** Reasoning effort levels accepted in a profile's reasoningEfforts map. */
export const THINKING_LEVELS = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']

/** Reasoning-dispatch wire formats DSH (dsh-llm-pi-ai) accepts. */
export const THINKING_FORMATS = ['openai', 'deepseek', 'openrouter', 'together', 'zai', 'qwen', 'chat-template', 'qwen-chat-template', 'string-thinking', 'ant-ling']

/** Output-cap field spellings a profile may name (compat.maxTokensField). */
export const MAX_TOKENS_FIELDS = ['max_completion_tokens', 'max_tokens']

/** Prompt-cache marker conventions a profile may name (compat.cacheControlFormat). */
export const CACHE_CONTROL_FORMATS = ['anthropic']

/** Request-state placeholders chat_template_kwargs values may reference. */
export const CHAT_TEMPLATE_VARS = ['thinking.enabled', 'thinking.effort']

/**
 * Every boolean switch of the compat profile, in profile order. Shared by the
 * client form and the host whitelist validation; the wire protocols a field
 * belongs to are given by COMPAT_API_GROUPS.
 */
export const COMPAT_BOOLS = [
  'supportsStore',
  'supportsDeveloperRole',
  'supportsReasoningEffort',
  'supportsUsageInStreaming',
  'requiresToolResultName',
  'requiresAssistantAfterToolResult',
  'requiresThinkingAsText',
  'requiresReasoningContentOnAssistantMessages',
  'supportsStrictMode',
  'supportsLongCacheRetention',
  'supportsEagerToolInputStreaming',
  'supportsCacheControlOnTools',
  'supportsTemperature',
  'forceAdaptiveThinking',
  'allowEmptySignature',
  'supportsStrictTools',
]

/**
 * The compat fields a wire protocol offers, mirroring dsh-llm-pi-ai's
 * COMPAT_GATES offer lists (openai-responses also covers the azure/codex
 * variants; bedrock is not configurable from this plugin). The client shows
 * only the group of the target route's resolved api, so a switch its protocol
 * does not take can never be written (the adapter refuses such entries).
 */
export const COMPAT_API_GROUPS = {
  'openai-completions': [
    'supportsStore',
    'supportsDeveloperRole',
    'supportsReasoningEffort',
    'supportsUsageInStreaming',
    'maxTokensField',
    'requiresToolResultName',
    'requiresAssistantAfterToolResult',
    'requiresThinkingAsText',
    'requiresReasoningContentOnAssistantMessages',
    'thinkingFormat',
    'chatTemplateKwargs',
    'supportsStrictMode',
    'cacheControlFormat',
    'supportsLongCacheRetention',
  ],
  'openai-responses': [
    'supportsDeveloperRole',
    'supportsStrictMode',
    'supportsLongCacheRetention',
  ],
  'anthropic-messages': [
    'supportsEagerToolInputStreaming',
    'supportsLongCacheRetention',
    'supportsCacheControlOnTools',
    'supportsTemperature',
    'forceAdaptiveThinking',
    'allowEmptySignature',
    'supportsStrictTools',
  ],
}
