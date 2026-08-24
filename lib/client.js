window.__ModuleLoader__.load({ id: "dsh-provider-model-configurator", factory: (require) => { var module = { exports: {} }; var exports = module.exports; var React = require('react');
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/static.tsx
var static_exports = {};
__export(static_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(static_exports);

// src/shared/thinking.js
var THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
var THINKING_FORMATS = ["openai", "deepseek", "openrouter", "together", "zai", "qwen", "chat-template", "qwen-chat-template", "string-thinking", "ant-ling"];
var MAX_TOKENS_FIELDS = ["max_completion_tokens", "max_tokens"];
var CACHE_CONTROL_FORMATS = ["anthropic"];
var COMPAT_BOOLS = [
  "supportsStore",
  "supportsDeveloperRole",
  "supportsReasoningEffort",
  "supportsUsageInStreaming",
  "requiresToolResultName",
  "requiresAssistantAfterToolResult",
  "requiresThinkingAsText",
  "requiresReasoningContentOnAssistantMessages",
  "supportsStrictMode",
  "supportsLongCacheRetention",
  "supportsEagerToolInputStreaming",
  "supportsCacheControlOnTools",
  "supportsTemperature",
  "forceAdaptiveThinking",
  "allowEmptySignature",
  "supportsStrictTools"
];
var COMPAT_API_GROUPS = {
  "openai-completions": [
    "supportsStore",
    "supportsDeveloperRole",
    "supportsReasoningEffort",
    "supportsUsageInStreaming",
    "maxTokensField",
    "requiresToolResultName",
    "requiresAssistantAfterToolResult",
    "requiresThinkingAsText",
    "requiresReasoningContentOnAssistantMessages",
    "thinkingFormat",
    "chatTemplateKwargs",
    "supportsStrictMode",
    "cacheControlFormat",
    "supportsLongCacheRetention"
  ],
  "openai-responses": [
    "supportsDeveloperRole",
    "supportsStrictMode",
    "supportsLongCacheRetention"
  ],
  "anthropic-messages": [
    "supportsEagerToolInputStreaming",
    "supportsLongCacheRetention",
    "supportsCacheControlOnTools",
    "supportsTemperature",
    "forceAdaptiveThinking",
    "allowEmptySignature",
    "supportsStrictTools"
  ]
};

// src/host/contract.js
var schema = (parse) => ({ parse });
var stringSchema = schema((v) => {
  if (typeof v !== "string") throw new TypeError("expected a string");
  return v;
});
var booleanSchema = schema((v) => {
  if (typeof v !== "boolean") throw new TypeError("expected a boolean");
  return v;
});
var objectSchema = schema((v) => {
  if (v === null || typeof v !== "object" || Array.isArray(v)) throw new TypeError("expected an object");
  return v;
});
var stringArraySchema = schema((v) => {
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) throw new TypeError("expected an array of strings");
  return v;
});
var resultEnvelopeSchema = schema((v) => {
  if (v === null || typeof v !== "object" || typeof v.ok !== "boolean") throw new TypeError("expected an { ok, ... } envelope");
  return v;
});
var codec = (name2, sch) => ({ mode: "strict", typeSymbol: `dsh-provider-model-configurator#${name2}`, schema: sch });
var stringParam = (name2) => ({
  name: name2,
  wire: name2,
  source: "json",
  codec: codec("String", stringSchema)
});
var INVOCATIONS = [
  {
    id: "dsh-provider-model-configurator#modelConfigurator/presetProviders",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "presetProviders",
    invocation: { kind: "direct" },
    parameters: [],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#PresetProvidersResult", schema: resultEnvelopeSchema }
  },
  {
    id: "dsh-provider-model-configurator#modelConfigurator/presetModels",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "presetModels",
    invocation: { kind: "direct" },
    parameters: [stringParam("provider")],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#PresetModelsResult", schema: resultEnvelopeSchema }
  },
  {
    id: "dsh-provider-model-configurator#modelConfigurator/presetModelInfo",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "presetModelInfo",
    invocation: { kind: "direct" },
    parameters: [stringParam("provider"), stringParam("model")],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#PresetModelInfoResult", schema: resultEnvelopeSchema }
  },
  {
    id: "dsh-provider-model-configurator#modelConfigurator/targetProviders",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "targetProviders",
    invocation: { kind: "direct" },
    parameters: [],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#TargetProvidersResult", schema: resultEnvelopeSchema }
  },
  {
    id: "dsh-provider-model-configurator#modelConfigurator/applyModelConfig",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "applyModelConfig",
    invocation: { kind: "direct" },
    parameters: [
      stringParam("route"),
      { name: "entry", wire: "entry", source: "json", codec: codec("ModelEntry", objectSchema) },
      { name: "overwrite", wire: "overwrite", source: "json", codec: codec("Boolean", booleanSchema) },
      { name: "clearFields", wire: "clearFields", source: "json", codec: codec("StringArray", stringArraySchema) }
    ],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#ApplyModelConfigResult", schema: resultEnvelopeSchema }
  },
  {
    id: "dsh-provider-model-configurator#modelConfigurator/deleteModel",
    service: "modelConfigurator",
    namespace: "modelConfigurator",
    method: "deleteModel",
    invocation: { kind: "direct" },
    parameters: [stringParam("route"), stringParam("modelId")],
    result: { mode: "strict", typeSymbol: "dsh-provider-model-configurator#DeleteModelResult", schema: resultEnvelopeSchema }
  }
];

// src/client/model.ts
var THINKING_LEVELS2 = THINKING_LEVELS;
var THINKING_FORMATS2 = THINKING_FORMATS;
var COMPAT_BOOLEANS = COMPAT_BOOLS;
var compatBoolKey = (field) => "compat" + field[0].toUpperCase() + field.slice(1);
function buildEntry(form) {
  const e = { id: form.id.trim() };
  if (form.name && form.name.trim()) e.name = form.name.trim();
  const cw = Number(form.contextWindow);
  if (Number.isInteger(cw) && cw > 0) e.contextWindow = cw;
  const mt = Number(form.maxTokens);
  if (Number.isInteger(mt) && mt > 0) e.maxTokens = mt;
  if (!form.inputUnset) {
    const input = [];
    if (form.inputText) input.push("text");
    if (form.inputImage) input.push("image");
    if (input.length) e.input = input;
  }
  if (form.reasoningMode === "off") {
    e.reasoningEfforts = false;
  } else if (form.reasoningMode === "levels") {
    const efforts = {};
    for (const row of form.levels) {
      if (!row.on) continue;
      if (row.level === "off") {
        efforts.off = null;
        continue;
      }
      const wire = String(row.wire || "").trim();
      if (wire) efforts[row.level] = wire;
    }
    if (Object.keys(efforts).length) e.reasoningEfforts = efforts;
  }
  const compat = {};
  if (form.compatThinkingFormat) compat.thinkingFormat = form.compatThinkingFormat;
  if (form.compatMaxTokensField) compat.maxTokensField = form.compatMaxTokensField;
  if (form.compatCacheControlFormat) compat.cacheControlFormat = form.compatCacheControlFormat;
  const kwargsText = String(form.compatChatTemplateKwargs || "").trim();
  if (kwargsText) compat.chatTemplateKwargs = JSON.parse(kwargsText);
  for (const field of COMPAT_BOOLS) {
    const v = form[compatBoolKey(field)];
    if (v !== void 0 && v !== "") compat[field] = v === "true";
  }
  if (Object.keys(compat).length) e.compat = compat;
  return e;
}
function entryToForm(entry) {
  const input = Array.isArray(entry.input) ? entry.input : [];
  const re = entry.reasoningEfforts;
  const keys = re && typeof re === "object" && !Array.isArray(re) ? Object.keys(re) : [];
  const compat = entry.compat && typeof entry.compat === "object" && !Array.isArray(entry.compat) ? entry.compat : {};
  const out = {
    id: typeof entry.id === "string" ? entry.id : "",
    name: typeof entry.name === "string" ? entry.name : "",
    contextWindow: entry.contextWindow ? String(entry.contextWindow) : "",
    maxTokens: entry.maxTokens ? String(entry.maxTokens) : "",
    inputUnset: !Object.prototype.hasOwnProperty.call(entry, "input"),
    inputText: !input.length || input.indexOf("text") >= 0,
    inputImage: input.indexOf("image") >= 0,
    reasoningMode: re === false ? "off" : keys.length ? "levels" : "unset",
    levels: keys.map((level) => ({
      level,
      wire: level === "off" ? "" : typeof re[level] === "string" ? re[level] : "",
      on: true
    })),
    compatThinkingFormat: typeof compat.thinkingFormat === "string" ? compat.thinkingFormat : "",
    compatMaxTokensField: typeof compat.maxTokensField === "string" ? compat.maxTokensField : "",
    compatCacheControlFormat: typeof compat.cacheControlFormat === "string" ? compat.cacheControlFormat : "",
    compatChatTemplateKwargs: compat.chatTemplateKwargs && typeof compat.chatTemplateKwargs === "object" && !Array.isArray(compat.chatTemplateKwargs) ? JSON.stringify(compat.chatTemplateKwargs, null, 2) : ""
  };
  for (const field of COMPAT_BOOLS) {
    out[compatBoolKey(field)] = typeof compat[field] === "boolean" ? String(compat[field]) : "";
  }
  return out;
}
function modelSummary(entry) {
  const parts = [];
  if (typeof entry.name === "string" && entry.name && entry.name !== entry.id) parts.push(entry.name);
  if (entry.contextWindow) parts.push("ctx " + entry.contextWindow);
  if (entry.maxTokens) parts.push("out " + entry.maxTokens);
  if (Array.isArray(entry.input) && entry.input.length) parts.push("input: " + entry.input.join("+"));
  if (entry.reasoningEfforts && typeof entry.reasoningEfforts === "object" && !Array.isArray(entry.reasoningEfforts)) {
    const keys = Object.keys(entry.reasoningEfforts);
    if (keys.length) parts.push("reasoning: " + keys.join(","));
  }
  if (entry.compat && typeof entry.compat === "object" && !Array.isArray(entry.compat)) {
    const bits = [];
    if (typeof entry.compat.thinkingFormat === "string") bits.push("tf: " + entry.compat.thinkingFormat);
    if (typeof entry.compat.supportsDeveloperRole === "boolean") bits.push("sdr: " + entry.compat.supportsDeveloperRole);
    if (typeof entry.compat.supportsReasoningEffort === "boolean") bits.push("sre: " + entry.compat.supportsReasoningEffort);
    if (typeof entry.compat.maxTokensField === "string") bits.push("mtf: " + entry.compat.maxTokensField);
    if (typeof entry.compat.cacheControlFormat === "string") bits.push("ccf: " + entry.compat.cacheControlFormat);
    if (entry.compat.chatTemplateKwargs && typeof entry.compat.chatTemplateKwargs === "object" && !Array.isArray(entry.compat.chatTemplateKwargs)) {
      bits.push("ctk: " + Object.keys(entry.compat.chatTemplateKwargs).length);
    }
    const extra = COMPAT_BOOLS.filter((f) => f !== "supportsDeveloperRole" && f !== "supportsReasoningEffort" && typeof entry.compat[f] === "boolean").length;
    if (extra) bits.push("sw: " + extra);
    if (bits.length) parts.push("compat: " + bits.join(", "));
  }
  return parts.length ? parts.join(" · ") : "—";
}

// src/client/page.css
var page_default = "/* Provider Model Configurator — settings page styles.\r\n   Only --dsw-alias-* semantic tokens, so the page follows the system theme. */\r\n\r\n.mcfg-page {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n  max-width: 720px;\r\n  padding: 4px 2px 24px;\r\n  color: var(--dsw-alias-label-primary);\r\n}\r\n\r\n.mcfg-title {\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 16px;\r\n  font-weight: 500;\r\n  line-height: 24px;\r\n  margin: 0;\r\n}\r\n\r\n.mcfg-intro {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 14px;\r\n  line-height: 22px;\r\n  margin: 0;\r\n}\r\n\r\n.mcfg-card {\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 12px;\r\n  padding: 14px 16px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n}\r\n\r\n.mcfg-field {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.mcfg-label {\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-size: 12px;\r\n  line-height: 16px;\r\n}\r\n\r\n.mcfg-input {\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  height: 32px;\r\n  padding: 0 10px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-base);\r\n  color: var(--dsw-alias-label-primary);\r\n  font-family: inherit;\r\n  font-size: 13px;\r\n}\r\n\r\n.mcfg-input:focus {\r\n  outline: none;\r\n  border-color: var(--dsw-alias-brand-primary);\r\n}\r\n\r\n.mcfg-input:disabled {\r\n  opacity: 0.55;\r\n}\r\n\r\n.mcfg-selectInput {\r\n  appearance: auto;\r\n}\r\n\r\n/* JSON textarea for chat_template_kwargs (monospace, multi-line). */\r\n.mcfg-textarea {\r\n  height: auto;\r\n  min-height: 54px;\r\n  padding: 6px 10px;\r\n  resize: vertical;\r\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n}\r\n\r\n/* Compat options: semantic groups with a small title; every option is its\r\n   own bordered card — label + control vertically centered on one line, the\r\n   explanation below inside the same card, both kept inside the left edge. */\r\n.mcfg-compatGroup {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n  border-top: 1px solid var(--dsw-alias-border-l1);\r\n  padding-top: 10px;\r\n  margin-top: 8px;\r\n}\r\n\r\n.mcfg-compatGroupTitle {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 11px;\r\n  font-weight: 500;\r\n  line-height: 16px;\r\n  letter-spacing: 0.04em;\r\n}\r\n\r\n.mcfg-compatField {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  gap: 6px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 8px;\r\n  padding: 8px 10px;\r\n  background: var(--dsw-alias-bg-base);\r\n}\r\n\r\n/* Dark mode: the theme presenter marks <body data-ds-dark-theme>; cards get\r\n   the deeper surface layer instead of the base one. */\r\nbody[data-ds-dark-theme] .mcfg-compatField {\r\n  background: var(--dsw-alias-bg-layer-3);\r\n}\r\n\r\n.mcfg-compatTop {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.mcfg-compatLabel {\r\n  flex: 1;\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 13px;\r\n  line-height: 20px;\r\n}\r\n\r\n.mcfg-compatSelect {\r\n  width: 176px;\r\n  flex: none;\r\n}\r\n\r\n.mcfg-compatHint {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n  margin: 0;\r\n}\r\n\r\n.mcfg-shrink {\r\n  width: auto;\r\n  flex: none;\r\n}\r\n\r\n.mcfg-row {\r\n  display: flex;\r\n  flex-direction: row;\r\n  gap: 8px;\r\n  align-items: center;\r\n}\r\n\r\n.mcfg-hint {\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n  margin: 0;\r\n}\r\n\r\n.mcfg-note {\r\n  color: var(--dsw-alias-state-warn-primary);\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n  margin: 0;\r\n}\r\n\r\n/* Model-id input with action buttons (copy / delete / new). */\r\n.mcfg-idWrap {\r\n  display: flex;\r\n  gap: 6px;\r\n}\r\n\r\n.mcfg-idInput {\r\n  flex: 1;\r\n}\r\n\r\n/* Model combobox: the id input with its dropdown list. */\r\n.mcfg-pickerWrap {\r\n  position: relative;\r\n}\r\n\r\n.mcfg-picker {\r\n  position: absolute;\r\n  top: calc(100% + 4px);\r\n  left: 0;\r\n  right: 0;\r\n  z-index: 30;\r\n  display: flex;\r\n  flex-direction: column;\r\n  max-height: 280px;\r\n  overflow-y: auto;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 8px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);\r\n}\r\n\r\n.mcfg-pickerItem {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 2px;\r\n  padding: 6px 10px;\r\n  cursor: pointer;\r\n}\r\n\r\n.mcfg-pickerItem:hover,\r\n.mcfg-pickerActive {\r\n  background: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-layer-1));\r\n}\r\n\r\n.mcfg-pickerId {\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 13px;\r\n  line-height: 18px;\r\n}\r\n\r\n.mcfg-pickerSummary {\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 11px;\r\n  line-height: 16px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.mcfg-pickerEmpty {\r\n  padding: 8px 10px;\r\n  color: var(--dsw-alias-label-tertiary);\r\n  font-size: 12px;\r\n}\r\n\r\n.mcfg-btn {\r\n  box-sizing: border-box;\r\n  height: 32px;\r\n  padding: 0 14px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-base);\r\n  color: var(--dsw-alias-label-primary);\r\n  font-family: inherit;\r\n  font-size: 13px;\r\n  cursor: pointer;\r\n}\r\n\r\n.mcfg-btn:hover {\r\n  background: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-layer-1));\r\n}\r\n\r\n.mcfg-btnPrimary {\r\n  box-sizing: border-box;\r\n  height: 32px;\r\n  padding: 0 16px;\r\n  border-radius: 8px;\r\n  border: none;\r\n  background: var(--dsw-alias-button-primary-fill);\r\n  color: var(--dsw-alias-label-primary-foreground);\r\n  font-family: inherit;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n}\r\n\r\n.mcfg-btnPrimary:hover:not(:disabled) {\r\n  background: var(--dsw-alias-button-primary-hover);\r\n}\r\n\r\n.mcfg-btnPrimary:disabled {\r\n  opacity: 0.5;\r\n  cursor: default;\r\n}\r\n\r\n.mcfg-check {\r\n  display: flex;\r\n  flex-direction: row;\r\n  gap: 8px;\r\n  align-items: center;\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 13px;\r\n  cursor: pointer;\r\n}\r\n\r\n.mcfg-statusOk {\r\n  color: var(--dsw-alias-state-success-primary);\r\n  font-size: 13px;\r\n  line-height: 20px;\r\n  margin: 0;\r\n}\r\n\r\n.mcfg-statusErr {\r\n  color: var(--dsw-alias-state-error-primary);\r\n  font-size: 13px;\r\n  line-height: 20px;\r\n  margin: 0;\r\n}\r\n";

// src/client/locales/zh.json
var zh_default = {
  nav: "模型 Pro",
  title: "模型 Pro",
  intro: "集中管理各提供商的模型条目:新建、编辑、复制与删除,配置上下文窗口、最大输出、输入模态、推理档位与兼容选项;点击模型 ID 输入框可从现有模型中选择,输入时前缀筛选。",
  readOnly: "当前设置为只读,无法写入。",
  remotePending: "远程服务尚未就绪,请稍候…",
  customTag: "自定义",
  targetRoute: "目标提供商(点击输入框选择,输入时前缀筛选)",
  targetRoutePlaceholder: "选择已配置的提供商",
  targetModels: "模型 ID(点击输入框选择模型,输入时前缀筛选;或直接输入新 ID)",
  createModel: "新建",
  copyModel: "复制",
  pickerEmpty: "无匹配模型",
  copyNoEntry: "未找到要复制的模型配置(该模型可能仅在目录中,请先应用配置使其成为显式条目)。",
  deleteNoEntry: "未找到要删除的模型。",
  deleteModel: "删除",
  deleteConfirm: "确定删除模型「{model}」吗?此操作会立即写入设置。",
  statusDeleted: "已删除模型 {model}(提供商 {route} 剩余 {count} 个模型)",
  statusDeletedCatalog: "已删除模型 {model};该提供商已恢复使用内置目录。",
  catalogRouteNote: "该提供商当前使用内置目录;应用后会自动转为显式模型列表,并保留全部目录模型。",
  overridesNote: "该提供商带有模型覆盖(modelOverrides);应用时会自动将其合并进显式模型列表,不会丢失。",
  emptyTargets: "暂无已配置的提供商。请先在 Models 页配置提供商(可新建自定义提供商)。",
  entryId: "模型 ID",
  entryName: "显示名称",
  contextWindowField: "上下文窗口 (tokens)",
  maxTokensField: "最大输出 (tokens)",
  inputField: "输入模态",
  inputUnset: "继承目录(未设置)",
  reasoningField: "推理档位",
  reasoningModeUnset: "未设置(继承目录)",
  reasoningModeLevels: "启用推理(按档位)",
  reasoningModeOff: "非推理模型(reasoningEfforts: false)",
  compatField: "兼容选项 (compat)",
  compatThinkingFormat: "推理参数格式 (thinkingFormat)",
  compatMaxTokensField: "输出上限字段 (maxTokensField)",
  compatCacheControlFormat: "提示缓存标记 (cacheControlFormat)",
  compatChatTemplateKwargs: "模板参数 chat_template_kwargs (JSON)",
  kwargsInvalid: 'chat_template_kwargs 必须是合法的 JSON 对象(值允许 string / number / boolean / null 或 {"$var": "thinking.enabled|thinking.effort", "omitWhenOff": true})。',
  compatApiUnknown: "该提供商未显式声明 api,兼容字段按 openai-completions 显示;若网关为其他协议,请在 Models 页配置 api。",
  compatBoolSupportsStore: "接受 store 参数 (supportsStore)",
  compatBoolSupportsDeveloperRole: "系统提示词用 developer 角色 (supportsDeveloperRole)",
  compatBoolSupportsReasoningEffort: "接受 reasoning_effort (supportsReasoningEffort)",
  compatBoolSupportsUsageInStreaming: "流式 include_usage (supportsUsageInStreaming)",
  compatBoolRequiresToolResultName: "工具结果须带 name (requiresToolResultName)",
  compatBoolRequiresAssistantAfterToolResult: "工具结果后须插 assistant 消息 (requiresAssistantAfterToolResult)",
  compatBoolRequiresThinkingAsText: "思考块以 <thinking> 文本传输 (requiresThinkingAsText)",
  compatBoolRequiresReasoningContentOnAssistantMessages: "回放 assistant 消息带空 reasoning_content (requiresReasoningContentOnAssistantMessages)",
  compatBoolSupportsStrictMode: "工具定义 strict (supportsStrictMode)",
  compatBoolSupportsLongCacheRetention: "长缓存保留 (supportsLongCacheRetention)",
  compatBoolSupportsEagerToolInputStreaming: "工具流 eager 输入 (supportsEagerToolInputStreaming)",
  compatBoolSupportsCacheControlOnTools: "工具定义 cache_control (supportsCacheControlOnTools)",
  compatBoolSupportsTemperature: "接受 temperature (supportsTemperature)",
  compatBoolForceAdaptiveThinking: "强制自适应思考 (forceAdaptiveThinking)",
  compatBoolAllowEmptySignature: "回放空 thinking 签名 (allowEmptySignature)",
  compatBoolSupportsStrictTools: "Anthropic strict 工具 (supportsStrictTools)",
  compatHintThinkingFormat: "推理档位/思考开关的请求参数写法,须与网关要求的字段拼写对应;未知网关默认 openai(reasoning_effort)。",
  compatHintMaxTokensField: "输出上限字段名:max_completion_tokens(OpenAI 官方)或 max_tokens(部分网关不认前者时改用)。",
  compatHintCacheControlFormat: "提示缓存标记约定;anthropic 表示按 Anthropic 缓存风格标记。",
  compatHintChatTemplateKwargs: 'JSON 对象:值可为 string / number / boolean / null 或 { "$var": "thinking.enabled|thinking.effort", "omitWhenOff": true }。',
  compatHintSupportsStore: "是否接受 OpenAI 官方的 store 请求参数;false 时 pi-ai 不会发送该字段。",
  compatHintSupportsDeveloperRole: "推理模型的系统提示词使用 developer 角色;设为 false 强制退回 system(网关报 400: expected one of system… 时设置)。",
  compatHintSupportsReasoningEffort: "是否接受 reasoning_effort 请求参数;false 时只发思考开关,不附档位值。",
  compatHintSupportsUsageInStreaming: "流式响应是否接受 stream_options: { include_usage: true };false 后流式不返回用量统计。",
  compatHintRequiresToolResultName: "工具结果消息是否必须带 name 字段;部分网关缺它报 400。",
  compatHintRequiresAssistantAfterToolResult: "工具结果后紧跟用户消息时,是否需先插入一条空的 assistant 消息。",
  compatHintRequiresThinkingAsText: "思考块是否必须以 <thinking>…</thinking> 文本形式传输;false 走结构化字段。",
  compatHintRequiresReasoningContentOnAssistantMessages: "推理开启时,回放的 assistant 消息是否需带空的 reasoning_content(deepseek 系默认需要)。",
  compatHintSupportsStrictMode: "工具定义是否接受 strict 字段。",
  compatHintSupportsLongCacheRetention: "是否接受长缓存保留设置。",
  compatHintSupportsEagerToolInputStreaming: "工具输入流是否支持 eager 模式(anthropic-messages)。",
  compatHintSupportsCacheControlOnTools: "工具定义上是否接受 cache_control 缓存标记(anthropic-messages)。",
  compatHintSupportsTemperature: "请求是否接受 temperature 参数(anthropic-messages)。",
  compatHintForceAdaptiveThinking: "是否无视模型 ID 强制启用自适应思考(anthropic-messages)。",
  compatHintAllowEmptySignature: "是否回放空的 thinking 签名,而非把思考转成文本(anthropic-messages)。",
  compatHintSupportsStrictTools: "是否接受 Anthropic strict 工具 schema(anthropic-messages)。",
  compatUnset: "未设置",
  compatHint: "各开关未设置时继承目录值,再按 baseURL 自动检测。",
  compatGroupThinking: "思考与推理分发",
  compatGroupRequest: "请求字段与协议",
  compatGroupTools: "工具与消息",
  reasoningHint: "wire 值即请求发送的 reasoning_effort 参数。档位名与网关取值不一致时请按来源模型实际情况修改(如 deepseek 系列的 minimal/low/medium 常留空);off 留空表示不发送。",
  addLevel: "添加档位",
  removeLevel: "移除",
  wirePlaceholder: "wire 值(如 high)",
  wireOffHint: "off:不发送",
  overwriteConfirm: "模型 {model} 已存在于目标提供商,确定覆盖吗?",
  apply: "应用配置",
  applying: "应用中…",
  statusOk: "已应用:模型 {model} 已写入提供商 {route}(共 {count} 个模型)。Models 页将自动刷新。",
  reasonEmpty: "推理档位为空:请至少勾选一个非 off 档位,或选择「非推理模型」。",
  dupLevel: "推理档位重复:「{level}」只能出现一次。",
  wireRequired: "档位「{level}」需要填写 wire 值,或取消勾选该档位。",
  needId: "请输入模型 ID。",
  needTarget: "请先选择目标提供商。"
};

// src/client/locales/en.json
var en_default = {
  nav: "Model Pro",
  title: "Model Pro",
  intro: "Manage model entries across your providers in one place: create, edit, copy and delete, with context window, max output, modalities, reasoning efforts and compatibility switches; click the model id input to pick an existing model, type to prefix-filter.",
  readOnly: "Settings are read-only; writes are disabled.",
  remotePending: "Remote service is not ready yet…",
  customTag: "custom",
  targetRoute: "Target provider (click the input to pick one, type to prefix-filter)",
  targetRoutePlaceholder: "Choose a configured provider",
  targetModels: "Model id (click the input to pick a model, type to prefix-filter; or type a new id)",
  createModel: "New",
  copyModel: "Copy",
  pickerEmpty: "No matching model",
  copyNoEntry: "No configuration to copy (the model may be catalog-only; apply it first to make it an explicit entry).",
  deleteNoEntry: "No such model to delete.",
  deleteModel: "Delete",
  deleteConfirm: 'Delete model "{model}"? This writes to settings immediately.',
  statusDeleted: "Deleted model {model} from provider {route} ({count} models left).",
  statusDeletedCatalog: "Deleted model {model}; the provider now serves the built-in catalog again.",
  catalogRouteNote: "This provider currently serves the built-in catalog; applying converts it to an explicit model list keeping every catalog model.",
  overridesNote: "This provider carries model overrides (modelOverrides); applying folds them into the explicit model list without loss.",
  emptyTargets: "No configured providers yet. Configure one on the Models page first (custom providers can be created there).",
  entryId: "Model id",
  entryName: "Display name",
  contextWindowField: "Context window (tokens)",
  maxTokensField: "Max output (tokens)",
  inputField: "Modalities",
  inputUnset: "Inherit catalog (unset)",
  reasoningField: "Reasoning efforts",
  reasoningModeUnset: "Unset (inherit catalog)",
  reasoningModeLevels: "Reasoning (per level)",
  reasoningModeOff: "Non-reasoning model (reasoningEfforts: false)",
  compatField: "Compatibility (compat)",
  compatThinkingFormat: "Reasoning wire format (thinkingFormat)",
  compatMaxTokensField: "Output cap field (maxTokensField)",
  compatCacheControlFormat: "Prompt-cache marker (cacheControlFormat)",
  compatChatTemplateKwargs: "Template kwargs chat_template_kwargs (JSON)",
  kwargsInvalid: 'chat_template_kwargs must be a valid JSON object (values: string / number / boolean / null, or {"$var": "thinking.enabled|thinking.effort", "omitWhenOff": true}).',
  compatApiUnknown: "This provider declares no api; compat fields are shown for openai-completions. Configure api on the Models page for other protocols.",
  compatBoolSupportsStore: "Accepts store (supportsStore)",
  compatBoolSupportsDeveloperRole: "System prompt uses developer role (supportsDeveloperRole)",
  compatBoolSupportsReasoningEffort: "Accepts reasoning_effort (supportsReasoningEffort)",
  compatBoolSupportsUsageInStreaming: "Streaming include_usage (supportsUsageInStreaming)",
  compatBoolRequiresToolResultName: "Tool results must carry name (requiresToolResultName)",
  compatBoolRequiresAssistantAfterToolResult: "Insert assistant message after tool results (requiresAssistantAfterToolResult)",
  compatBoolRequiresThinkingAsText: "Thinking as <thinking> text (requiresThinkingAsText)",
  compatBoolRequiresReasoningContentOnAssistantMessages: "Replayed assistant messages need empty reasoning_content (requiresReasoningContentOnAssistantMessages)",
  compatBoolSupportsStrictMode: "Strict tool definitions (supportsStrictMode)",
  compatBoolSupportsLongCacheRetention: "Long cache retention (supportsLongCacheRetention)",
  compatBoolSupportsEagerToolInputStreaming: "Eager tool input streaming (supportsEagerToolInputStreaming)",
  compatBoolSupportsCacheControlOnTools: "cache_control on tool definitions (supportsCacheControlOnTools)",
  compatBoolSupportsTemperature: "Accepts temperature (supportsTemperature)",
  compatBoolForceAdaptiveThinking: "Force adaptive thinking (forceAdaptiveThinking)",
  compatBoolAllowEmptySignature: "Replay empty thinking signature (allowEmptySignature)",
  compatBoolSupportsStrictTools: "Anthropic strict tools (supportsStrictTools)",
  compatHintThinkingFormat: "How the reasoning effort / thinking switch is spelled on the wire; match the gateway's expected fields (unknown gateways default to openai = reasoning_effort).",
  compatHintMaxTokensField: "The output-cap field name: max_completion_tokens (OpenAI official) or max_tokens (when the gateway rejects the former).",
  compatHintCacheControlFormat: "The prompt-cache marker convention; anthropic marks cache in Anthropic style.",
  compatHintChatTemplateKwargs: 'A JSON object: values are string / number / boolean / null, or { "$var": "thinking.enabled|thinking.effort", "omitWhenOff": true }.',
  compatHintSupportsStore: "Whether the OpenAI store request parameter is accepted; false means pi-ai never sends it.",
  compatHintSupportsDeveloperRole: "Reasoning models get the system prompt as developer; false forces system (set when the gateway 400s with expected one of system...).",
  compatHintSupportsReasoningEffort: "Whether the reasoning_effort request parameter is accepted; false sends the thinking switch only, without an effort value.",
  compatHintSupportsUsageInStreaming: "Whether streaming accepts stream_options: { include_usage: true }; false drops usage stats from streams.",
  compatHintRequiresToolResultName: "Whether tool result messages must carry name; some gateways 400 without it.",
  compatHintRequiresAssistantAfterToolResult: "Whether an empty assistant message must bridge a user message right after a tool result.",
  compatHintRequiresThinkingAsText: "Whether thinking blocks must travel as <thinking>...</thinking> text; false uses the structured field.",
  compatHintRequiresReasoningContentOnAssistantMessages: "Whether replayed assistant messages need an empty reasoning_content while reasoning is on (deepseek-family needs it).",
  compatHintSupportsStrictMode: "Whether tool definitions accept the strict field.",
  compatHintSupportsLongCacheRetention: "Whether long prompt-cache retention is accepted.",
  compatHintSupportsEagerToolInputStreaming: "Whether tool input streaming supports eager mode (anthropic-messages).",
  compatHintSupportsCacheControlOnTools: "Whether tool definitions accept cache_control markers (anthropic-messages).",
  compatHintSupportsTemperature: "Whether the temperature request field is accepted (anthropic-messages).",
  compatHintForceAdaptiveThinking: "Whether adaptive thinking is forced regardless of the model id (anthropic-messages).",
  compatHintAllowEmptySignature: "Whether to replay an empty thinking signature instead of converting thinking to text (anthropic-messages).",
  compatHintSupportsStrictTools: "Whether Anthropic strict tool schemas are accepted (anthropic-messages).",
  compatUnset: "Unset",
  compatHint: "Unset switches inherit the catalog value, then baseURL-derived detection.",
  compatGroupThinking: "Thinking & reasoning dispatch",
  compatGroupRequest: "Request fields & protocol",
  compatGroupTools: "Tools & messages",
  reasoningHint: "wire is the reasoning_effort value sent on the wire. Adjust it when the gateway differs from the level name (e.g. deepseek-family minimal/low/medium are often empty); off with empty wire sends nothing.",
  addLevel: "Add level",
  removeLevel: "Remove",
  wirePlaceholder: "wire value (e.g. high)",
  wireOffHint: "off: send nothing",
  overwriteConfirm: "Model {model} already exists on the target provider. Overwrite it?",
  apply: "Apply configuration",
  applying: "Applying…",
  statusOk: "Applied: model {model} written to provider {route} ({count} models total). The Models page refreshes automatically.",
  reasonEmpty: "Reasoning efforts empty: check at least one non-off level, or choose non-reasoning.",
  dupLevel: 'Duplicate reasoning level: "{level}" may only appear once.',
  wireRequired: 'Level "{level}" needs a wire value; fill it in or uncheck the level.',
  needId: "Enter a model id.",
  needTarget: "Choose a target provider first."
};

// src/client/page.tsx
var zh = zh_default;
var en = en_default;
var COMPAT_GROUPS = [
  {
    titleKey: "compatGroupThinking",
    fields: [
      "thinkingFormat",
      "chatTemplateKwargs",
      "supportsReasoningEffort",
      "supportsDeveloperRole",
      "requiresThinkingAsText",
      "requiresReasoningContentOnAssistantMessages",
      "supportsUsageInStreaming"
    ]
  },
  {
    titleKey: "compatGroupRequest",
    fields: ["maxTokensField", "supportsStore", "supportsTemperature", "supportsStrictMode", "cacheControlFormat", "supportsLongCacheRetention"]
  },
  {
    titleKey: "compatGroupTools",
    fields: ["requiresToolResultName", "requiresAssistantAfterToolResult", "supportsEagerToolInputStreaming", "supportsCacheControlOnTools", "supportsStrictTools", "allowEmptySignature", "forceAdaptiveThinking"]
  }
];
var COMPAT_FORM_KEYS = [
  "compatThinkingFormat",
  "compatMaxTokensField",
  "compatCacheControlFormat",
  "compatChatTemplateKwargs",
  ...COMPAT_BOOLEANS.map(compatBoolKey)
];
function emptyForm() {
  const bools = {};
  for (const f of COMPAT_BOOLEANS) bools[compatBoolKey(f)] = "";
  return {
    id: "",
    name: "",
    contextWindow: "",
    maxTokens: "",
    inputUnset: true,
    inputText: true,
    inputImage: false,
    reasoningMode: "unset",
    levels: [],
    compatThinkingFormat: "",
    compatMaxTokensField: "",
    compatCacheControlFormat: "",
    compatChatTemplateKwargs: "",
    ...bools
  };
}
function PickerInput(props) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const inputRef = React.useRef(null);
  const query = props.value.trim().toLowerCase();
  const filtered = query ? props.items.filter((it) => it.title.toLowerCase().startsWith(query) || it.key.toLowerCase().startsWith(query)) : props.items;
  React.useEffect(() => {
    setIndex((i) => filtered.length ? Math.min(i, filtered.length - 1) : 0);
  }, [filtered.length]);
  const confirm = (it) => {
    props.onConfirm(it);
    setOpen(false);
    inputRef.current?.blur();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "mcfg-pickerWrap", style: { flex: "1" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      ref: inputRef,
      className: "mcfg-input mcfg-idInput",
      value: props.value,
      placeholder: props.placeholder,
      onChange: (e) => {
        props.onChange(e.target.value);
        setIndex(0);
        setOpen(true);
      },
      onFocus: () => {
        setIndex(0);
        setOpen(true);
      },
      onClick: () => setOpen(true),
      onBlur: () => setOpen(false),
      onKeyDown: (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setIndex((i) => Math.min(i + 1, filtered.length - 1));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setIndex((i) => Math.max(i - 1, 0));
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          if (filtered.length && index >= 0) confirm(filtered[index]);
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
        }
      }
    }
  ), open ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-picker", role: "listbox", "aria-label": props.ariaLabel }, filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-pickerEmpty" }, props.emptyText) : filtered.map((it, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: it.key,
      className: "mcfg-pickerItem" + (i === index ? " mcfg-pickerActive" : ""),
      role: "option",
      "aria-selected": i === index,
      onMouseDown: (e) => e.preventDefault(),
      onMouseEnter: () => setIndex(i),
      onClick: () => confirm(it)
    },
    /* @__PURE__ */ React.createElement("div", { className: "mcfg-pickerId" }, it.title),
    it.sub ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-pickerSummary" }, it.sub) : null
  ))) : null);
}
function ModelConfiguratorPage(props) {
  const { t, call } = props;
  const [boot, setBoot] = React.useState({ targets: [], writable: true, error: "" });
  const [targetRoute, setTargetRoute] = React.useState("");
  const [routeText, setRouteText] = React.useState("");
  const [form, setForm] = React.useState(emptyForm);
  const [loadedEntryId, setLoadedEntryId] = React.useState("");
  const [mode, setMode] = React.useState("none");
  const [deleting, setDeleting] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const fail = (err) => setStatus({ kind: "err", text: err?.message || String(err) });
  const refresh = async () => {
    const b = await call("target-providers");
    if (b && b.ok === true) setBoot((x) => ({ ...x, targets: b.providers, writable: b.writable !== false }));
  };
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const b = await call("target-providers");
        if (!alive) return;
        setBoot({
          targets: b.ok === true ? b.providers : [],
          writable: b.ok === true ? b.writable !== false : true,
          error: b.ok === true ? "" : b.error || "target-providers failed"
        });
      } catch (err) {
        if (alive) setBoot((x) => ({ ...x, error: err?.message || String(err) }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  const target = boot.targets.find((x) => x.provider === targetRoute) || null;
  const targetModelIds = target ? [.../* @__PURE__ */ new Set([...target.models || [], ...target.catalogModels || []])] : [];
  const exists = targetModelIds.indexOf(form.id.trim()) >= 0;
  const targetApi = target && typeof target.api === "string" && target.api ? target.api : "";
  const apiForCompat = targetApi || "openai-completions";
  const compatGroup = COMPAT_API_GROUPS[apiForCompat] || COMPAT_API_GROUPS["openai-completions"];
  const pickerAll = target ? [
    ...target.entries.map((e) => ({ id: String(e && e.id), entry: e })),
    ...target.catalogModels.filter((id) => !target.entries.some((e) => e && e.id === id)).map((id) => ({ id, entry: null }))
  ] : [];
  const pickerItems = pickerAll.map((m) => ({
    key: m.id,
    title: m.id,
    sub: m.entry ? modelSummary(m.entry) : void 0,
    raw: m
  }));
  const routeItems = boot.targets.map((x) => ({
    key: x.provider,
    title: x.displayName,
    sub: x.provider + (x.declared ? " · " + t("customTag") : ""),
    raw: x
  }));
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const setLevel = (index, patch) => setForm((f) => ({
    ...f,
    levels: f.levels.map((row, i) => i === index ? { ...row, ...patch } : row)
  }));
  const removeLevel = (index) => setForm((f) => ({ ...f, levels: f.levels.filter((_, i) => i !== index) }));
  const addLevel = () => setForm((f) => {
    const used = new Set(f.levels.map((r) => r.level));
    const next = THINKING_LEVELS2.find((l) => !used.has(l)) || "low";
    return { ...f, levels: [...f.levels, { level: next, wire: "", on: true }] };
  });
  const allLevelsUsed = new Set(form.levels.map((r) => r.level)).size >= THINKING_LEVELS2.length;
  const loadEntry = (entry) => {
    setForm(entryToForm(entry));
    setLoadedEntryId(entry.id);
    setMode("editing");
    setStatus(null);
  };
  const confirmPickerItem = (item) => {
    const m = item.raw;
    if (!m) return;
    const entry = (target?.entries || []).find((e) => e && e.id === m.id) || null;
    if (entry) {
      loadEntry(entry);
    } else {
      const next = emptyForm();
      setForm({ ...next, id: m.id });
      setLoadedEntryId("");
      setMode("editing");
      setStatus(null);
    }
  };
  const confirmRoute = (item) => {
    const x = item.raw;
    if (!x) return;
    setTargetRoute(x.provider);
    setRouteText(x.displayName);
    setLoadedEntryId("");
    setForm(emptyForm());
    setMode("none");
    setStatus(null);
  };
  const onIdInput = (value) => {
    set({ id: value });
    if (mode === "editing") setMode("none");
    setStatus(null);
  };
  const onRouteInput = (value) => {
    setRouteText(value);
    if (targetRoute) setTargetRoute("");
    setStatus(null);
  };
  const onNew = () => {
    const id = form.id.trim();
    if (!id) {
      setStatus({ kind: "err", text: t("needId") });
      return;
    }
    setForm((f) => ({ ...f, name: id }));
    setLoadedEntryId("");
    setMode("creating");
    setStatus(null);
  };
  const onCopy = () => {
    const id = form.id.trim();
    const entry = (target?.entries || []).find((e) => e && e.id === id);
    if (!entry) {
      setStatus({ kind: "err", text: t("copyNoEntry") });
      return;
    }
    let suffix = 2;
    let newId = id + "-copy";
    while (targetModelIds.indexOf(newId) >= 0) {
      newId = id + "-copy" + suffix;
      suffix++;
    }
    const f = entryToForm(entry);
    setForm({ ...f, id: newId, name: typeof f.name === "string" && f.name ? f.name + " (copy)" : newId });
    setLoadedEntryId("");
    setMode("creating");
    setStatus(null);
  };
  const onDelete = () => {
    const id = form.id.trim();
    if (targetModelIds.indexOf(id) < 0) {
      setStatus({ kind: "err", text: t("deleteNoEntry") });
      return;
    }
    removeModel(id);
  };
  const removeModel = async (modelId) => {
    if (deleting || !window.confirm(t("deleteConfirm").replace("{model}", modelId))) return;
    setDeleting(true);
    setStatus(null);
    try {
      const r = await call("delete-model", { route: targetRoute, modelId });
      if (!r || r.ok !== true) {
        setStatus({ kind: "err", text: r && r.error || "删除失败" });
        return;
      }
      setStatus({ kind: "ok", text: (r.revertedToCatalog === true ? t("statusDeletedCatalog") : t("statusDeleted")).replace("{model}", r.model).replace("{route}", r.route).replace("{count}", String(r.count)) });
      setForm(emptyForm());
      setLoadedEntryId("");
      setMode("none");
      await refresh();
    } catch (err) {
      fail(err);
    } finally {
      setDeleting(false);
    }
  };
  const apply2 = async () => {
    const id = form.id.trim();
    if (!targetRoute) {
      setStatus({ kind: "err", text: t("needTarget") });
      return;
    }
    if (!id) {
      setStatus({ kind: "err", text: t("needId") });
      return;
    }
    if (exists && !window.confirm(t("overwriteConfirm").replace("{model}", id))) {
      setStatus(null);
      return;
    }
    if (form.reasoningMode === "levels") {
      const seen = /* @__PURE__ */ new Set();
      for (const row of form.levels) {
        if (row.on !== true) continue;
        if (seen.has(row.level)) {
          setStatus({ kind: "err", text: t("dupLevel").replace("{level}", row.level) });
          return;
        }
        seen.add(row.level);
      }
      const emptyWire = form.levels.find((row) => row.on === true && row.level !== "off" && !String(row.wire || "").trim());
      if (emptyWire) {
        setStatus({ kind: "err", text: t("wireRequired").replace("{level}", emptyWire.level) });
        return;
      }
    }
    const kwargsText = String(form.compatChatTemplateKwargs || "").trim();
    if (kwargsText) {
      let parsed;
      try {
        parsed = JSON.parse(kwargsText);
      } catch {
        setStatus({ kind: "err", text: t("kwargsInvalid") });
        return;
      }
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
        setStatus({ kind: "err", text: t("kwargsInvalid") });
        return;
      }
    }
    const entry = buildEntry(form);
    if (form.reasoningMode === "levels" && !entry.reasoningEfforts) {
      setStatus({ kind: "err", text: t("reasonEmpty") });
      return;
    }
    const clearFields = [];
    if (!form.name.trim()) clearFields.push("name");
    if (!form.contextWindow.trim()) clearFields.push("contextWindow");
    if (!form.maxTokens.trim()) clearFields.push("maxTokens");
    if (form.inputUnset || !form.inputText && !form.inputImage) clearFields.push("input");
    if (form.reasoningMode === "unset") clearFields.push("reasoningEfforts");
    if (COMPAT_FORM_KEYS.every((k) => form[k] === "" || form[k] == null)) clearFields.push("compat");
    setBusy(true);
    setStatus(null);
    try {
      const r = await call("apply-model-config", { route: targetRoute, entry, overwrite: true, clearFields });
      if (!r || r.ok !== true) {
        setStatus({ kind: "err", text: r && r.error || "应用失败" });
        return;
      }
      setStatus({ kind: "ok", text: t("statusOk").replace("{model}", r.model).replace("{route}", r.route).replace("{count}", String(r.count)) });
      await refresh();
    } catch (err) {
      fail(err);
    } finally {
      setBusy(false);
    }
  };
  const compatField = (field, control) => {
    const cap = field[0].toUpperCase() + field.slice(1);
    return /* @__PURE__ */ React.createElement("div", { className: "mcfg-compatField", key: field }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-compatTop" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-compatLabel" }, field === "thinkingFormat" ? t("compatThinkingFormat") : field === "maxTokensField" ? t("compatMaxTokensField") : field === "cacheControlFormat" ? t("compatCacheControlFormat") : t("compatBool" + cap)), control), /* @__PURE__ */ React.createElement("p", { className: "mcfg-compatHint" }, t("compatHint" + cap)));
  };
  const compatBoolSelect = (field) => {
    const key = compatBoolKey(field);
    return /* @__PURE__ */ React.createElement("select", { className: "mcfg-input mcfg-selectInput mcfg-compatSelect", value: form[key], onChange: (e) => set({ [key]: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, t("compatUnset")), /* @__PURE__ */ React.createElement("option", { value: "true" }, "true"), /* @__PURE__ */ React.createElement("option", { value: "false" }, "false"));
  };
  const compatEnumSelect = (field) => {
    const key = field === "thinkingFormat" ? "compatThinkingFormat" : field === "maxTokensField" ? "compatMaxTokensField" : "compatCacheControlFormat";
    const options = field === "thinkingFormat" ? THINKING_FORMATS2 : field === "maxTokensField" ? MAX_TOKENS_FIELDS : CACHE_CONTROL_FORMATS;
    return /* @__PURE__ */ React.createElement("select", { className: "mcfg-input mcfg-selectInput mcfg-compatSelect", value: form[key], onChange: (e) => set({ [key]: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, t("compatUnset")), options.map((f) => /* @__PURE__ */ React.createElement("option", { key: f, value: f }, f)));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "mcfg-page" }, /* @__PURE__ */ React.createElement("h2", { className: "mcfg-title" }, t("title")), /* @__PURE__ */ React.createElement("p", { className: "mcfg-intro" }, t("intro")), boot.error ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-statusErr" }, boot.error) : null, boot.writable === false ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-hint" }, t("readOnly")) : null, /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("targetRoute")), /* @__PURE__ */ React.createElement(
    PickerInput,
    {
      value: routeText,
      items: routeItems,
      placeholder: t("targetRoutePlaceholder"),
      emptyText: t("pickerEmpty"),
      ariaLabel: t("targetRoute"),
      onChange: onRouteInput,
      onConfirm: confirmRoute
    }
  ), boot.targets.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-hint" }, t("emptyTargets")) : null), target ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("targetModels")), /* @__PURE__ */ React.createElement("div", { className: "mcfg-idWrap" }, /* @__PURE__ */ React.createElement(
    PickerInput,
    {
      value: form.id,
      items: pickerItems,
      placeholder: "deepseek-v5",
      emptyText: t("pickerEmpty"),
      ariaLabel: t("targetModels"),
      onChange: onIdInput,
      onConfirm: confirmPickerItem
    }
  ), exists ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btn mcfg-shrink", disabled: boot.writable === false, onClick: onCopy }, t("copyModel")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btn mcfg-shrink", disabled: deleting || boot.writable === false, onClick: onDelete }, t("deleteModel"))) : /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btn mcfg-shrink", disabled: boot.writable === false, onClick: onNew }, t("createModel"))), target.usesCatalog ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-note" }, t("catalogRouteNote")) : null, target.hasModelOverrides ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-note" }, t("overridesNote")) : null) : null, target && mode !== "none" ? /* @__PURE__ */ React.createElement("section", { className: "mcfg-card" }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-row" }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-field", style: { flex: "1" } }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("entryId")), /* @__PURE__ */ React.createElement("input", { className: "mcfg-input", value: form.id, onChange: (e) => set({ id: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "mcfg-field", style: { flex: "1" } }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("entryName")), /* @__PURE__ */ React.createElement("input", { className: "mcfg-input", value: form.name, onChange: (e) => set({ name: e.target.value }) }))), /* @__PURE__ */ React.createElement("div", { className: "mcfg-row" }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-field", style: { flex: "1" } }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("contextWindowField")), /* @__PURE__ */ React.createElement("input", { className: "mcfg-input", type: "number", min: "1", placeholder: "262144", value: form.contextWindow, onChange: (e) => set({ contextWindow: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "mcfg-field", style: { flex: "1" } }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("maxTokensField")), /* @__PURE__ */ React.createElement("input", { className: "mcfg-input", type: "number", min: "1", placeholder: "32768", value: form.maxTokens, onChange: (e) => set({ maxTokens: e.target.value }) }))), /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("inputField")), /* @__PURE__ */ React.createElement("div", { className: "mcfg-row" }, /* @__PURE__ */ React.createElement("label", { className: "mcfg-check" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.inputUnset, onChange: (e) => set({ inputUnset: e.target.checked }) }), t("inputUnset")), /* @__PURE__ */ React.createElement("label", { className: "mcfg-check" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.inputText, disabled: form.inputUnset, onChange: (e) => set({ inputText: e.target.checked }) }), "text"), /* @__PURE__ */ React.createElement("label", { className: "mcfg-check" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.inputImage, disabled: form.inputUnset, onChange: (e) => set({ inputImage: e.target.checked }) }), "image"))), /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("reasoningField")), /* @__PURE__ */ React.createElement("select", { className: "mcfg-input mcfg-selectInput", value: form.reasoningMode, onChange: (e) => set({ reasoningMode: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "unset" }, t("reasoningModeUnset")), /* @__PURE__ */ React.createElement("option", { value: "off" }, t("reasoningModeOff")), /* @__PURE__ */ React.createElement("option", { value: "levels" }, t("reasoningModeLevels"))), form.reasoningMode === "levels" ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, form.levels.map((row, i) => (
    // Rows are fully controlled (no local state), so index
    // keys keep the DOM stable: changing a level select no
    // longer remounts the row and the wire input keeps focus.
    // Duplicate prevention comes from the disabled options
    // below plus the apply-time validation.
    /* @__PURE__ */ React.createElement("div", { key: i, className: "mcfg-row" }, /* @__PURE__ */ React.createElement("label", { className: "mcfg-check" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: row.on === true, onChange: (e) => setLevel(i, { on: e.target.checked }) })), /* @__PURE__ */ React.createElement("select", { className: "mcfg-input mcfg-selectInput mcfg-shrink", value: row.level, onChange: (e) => setLevel(i, { level: e.target.value }) }, THINKING_LEVELS2.map((l) => (
      // Levels already used by another row are disabled so
      // rows can never become duplicates.
      /* @__PURE__ */ React.createElement("option", { key: l, value: l, disabled: form.levels.some((r, j) => j !== i && r.level === l) }, l)
    ))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "mcfg-input",
        value: row.wire,
        placeholder: row.level === "off" ? t("wireOffHint") : t("wirePlaceholder"),
        onChange: (e) => setLevel(i, { wire: e.target.value })
      }
    ), /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btn mcfg-shrink", "aria-label": t("removeLevel"), onClick: () => removeLevel(i) }, "×"))
  )), /* @__PURE__ */ React.createElement("div", { className: "mcfg-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btn", disabled: allLevelsUsed, onClick: addLevel }, "+ ", t("addLevel"))), /* @__PURE__ */ React.createElement("p", { className: "mcfg-hint" }, t("reasoningHint"))) : null), /* @__PURE__ */ React.createElement("div", { className: "mcfg-field" }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-label" }, t("compatField")), !targetApi ? /* @__PURE__ */ React.createElement("p", { className: "mcfg-note" }, t("compatApiUnknown")) : null, /* @__PURE__ */ React.createElement("p", { className: "mcfg-hint" }, t("compatHint")), COMPAT_GROUPS.map((group) => {
    const fields = group.fields.filter((f) => compatGroup.indexOf(f) >= 0);
    if (!fields.length) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "mcfg-compatGroup", key: group.titleKey, role: "group", "aria-label": t(group.titleKey) }, /* @__PURE__ */ React.createElement("div", { className: "mcfg-compatGroupTitle" }, t(group.titleKey)), fields.map((field) => {
      if (field === "chatTemplateKwargs") {
        if (form.compatThinkingFormat !== "chat-template") return null;
        return /* @__PURE__ */ React.createElement("div", { className: "mcfg-compatField", key: field }, /* @__PURE__ */ React.createElement("span", { className: "mcfg-compatLabel" }, t("compatChatTemplateKwargs")), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            className: "mcfg-input mcfg-textarea",
            rows: 2,
            spellCheck: false,
            placeholder: '{"enable_thinking": true}',
            value: form.compatChatTemplateKwargs,
            onChange: (e) => set({ compatChatTemplateKwargs: e.target.value })
          }
        ), /* @__PURE__ */ React.createElement("p", { className: "mcfg-compatHint" }, t("compatHintChatTemplateKwargs")));
      }
      const control = field === "thinkingFormat" || field === "maxTokensField" || field === "cacheControlFormat" ? compatEnumSelect(field) : compatBoolSelect(field);
      return compatField(field, control);
    }));
  })))) : null, mode !== "none" ? /* @__PURE__ */ React.createElement("div", { className: "mcfg-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "mcfg-btnPrimary", disabled: busy || boot.writable === false || !target, onClick: apply2 }, busy ? t("applying") : t("apply"))) : null, status ? /* @__PURE__ */ React.createElement("p", { className: status.kind === "ok" ? "mcfg-statusOk" : "mcfg-statusErr", role: "status", "aria-live": "polite" }, status.text) : null);
}

// src/client/static.tsx
var name = "dsh-provider-model-configurator";
var inject = ["slots", "remote", "locale"];
var NS = "settings.provider-model-configurator";
var SLOT_ID = "provider-model-configurator";
var SLOT_ORDER = 11;
var STYLE_ID = "dsh-provider-model-configurator-styles";
var METHOD_MAP = {
  "preset-providers": "presetProviders",
  "preset-models": "presetModels",
  "preset-model-info": "presetModelInfo",
  "target-providers": "targetProviders",
  "apply-model-config": "applyModelConfig",
  "delete-model": "deleteModel"
};
var PARAM_ORDER = {
  "preset-models": ["provider"],
  "preset-model-info": ["provider", "model"],
  "apply-model-config": ["route", "entry", "overwrite", "clearFields"],
  "delete-model": ["route", "modelId"]
};
function adoptStyles(cssText) {
  if (document.getElementById(STYLE_ID) !== null) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = cssText;
  document.head.appendChild(style);
}
function apply(ctx) {
  const locale = ctx.get("locale") ?? ctx.locale;
  if (locale !== void 0) {
    ctx.effect(() => locale.register(NS, { zh, en }), "dsh-provider-model-configurator: dictionaries");
  }
  const t = locale !== void 0 ? locale.bind(NS) : (key) => key;
  adoptStyles(page_default);
  let remote = null;
  ctx.effect(async () => {
    const dispose = await ctx.remote.$mount({ package: name, descriptors: INVOCATIONS });
    const handle = ctx.reflect.get("remote.modelConfigurator");
    if (handle === void 0) {
      throw new Error("dsh-provider-model-configurator: the modelConfigurator Remote namespace did not mount");
    }
    remote = handle;
    return () => {
      remote = null;
      void dispose();
    };
  }, "dsh-provider-model-configurator: remote");
  const call = async (method, payload) => {
    if (remote === null) throw new Error(t("remotePending"));
    const remoteName = METHOD_MAP[method];
    const args = (PARAM_ORDER[method] || []).map((key) => (payload || {})[key]);
    const r = await remote[remoteName](...args);
    const msgOf = (e) => typeof e === "string" ? e : e && typeof e === "object" && typeof e.message === "string" ? e.message : "";
    if (r === null || typeof r !== "object" || r.ok !== true) {
      throw new Error(msgOf(r?.error) || "调用失败");
    }
    const value = r.value;
    if (value && value.ok === true) return value;
    throw new Error(msgOf(value?.error) || "调用失败");
  };
  const slots = ctx.get("slots") ?? ctx.slots;
  if (slots === void 0) return;
  slots.inject("settings.section", () => slots.register(
    { name: "settings.section", id: SLOT_ID, order: SLOT_ORDER, label: () => t("nav") },
    () => React.createElement(ModelConfiguratorPage, { t, call })
  ));
}
return module.exports; } });
