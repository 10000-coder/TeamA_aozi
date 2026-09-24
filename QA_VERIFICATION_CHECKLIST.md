# TeamA_aozi 前端质量规范与全量测试验证清单 (QA Specification & Verification Matrix)

> **目标**：100% 像素级高保真复刻 [aozi.family](https://www.aozi.family/) 前端体验（React 18 + Vite + Tailwind CSS + Lucide Icons），确保零构建报错、双主题无缝切换、全交互闭环模拟与全端响应式适配。

---

## 1. 代码质量与构建标准

### 1.1 Vite 构建规范
- [x] **执行命令**：`npm run build` 输出 exit code `0`
- [x] **告警要求**：打包过程零 error，模块转换完成
- [x] **产物体积控制**：单个 chunk 保持轻量（Gzip < 80KB）
- [x] **代码规范**：统一现代 ESModule 与 React 规范

---

## 2. 视觉规范与主题体系 (Design Tokens & Theme)

### 2.1 风格与调性
- **整体风格**：融合 Twitter/X 现代社交网络信息流 + Web3 极简专业金融交易终端风格。
- **排版字体**：
  - 衬线标题：Instrument Serif
  - 西文界面：Geist
  - 数字/价格/合约地址：Geist Mono

### 2.2 双主题（Dark / Light Mode）支持
- [x] **Dark 模式**：深度背景色 `#050606`，卡片 `#101212`，精致多阶径向光晕背景
- [x] **Light 模式**：背景色 `#f3f7fa`，卡片 `#ffffff`，浅蓝色/浅绿色径向光晕背景
- [x] **主题持久化**：`localStorage` 自动存储并读取，一键即时响应

---

## 3. 核心路由与页面完整性 (Routing & Navigation)

| 页面名称 | 路径 (Route) | 关键模块与元素 | QA 验证状态 |
| :--- | :--- | :--- | :--- |
| **首页 (Home)** | `/` | 模拟发币输入框、Launched by aozi 列表、Porch talk 动态、How it works 指南 | ✅ 已通过 |
| **代币详情页 (Token Detail)** | `/t/:address` | 价格/市值/持有人数、SVG 曲线图、交易流水 (Trades)、一键交易 | ✅ 已通过 |
| **飞轮中心 (The Flywheel)** | `/flywheel` | 1% 运转机制、国库实时数据看板、可拖拽日交易量计算器 | ✅ 已通过 |
| **文档中心 (Docs)** | `/docs` | 侧边目录锚点、Start here、Theses & Snipes、Pons Weather 天气、指令速查 | ✅ 已通过 |
| **发币指南 (Launch)** | `/launch` | 推文发币示例气泡、6大发币规则、拒绝违规场景展示 | ✅ 已通过 |
| **个人中心 (Profile / Wallet)** | `/profile` | X 登录状态切换、Robinhood Chain 钱包、充值 QR 码、私钥导出确认 | ✅ 已通过 |
| **条款与隐私 (Terms & Privacy)** | `/terms`, `/privacy` | 原汁原味的免责声明与服务条款 | ✅ 已通过 |

---

## 4. 核心交互与业务模拟全流程

- [x] **发币模拟**：输入 `@aozibot launch $TICKER Name`，触发 `aozi is typing...`，返回 automated 回复并生成带链接卡片
- [x] **买入/卖出交易**：支持预设比例 (25%, 50%, 75%, 100% 或 ETH 金额)，自动计算 1% 飞轮费率，触发拟真 Toast 提示
- [x] **飞轮滑块联动**：拖拽每日交易量（1 ~ 5000 ETH），动态计算日/月/年国库回购规模
- [x] **双模态框管理**：充值二维码弹窗与私钥导出二次确认风险弹窗
