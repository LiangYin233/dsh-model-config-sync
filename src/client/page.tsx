/**
 * Provider Model Configurator — shared settings page component.
 * Environment-neutral: driven only by `t` (translate) and `call` (one host
 * RPC returning `{ ok, ... } | { ok: false, error }`).
 * Business helpers live in ./model.ts; dictionaries in ./locales/*.json.
 * Entries: ./static.tsx (bundle) and ./dynamic.ts (dynamic plugin).
 *
 * Model picker flow: the id input is a combobox — focus opens the provider's
 * model list, typing filters by id/name prefix, ↑/↓ move the highlight,
 * Enter / click confirms a model and enters edit mode. The action buttons
 * next to the input follow the current id: existing model → Copy / Delete,
 * new id → New (fills id + display name and shows the form; nothing is
 * written until Apply). The form and Apply button are hidden until a model
 * is confirmed or New is pressed.
 */

import { THINKING_LEVELS, THINKING_FORMATS, COMPAT_BOOLEANS, compatBoolKey, buildEntry, entryToForm, modelSummary } from './model.js'
import { MAX_TOKENS_FIELDS, CACHE_CONTROL_FORMATS, COMPAT_API_GROUPS } from '../shared/thinking.js'

export type Translate = (key: string) => string
export type Call = (method: string, payload?: Record<string, unknown>) => Promise<any>
export interface PageProps { t: Translate; call: Call }

/** Page stylesheet (./page.css), inlined as text at build time. */
export { default as css } from './page.css'

/** Dictionaries — one JSON file per language (./locales/*.json). */
import zhRaw from './locales/zh.json'
import enRaw from './locales/en.json'
export const zh = zhRaw
export const en = enRaw satisfies Record<keyof typeof zh, string>

type Status = { kind: 'ok' | 'err'; text: string }

/**
 * Compat options grouped by meaning. Fields a route's protocol does not offer
 * are filtered out at render time, so a group disappears when its protocol
 * leaves it empty. Each group gets a small title above its rows.
 */
const COMPAT_GROUPS: { titleKey: string; fields: string[] }[] = [
  {
    titleKey: 'compatGroupThinking',
    fields: [
      'thinkingFormat', 'chatTemplateKwargs', 'supportsReasoningEffort', 'supportsDeveloperRole',
      'requiresThinkingAsText', 'requiresReasoningContentOnAssistantMessages', 'supportsUsageInStreaming',
    ],
  },
  {
    titleKey: 'compatGroupRequest',
    fields: ['maxTokensField', 'supportsStore', 'supportsTemperature', 'supportsStrictMode', 'cacheControlFormat', 'supportsLongCacheRetention'],
  },
  {
    titleKey: 'compatGroupTools',
    fields: ['requiresToolResultName', 'requiresAssistantAfterToolResult', 'supportsEagerToolInputStreaming', 'supportsCacheControlOnTools', 'supportsStrictTools', 'allowEmptySignature', 'forceAdaptiveThinking'],
  },
]

/**
 * Every compat form key, in one list. Used to preserve the block across a
 * preset fill and to decide when "all compat unset" clears the whole block.
 */
const COMPAT_FORM_KEYS = [
  'compatThinkingFormat',
  'compatMaxTokensField',
  'compatCacheControlFormat',
  'compatChatTemplateKwargs',
  ...COMPAT_BOOLEANS.map(compatBoolKey),
]

/**
 * The model form state: the fixed fields below plus one string entry per
 * compat boolean switch ('' = unset, 'true' / 'false'), addressed through the
 * index signature by compatBoolKey(field).
 */
interface ModelFormState {
  id: string
  name: string
  contextWindow: string
  maxTokens: string
  inputUnset: boolean
  inputText: boolean
  inputImage: boolean
  reasoningMode: string
  levels: any[]
  compatThinkingFormat: string
  compatMaxTokensField: string
  compatCacheControlFormat: string
  compatChatTemplateKwargs: string
  [key: string]: any
}

/** The pristine form state; also used to reset after a successful delete. */
function emptyForm(): ModelFormState {
  const bools: Record<string, string> = {}
  for (const f of COMPAT_BOOLEANS) bools[compatBoolKey(f)] = ''
  return {
    id: '', name: '', contextWindow: '', maxTokens: '', inputUnset: true, inputText: true, inputImage: false,
    reasoningMode: 'unset', levels: [] as any[],
    compatThinkingFormat: '', compatMaxTokensField: '', compatCacheControlFormat: '', compatChatTemplateKwargs: '',
    ...bools,
  }
}

/** One row of a PickerInput dropdown. `raw` carries the caller's source object. */
interface PickerItem {
  key: string
  title: string
  sub?: string
  raw?: any
}

/**
 * Combobox input with a prefix-filtered dropdown: focus opens the list,
 * typing filters by title/key prefix, ↑/↓ move the highlight, Enter or a
 * click confirms (via onConfirm), Escape or a blur closes. The input text is
 * controlled by the caller (`value` / `onChange`); the dropdown state is
 * internal. Used for both the provider route picker and the model picker so
 * the two behave identically.
 */
function PickerInput(props: {
  value: string
  items: PickerItem[]
  placeholder: string
  emptyText: string
  ariaLabel: string
  onChange: (text: string) => void
  onConfirm: (item: PickerItem) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const query = props.value.trim().toLowerCase()
  const filtered = query
    ? props.items.filter((it) => it.title.toLowerCase().startsWith(query) || it.key.toLowerCase().startsWith(query))
    : props.items
  // Keep the highlight inside the filtered list when typing shrinks it.
  React.useEffect(() => {
    setIndex((i) => (filtered.length ? Math.min(i, filtered.length - 1) : 0))
  }, [filtered.length])
  /**
   * Confirm one row and close the dropdown. Both paths (Enter and a mouse
   * click) go through here: the item rows call preventDefault on mousedown so
   * the input never blurs, which means onBlur cannot close the list — the
   * close must happen right here. The input is blurred too: it is still the
   * active element after the row's preventDefault, and a focus event only
   * fires when the element gains focus — clicking an already-focused input
   * would never re-open the list, so the confirmed state must drop focus.
   */
  const confirm = (it: PickerItem) => {
    props.onConfirm(it)
    setOpen(false)
    inputRef.current?.blur()
  }
  return (
    <div className="mcfg-pickerWrap" style={{ flex: '1' }}>
      <input
        ref={inputRef}
        className="mcfg-input mcfg-idInput"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => { props.onChange(e.target.value); setIndex(0); setOpen(true) }}
        onFocus={() => { setIndex(0); setOpen(true) }}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); return }
          if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); return }
          if (e.key === 'Enter') { e.preventDefault(); if (filtered.length && index >= 0) confirm(filtered[index]) }
          if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
        }}
      />
      {open ? (
        <div className="mcfg-picker" role="listbox" aria-label={props.ariaLabel}>
          {filtered.length === 0 ? (
            <div className="mcfg-pickerEmpty">{props.emptyText}</div>
          ) : filtered.map((it, i) => (
            <div
              key={it.key}
              className={'mcfg-pickerItem' + (i === index ? ' mcfg-pickerActive' : '')}
              role="option"
              aria-selected={i === index}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setIndex(i)}
              onClick={() => confirm(it)}
            >
              <div className="mcfg-pickerId">{it.title}</div>
              {it.sub ? <div className="mcfg-pickerSummary">{it.sub}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function ModelConfiguratorPage(props: PageProps) {
  const { t, call } = props
  const [boot, setBoot] = React.useState({ targets: [] as any[], writable: true, error: '' })
  const [targetRoute, setTargetRoute] = React.useState('')
  // The provider combobox text: the confirmed route's display name, or the
  // user's raw input while nothing is confirmed.
  const [routeText, setRouteText] = React.useState('')
  const [form, setForm] = React.useState(emptyForm)
  const [loadedEntryId, setLoadedEntryId] = React.useState('')
  // The form section visibility: 'editing' (a model was confirmed / loaded),
  // 'creating' (New or Copy was pressed), or 'none' (nothing confirmed yet).
  const [mode, setMode] = React.useState<'none' | 'editing' | 'creating'>('none')
  const [deleting, setDeleting] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [status, setStatus] = React.useState<Status | null>(null)

  const fail = (err: unknown) => setStatus({ kind: 'err', text: (err as Error)?.message || String(err) })
  const refresh = async () => {
    const b = await call('target-providers')
    if (b && b.ok === true) setBoot((x) => ({ ...x, targets: b.providers, writable: b.writable !== false }))
  }

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const b = await call('target-providers')
        if (!alive) return
        setBoot({
          targets: b.ok === true ? b.providers : [],
          writable: b.ok === true ? b.writable !== false : true,
          error: b.ok === true ? '' : (b.error || 'target-providers failed'),
        })
      } catch (err) {
        if (alive) setBoot((x) => ({ ...x, error: (err as Error)?.message || String(err) }))
      }
    })()
    return () => { alive = false }
  }, [])

  const target = boot.targets.find((x) => x.provider === targetRoute) || null
  const targetModelIds = target ? [...new Set([...(target.models || []), ...(target.catalogModels || [])])] : []
  const exists = targetModelIds.indexOf(form.id.trim()) >= 0
  // The route's declared wire protocol decides which compat switches the form
  // shows (a switch its protocol does not take would fail adapter resolution).
  // Unknown / unset api falls back to the openai-completions group.
  const targetApi = target && typeof target.api === 'string' && target.api ? target.api : ''
  const apiForCompat = targetApi || 'openai-completions'
  const compatGroup = COMPAT_API_GROUPS[apiForCompat as keyof typeof COMPAT_API_GROUPS] || COMPAT_API_GROUPS['openai-completions']

  // Combobox model list: explicit entries first (with their summaries), then
  // catalog-only ids; prefix filtering happens inside PickerInput.
  const pickerAll = target
    ? [
        ...target.entries.map((e: any) => ({ id: String(e && e.id), entry: e })),
        ...target.catalogModels.filter((id: string) => !target.entries.some((e: any) => e && e.id === id)).map((id: string) => ({ id, entry: null })),
      ]
    : []
  const pickerItems: PickerItem[] = pickerAll.map((m) => ({
    key: m.id,
    title: m.id,
    sub: m.entry ? modelSummary(m.entry) : undefined,
    raw: m,
  }))
  // Provider combobox rows: display name first, route key as the sub line.
  const routeItems: PickerItem[] = boot.targets.map((x) => ({
    key: x.provider,
    title: x.displayName,
    sub: x.provider + (x.declared ? ' · ' + t('customTag') : ''),
    raw: x,
  }))

  const set = (patch: Record<string, unknown>) => setForm((f) => ({ ...f, ...patch }))
  const setLevel = (index: number, patch: Record<string, unknown>) => setForm((f) => ({
    ...f,
    levels: f.levels.map((row, i) => (i === index ? { ...row, ...patch } : row)),
  }))
  const removeLevel = (index: number) => setForm((f) => ({ ...f, levels: f.levels.filter((_, i) => i !== index) }))
  /** Add a level row that is not already present, so rows stay unique. */
  const addLevel = () => setForm((f) => {
    const used = new Set(f.levels.map((r: any) => r.level))
    const next = THINKING_LEVELS.find((l) => !used.has(l)) || 'low'
    return { ...f, levels: [...f.levels, { level: next, wire: '', on: true }] }
  })
  const allLevelsUsed = new Set(form.levels.map((r: any) => r.level)).size >= THINKING_LEVELS.length

  /** Enter edit mode for an existing model entry. */
  const loadEntry = (entry: any) => {
    setForm(entryToForm(entry))
    setLoadedEntryId(entry.id)
    setMode('editing')
    setStatus(null)
  }

  /** Confirm a picker row: edit the entry or start from its id. */
  const confirmPickerItem = (item: PickerItem) => {
    const m = item.raw
    if (!m) return
    const entry = (target?.entries || []).find((e: any) => e && e.id === m.id) || null
    if (entry) {
      loadEntry(entry)
    } else {
      // Catalog-only model: open an empty form seeded with the id.
      const next = emptyForm()
      setForm({ ...next, id: m.id })
      setLoadedEntryId('')
      setMode('editing')
      setStatus(null)
    }
  }

  /** Confirm a provider route: switch target and drop the whole draft. */
  const confirmRoute = (item: PickerItem) => {
    const x = item.raw
    if (!x) return
    setTargetRoute(x.provider)
    setRouteText(x.displayName)
    setLoadedEntryId('')
    setForm(emptyForm())
    setMode('none')
    setStatus(null)
  }

  /** The id input changed: drop any confirmed edit (the picker re-filters itself). */
  const onIdInput = (value: string) => {
    set({ id: value })
    if (mode === 'editing') setMode('none')
    setStatus(null)
  }

  /** The route input changed: any edit cancels the confirmed route. */
  const onRouteInput = (value: string) => {
    setRouteText(value)
    if (targetRoute) setTargetRoute('')
    setStatus(null)
  }

  /** New: seed id + display name from the input and show the form (no write yet). */
  const onNew = () => {
    const id = form.id.trim()
    if (!id) { setStatus({ kind: 'err', text: t('needId') }); return }
    setForm((f) => ({ ...f, name: id }))
    setLoadedEntryId('')
    setMode('creating')
    setStatus(null)
  }

  /** Copy: load the existing entry, then re-seed it under a fresh id. */
  const onCopy = () => {
    const id = form.id.trim()
    const entry = (target?.entries || []).find((e: any) => e && e.id === id)
    if (!entry) { setStatus({ kind: 'err', text: t('copyNoEntry') }); return }
    let suffix = 2
    let newId = id + '-copy'
    while (targetModelIds.indexOf(newId) >= 0) { newId = id + '-copy' + suffix; suffix++ }
    const f = entryToForm(entry)
    setForm({ ...f, id: newId, name: (typeof f.name === 'string' && f.name ? f.name + ' (copy)' : newId) })
    setLoadedEntryId('')
    setMode('creating')
    setStatus(null)
  }

  /** Delete the model in the input, after confirmation. */
  const onDelete = () => {
    const id = form.id.trim()
    if (targetModelIds.indexOf(id) < 0) { setStatus({ kind: 'err', text: t('deleteNoEntry') }); return }
    removeModel(id)
  }

  const removeModel = async (modelId: string) => {
    if (deleting || !window.confirm(t('deleteConfirm').replace('{model}', modelId))) return
    setDeleting(true)
    setStatus(null)
    try {
      const r = await call('delete-model', { route: targetRoute, modelId })
      if (!r || r.ok !== true) { setStatus({ kind: 'err', text: (r && r.error) || '删除失败' }); return }
      setStatus({ kind: 'ok', text: (r.revertedToCatalog === true ? t('statusDeletedCatalog') : t('statusDeleted')).replace('{model}', r.model).replace('{route}', r.route).replace('{count}', String(r.count)) })
      // Reset the form and leave edit/creating so a stale entry cannot be
      // re-applied as a new model.
      setForm(emptyForm())
      setLoadedEntryId('')
      setMode('none')
      await refresh()
    } catch (err) { fail(err) } finally { setDeleting(false) }
  }

  const apply = async () => {
    const id = form.id.trim()
    if (!targetRoute) { setStatus({ kind: 'err', text: t('needTarget') }); return }
    if (!id) { setStatus({ kind: 'err', text: t('needId') }); return }
    if (exists && !window.confirm(t('overwriteConfirm').replace('{model}', id))) {
      setStatus(null)
      return
    }
    // M8: a checked non-off level with an empty wire must fail here, loudly,
    // instead of being silently dropped by buildEntry (which only writes
    // levels that have a wire value). Duplicate levels are rejected too —
    // buildEntry would silently collapse them (last one wins).
    if (form.reasoningMode === 'levels') {
      const seen = new Set<string>()
      for (const row of form.levels) {
        if (row.on !== true) continue
        if (seen.has(row.level)) { setStatus({ kind: 'err', text: t('dupLevel').replace('{level}', row.level) }); return }
        seen.add(row.level)
      }
      const emptyWire = form.levels.find((row: any) => row.on === true && row.level !== 'off' && !String(row.wire || '').trim())
      if (emptyWire) { setStatus({ kind: 'err', text: t('wireRequired').replace('{level}', emptyWire.level) }); return }
    }
    // chat_template_kwargs must be a JSON object (the host re-validates the
    // per-value shape); fail here so a typo cannot half-apply the entry.
    const kwargsText = String(form.compatChatTemplateKwargs || '').trim()
    if (kwargsText) {
      let parsed: unknown
      try { parsed = JSON.parse(kwargsText) } catch { setStatus({ kind: 'err', text: t('kwargsInvalid') }); return }
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) { setStatus({ kind: 'err', text: t('kwargsInvalid') }); return }
    }
    const entry = buildEntry(form)
    if (form.reasoningMode === 'levels' && !entry.reasoningEfforts) {
      setStatus({ kind: 'err', text: t('reasonEmpty') }); return
    }
    // M1: empty form fields mean "delete this field from an existing entry"
    // (back to catalog inheritance), not "keep the previous value". The host
    // strips these keys from the previous entry before merging. The 'unset'
    // reasoning / input states clear the whole field the same way.
    const clearFields: string[] = []
    if (!form.name.trim()) clearFields.push('name')
    if (!form.contextWindow.trim()) clearFields.push('contextWindow')
    if (!form.maxTokens.trim()) clearFields.push('maxTokens')
    if (form.inputUnset || (!form.inputText && !form.inputImage)) clearFields.push('input')
    if (form.reasoningMode === 'unset') clearFields.push('reasoningEfforts')
    // Compat unset semantics: clearing EVERY switch removes the whole compat
    // block from the previous entry; clearing only SOME drops the empty
    // ones' old values (built.compat replaces the previous block wholesale on
    // the host) rather than inheriting them — "unset" always means "remove",
    // never "keep".
    if (COMPAT_FORM_KEYS.every((k) => form[k] === '' || form[k] == null)) clearFields.push('compat')
    setBusy(true)
    setStatus(null)
    try {
      // overwrite is always true here: the overwrite confirmation already ran
      // above (exists check); the host's overwrite=false guard only protects
      // direct API callers, the bundle always goes through the confirm dialog.
      const r = await call('apply-model-config', { route: targetRoute, entry, overwrite: true, clearFields })
      if (!r || r.ok !== true) { setStatus({ kind: 'err', text: (r && r.error) || '应用失败' }); return }
      setStatus({ kind: 'ok', text: t('statusOk').replace('{model}', r.model).replace('{route}', r.route).replace('{count}', String(r.count)) })
      await refresh()
    } catch (err) { fail(err) } finally { setBusy(false) }
  }

  /**
   * One compat option as its own row: label + control on one line, the
   * option's explanation below. `control` is the select/textarea element.
   * Locale keys are `compatBool<Field>` / `compatHint<Field>` with the field
   * name capitalized (e.g. supportsStore → compatBoolSupportsStore).
   */
  const compatField = (field: string, control: any) => {
    const cap = field[0].toUpperCase() + field.slice(1)
    return (
      <div className="mcfg-compatField" key={field}>
        <div className="mcfg-compatTop">
          <span className="mcfg-compatLabel">
            {field === 'thinkingFormat' ? t('compatThinkingFormat')
              : field === 'maxTokensField' ? t('compatMaxTokensField')
                : field === 'cacheControlFormat' ? t('compatCacheControlFormat')
                  : t('compatBool' + cap)}
          </span>
          {control}
        </div>
        <p className="mcfg-compatHint">{t('compatHint' + cap)}</p>
      </div>
    )
  }

  /** One compat boolean switch as a tri-state select (unset / true / false). */
  const compatBoolSelect = (field: string) => {
    const key = compatBoolKey(field)
    return (
      <select className="mcfg-input mcfg-selectInput mcfg-compatSelect" value={form[key]} onChange={(e) => set({ [key]: e.target.value })}>
        <option value="">{t('compatUnset')}</option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    )
  }

  /** Select options of one enum compat field. */
  const compatEnumSelect = (field: string) => {
    const key = field === 'thinkingFormat' ? 'compatThinkingFormat' : field === 'maxTokensField' ? 'compatMaxTokensField' : 'compatCacheControlFormat'
    const options = field === 'thinkingFormat' ? THINKING_FORMATS : field === 'maxTokensField' ? MAX_TOKENS_FIELDS : CACHE_CONTROL_FORMATS
    return (
      <select className="mcfg-input mcfg-selectInput mcfg-compatSelect" value={form[key]} onChange={(e) => set({ [key]: e.target.value })}>
        <option value="">{t('compatUnset')}</option>
        {options.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>
    )
  }

  return (
    <div className="mcfg-page">
      <h2 className="mcfg-title">{t('title')}</h2>
      <p className="mcfg-intro">{t('intro')}</p>
      {boot.error ? <p className="mcfg-statusErr">{boot.error}</p> : null}
      {boot.writable === false ? <p className="mcfg-hint">{t('readOnly')}</p> : null}

      <div className="mcfg-field">
        <span className="mcfg-label">{t('targetRoute')}</span>
        <PickerInput
          value={routeText}
          items={routeItems}
          placeholder={t('targetRoutePlaceholder')}
          emptyText={t('pickerEmpty')}
          ariaLabel={t('targetRoute')}
          onChange={onRouteInput}
          onConfirm={confirmRoute}
        />
        {boot.targets.length === 0 ? <p className="mcfg-hint">{t('emptyTargets')}</p> : null}
      </div>

      {target ? (
        <div className="mcfg-field">
          <span className="mcfg-label">{t('targetModels')}</span>
          <div className="mcfg-idWrap">
            <PickerInput
              value={form.id}
              items={pickerItems}
              placeholder="deepseek-v5"
              emptyText={t('pickerEmpty')}
              ariaLabel={t('targetModels')}
              onChange={onIdInput}
              onConfirm={confirmPickerItem}
            />
            {exists ? (
              <React.Fragment>
                <button type="button" className="mcfg-btn mcfg-shrink" disabled={boot.writable === false} onClick={onCopy}>{t('copyModel')}</button>
                <button type="button" className="mcfg-btn mcfg-shrink" disabled={deleting || boot.writable === false} onClick={onDelete}>{t('deleteModel')}</button>
              </React.Fragment>
            ) : (
              <button type="button" className="mcfg-btn mcfg-shrink" disabled={boot.writable === false} onClick={onNew}>{t('createModel')}</button>
            )}
          </div>
          {target.usesCatalog ? <p className="mcfg-note">{t('catalogRouteNote')}</p> : null}
          {target.hasModelOverrides ? <p className="mcfg-note">{t('overridesNote')}</p> : null}
        </div>
      ) : null}

      {target && mode !== 'none' ? (
        <section className="mcfg-card">
          <div className="mcfg-field">
            <div className="mcfg-row">
              <div className="mcfg-field" style={{ flex: '1' }}>
                <span className="mcfg-label">{t('entryId')}</span>
                <input className="mcfg-input" value={form.id} onChange={(e) => set({ id: e.target.value })} />
              </div>
              <div className="mcfg-field" style={{ flex: '1' }}>
                <span className="mcfg-label">{t('entryName')}</span>
                <input className="mcfg-input" value={form.name} onChange={(e) => set({ name: e.target.value })} />
              </div>
            </div>
            <div className="mcfg-row">
              <div className="mcfg-field" style={{ flex: '1' }}>
                <span className="mcfg-label">{t('contextWindowField')}</span>
                <input className="mcfg-input" type="number" min="1" placeholder="262144" value={form.contextWindow} onChange={(e) => set({ contextWindow: e.target.value })} />
              </div>
              <div className="mcfg-field" style={{ flex: '1' }}>
                <span className="mcfg-label">{t('maxTokensField')}</span>
                <input className="mcfg-input" type="number" min="1" placeholder="32768" value={form.maxTokens} onChange={(e) => set({ maxTokens: e.target.value })} />
              </div>
            </div>
            <div className="mcfg-field">
              <span className="mcfg-label">{t('inputField')}</span>
              <div className="mcfg-row">
                <label className="mcfg-check">
                  <input type="checkbox" checked={form.inputUnset} onChange={(e) => set({ inputUnset: e.target.checked })} />{t('inputUnset')}
                </label>
                <label className="mcfg-check">
                  <input type="checkbox" checked={form.inputText} disabled={form.inputUnset} onChange={(e) => set({ inputText: e.target.checked })} />text
                </label>
                <label className="mcfg-check">
                  <input type="checkbox" checked={form.inputImage} disabled={form.inputUnset} onChange={(e) => set({ inputImage: e.target.checked })} />image
                </label>
              </div>
            </div>
            <div className="mcfg-field">
              <span className="mcfg-label">{t('reasoningField')}</span>
              <select className="mcfg-input mcfg-selectInput" value={form.reasoningMode} onChange={(e) => set({ reasoningMode: e.target.value })}>
                <option value="unset">{t('reasoningModeUnset')}</option>
                <option value="off">{t('reasoningModeOff')}</option>
                <option value="levels">{t('reasoningModeLevels')}</option>
              </select>
              {form.reasoningMode === 'levels' ? (
                <div className="mcfg-field">
                  {form.levels.map((row, i) => (
                    // Rows are fully controlled (no local state), so index
                    // keys keep the DOM stable: changing a level select no
                    // longer remounts the row and the wire input keeps focus.
                    // Duplicate prevention comes from the disabled options
                    // below plus the apply-time validation.
                    <div key={i} className="mcfg-row">
                      <label className="mcfg-check">
                        <input type="checkbox" checked={row.on === true} onChange={(e) => setLevel(i, { on: e.target.checked })} />
                      </label>
                      <select className="mcfg-input mcfg-selectInput mcfg-shrink" value={row.level} onChange={(e) => setLevel(i, { level: e.target.value })}>
                        {THINKING_LEVELS.map((l) => (
                          // Levels already used by another row are disabled so
                          // rows can never become duplicates.
                          <option key={l} value={l} disabled={form.levels.some((r, j) => j !== i && r.level === l)}>{l}</option>
                        ))}
                      </select>
                      <input
                        className="mcfg-input"
                        value={row.wire}
                        placeholder={row.level === 'off' ? t('wireOffHint') : t('wirePlaceholder')}
                        onChange={(e) => setLevel(i, { wire: e.target.value })}
                      />
                      <button type="button" className="mcfg-btn mcfg-shrink" aria-label={t('removeLevel')} onClick={() => removeLevel(i)}>×</button>
                    </div>
                  ))}
                  <div className="mcfg-row">
                    <button type="button" className="mcfg-btn" disabled={allLevelsUsed} onClick={addLevel}>+ {t('addLevel')}</button>
                  </div>
                  <p className="mcfg-hint">{t('reasoningHint')}</p>
                </div>
              ) : null}
            </div>
            <div className="mcfg-field">
              <span className="mcfg-label">{t('compatField')}</span>
              {!targetApi ? <p className="mcfg-note">{t('compatApiUnknown')}</p> : null}
              <p className="mcfg-hint">{t('compatHint')}</p>
              {/* The route's protocol group, rendered per semantic group: a
                  small title, then one row per option (label + control on
                  the line, explanation below it). */}
              {COMPAT_GROUPS.map((group) => {
                const fields = group.fields.filter((f) => compatGroup.indexOf(f) >= 0)
                if (!fields.length) return null
                return (
                  <div className="mcfg-compatGroup" key={group.titleKey} role="group" aria-label={t(group.titleKey)}>
                    <div className="mcfg-compatGroupTitle">{t(group.titleKey)}</div>
                    {fields.map((field) => {
                      if (field === 'chatTemplateKwargs') {
                        // Only meaningful under the chat-template format; the
                        // input appears once that format is selected.
                        if (form.compatThinkingFormat !== 'chat-template') return null
                        return (
                          <div className="mcfg-compatField" key={field}>
                            <span className="mcfg-compatLabel">{t('compatChatTemplateKwargs')}</span>
                            <textarea
                              className="mcfg-input mcfg-textarea"
                              rows={2}
                              spellCheck={false}
                              placeholder='{"enable_thinking": true}'
                              value={form.compatChatTemplateKwargs}
                              onChange={(e) => set({ compatChatTemplateKwargs: e.target.value })}
                            />
                            <p className="mcfg-compatHint">{t('compatHintChatTemplateKwargs')}</p>
                          </div>
                        )
                      }
                      const control = field === 'thinkingFormat' || field === 'maxTokensField' || field === 'cacheControlFormat'
                        ? compatEnumSelect(field)
                        : compatBoolSelect(field)
                      return compatField(field, control)
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {mode !== 'none' ? (
        <div className="mcfg-row">
          <button type="button" className="mcfg-btnPrimary" disabled={busy || boot.writable === false || !target} onClick={apply}>
            {busy ? t('applying') : t('apply')}
          </button>
        </div>
      ) : null}
      {status ? <p className={status.kind === 'ok' ? 'mcfg-statusOk' : 'mcfg-statusErr'} role="status" aria-live="polite">{status.text}</p> : null}
    </div>
  )
}
