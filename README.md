# dsh-prc-people-skin

“人民的 AI，智慧办公”政务工作台皮肤：**深红侧栏 + 米白工作区 + 自绘政务横幅 + 四张办事入口**，同时提供一个可导入 Dream Skin 的主题包。

它不替换 DSH 的应用根节点，不接管原生路由，也不改动原生输入框结构：工作台通过 `conversation.input.dock` 插槽挂载，只在空白新会话显示；侧栏和整体配色通过主题 token 与限定的语义选择器完成。

## 特性

- 深红渐变侧栏与米白工作区，使用参考图的朱砂、鎏金、墨色配色。
- 自绘 1600×440 政务横幅：华表、红绸、城楼、天际线、朝阳，标题“人民的AI，智慧办公”。
- 四张办事入口：创建材料、政策调研、信息获取、流程自动化；点击后把提示词填入原生输入框。
- 顶部“DSH 政务工作台 / 人民至上 · 数智协同”，以及“服务为民 · 实干笃行”小印。
- 设置 → 通用设置里提供“人民政务皮肤”开关，关闭后完整恢复原生外观。
- 自带 `themes/prc-people.dsh-theme.json`，可导入 Dream Skin 等支持 `dsh-dream-skin/pack` 的换肤工具。
- 支持窄窗口：920px 以下隐藏卡片说明，740px 以下卡片两列，1180px 以下隐藏顶部右侧小字。

## 安装

在 DSH 中通过插件安装器安装本目录：

```text
plugin_manager install_bundle target=<本目录绝对路径>
```

或使用 DSH CLI（自定义 profile）：

```powershell
dsh plugin --profile <profile> add "<本目录绝对路径>"
```

也可以直接从 GitHub 安装：

```powershell
dsh plugin --profile <profile> add github:lxwang98/dsh-prc-people-skin
```

安装后刷新 Web UI；若客户端 bundle 未热更新，重启 DSH Desktop。

## 使用

1. 新建一个会话，工作台会出现在原生输入框上方。
2. 点击四张卡片之一，提示词会填入输入框，可继续修改再发送。
3. 在“设置 → 通用设置 → 人民政务皮肤”中可随时关闭/开启。
4. 关闭后 `html[data-prc-people-skin]` 变为 `off`，工作台卸载，原生首页与侧栏恢复。

## 导入主题包

在 Dream Skin 的“设置 → 个性化皮肤 → 导入与导出”中导入：

```text
themes/prc-people.dsh-theme.json
```

主题包只包含颜色 token，不包含横幅和壁纸；横幅、四张卡片和侧栏装饰由插件本体提供。

## 兼容性

- 目标：DeepSeek Harness `0.2.1-rc.5` 的 Web / Desktop Web UI。
- 不覆盖应用根节点，不替换原生 React 树，不修改会话数据。
- 工作台只在 `[data-phase="hero"]` 的新会话出现；进入已有对话后自动不渲染。
- 原生输入框是 Lexical contenteditable，卡片写入使用 `execCommand('insertText')`，失败时回退到剪贴板提示。
- 主题强制为浅色政务配色；原生“深色/跟随系统”控件不会被改写，但本皮肤的 token 以浅色为准。
- 与其它换肤插件同时启用时，若对方也覆盖同一批 `--dsw-*` token，最终颜色取决于加载顺序；本插件的主要表面色还使用了限定 CSS，因此横幅和侧栏仍会保留。

## 关于横幅

当前会话没有可用的 `imagegen` 技能/工具：GitHub 安装源不可达，npm 也没有对应包。因此横幅不是生成式图片，而是**手工编写的原创 SVG 矢量图**（`assets/banner.svg`），由浏览器渲染，不含外部图片或版权素材。若之后安装 imagegen，可替换该 SVG 为生成的位图，并保持 1600×440 比例。

## 目录

```text
assets/banner.svg                 自绘政务横幅
assets/skyline.svg                城市天际线线稿
assets/icon.svg                   插件图标
lib/index.js                      Host 端：静态资源 + 主题包路由
lib/client.js                     Client 端：主题、插槽、工作台、设置开关
themes/prc-people.dsh-theme.json  Dream Skin 主题包
locale/zh.json, locale/en.json    插件元数据
cordis.patch.yml                  插入 prc-people-skin 插件行
```

## 开发校验

```powershell
node --check lib/client.js
node -e "JSON.parse(require('fs').readFileSync('themes/prc-people.dsh-theme.json','utf8')); console.log('theme json ok')"
```

## License

MIT
