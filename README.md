# dsh-provider-model-configurator

一个 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) **插件**:在独立设置页「模型 Pro / Model Pro」中集中**查看、新建、编辑、复制与删除**已配置提供商下的模型条目——上下文窗口、最大输出、输入模态、推理档位与推理兼容开关。还可以从内置的 `llm-pi-ai` 模型列表读取您所需要配置的模型的上下文参数、最大Token，无需自行填写、手动查询。

## 界面预览

| 模型 Pro 设置页 | 复制来源选择器 |
| --- | --- |
| ![ui-1](docs/ui-1.png) | ![ui-2](docs/ui-2.png) |

## 安装

```sh
# 从 GitHub 安装
dsh plugin --profile web add github:LiangYin233/dsh-provider-model-configurator#v0.10.0

# 或从 GitHub tarball 安装
dsh plugin --profile web add https://github.com/LiangYin233/dsh-provider-model-configurator/archive/refs/tags/v0.10.0.tar.gz

# 或从本地打包安装
npm pack
dsh plugin --profile web add ./dsh-provider-model-configurator-0.10.0.tgz
```

安装后**重启 Web 服务器并刷新页面**,打开设置 → 左侧导航「模型 Pro」(Models 页之后)。

## 功能

- 选择**目标提供商**,在模型 ID 组合框中点击输入框弹出模型列表、输入时前缀筛选,↑↓ 选择、Enter/点击确认后进入编辑;输入框内容为已有模型时显示**复制 / 删除**,为新 ID 时显示**新建**(填入 ID 与显示名称并展开配置区,点「应用配置」才真正写入);
- **新建**:输入新模型 ID 后点「新建」,手动填写显示名、上下文窗口、最大输出、输入模态(text/image)、推理档位(档位 → wire 值,`off` 留空 = 不发送);推理档位与输入模态均支持「未设置(继承目录)」,避免把未配置的字段写成显式默认值;
- **复制**:对已有模型点「复制」,其全部配置填入表单并自动追加 `-copy` 后缀(重名时递增 `-copy2`…),再按需修改后应用;
- **兼容选项 (compat)**:按目标提供商的 api 协议分组显示 `PiAiCompatProfile` 的全部字段——`thinkingFormat`(openai / deepseek / openrouter / together / zai / qwen / chat-template / qwen-chat-template / string-thinking / ant-ling)、`maxTokensField`、`cacheControlFormat`、`chatTemplateKwargs`(JSON)与 16 个布尔开关(三态:未设置 / true / false);`supportsDeveloperRole: false` 强制推理模型的系统提示词退回 `system` 角色,用于不接受 `developer` 角色的私有网关(报 400: expected one of system… 时设置);

> **目录快照行为**:在尚未显式配置模型列表的目录提供商上新建/应用模型时,插件会把内置目录的当前模型列表整体写入为该提供商的显式条目(目录中已有的 ID 原地更新,新 ID 追加),之后再编辑均基于这份显式列表;目录后续更新不会自动合并进已快照的列表。目录提供商若删到零个显式条目,则回退为内置目录(未快照)状态。

## 仓库结构

```
├── package.json        bundle 清单(dsh.bundle.patch / dsh.client / exports)
├── cordis.patch.yml    bundle patch:挂载 dsh-provider-model-configurator
├── dsh.plugin.json     插件元数据(id / version / main)
├── docs/               界面截图(README 预览用)
├── lib/                构建产物(随包发布,由 build.mjs 生成)
│   ├── index.js        ← src/host/index.js
│   ├── contract.js     ← src/host/contract.js
│   └── client.js       ← src/client/static.tsx
├── shared/             构建产物:src/shared/thinking.js(共享常量;lib/contract.js
│                       运行时按 ../shared/thinking.js 解析到包根目录)
├── src/
│   ├── host/           Host 半区源码(index.js 静态 / dynamic.js 动态插件)
│   ├── client/         Client 半区源码(page.tsx / model.ts / page.css / locales/)
│   └── shared/         thinking.js — 推理档位 / 推理格式常量的单一来源
├── scripts/
│   └── check-dynamic.mjs  动态半区语法校验 + 常量同步校验(npm run check 执行)
├── build.mjs           esbuild 构建(lib/ 与 dist/dynamic-client-body.js)
└── tsconfig.json
```

## License

MIT

## 鸣谢

[LINUX DO](https://linux.do/)
