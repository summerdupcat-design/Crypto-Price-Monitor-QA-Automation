# Crypto Price Monitor QA Automation

基于 WebSocket 的加密货币行情 QA 自动化框架，用于实时校验多交易所 ticker 数据质量。

## Overview

本项目连接交易所 WebSocket 流，将不同交易所的原始行情适配为统一格式，并通过可插拔验证器链进行实时 QA 校验。

支持的 QA 场景：

- WebSocket 连接与订阅
- 多交易所行情适配（Adapter Pattern）
- 时间戳顺序校验
- 价格合法性校验
- 买卖价差校验
- 重复消息检测
- 跨交易所基准价偏差校验（Benchmark）
- 控制台 + HTML 双通道报告
- Jest 单元测试
- GitHub Actions CI

## Tech Stack

| 类别 | 技术 |
|------|------|
| Runtime | Node.js |
| WebSocket | `ws` |
| Testing | Jest |
| CI | GitHub Actions |

## Architecture

```text
Exchange WebSocket (OKX / Binance)
              ↓
       WebSocket Client
              ↓
            Adapter
              ↓
        StandardTicker
              ↓
       Message Handler
              ↓
      Validator Manager
              ↓
          Validators
   ├── TimestampValidator
   ├── PriceValidator
   ├── DuplicateValidator
   ├── BidAskValidator
   └── BenchmarkValidator
              ↓
           Reporters
    ├── Console Reporter
    └── HTML Reporter → reports/report.html
```

## Features

- **Multi-Exchange** — 同时支持 OKX、Binance，可扩展更多交易所
- **Adapter Pattern** — 原始 ticker 统一转换为 `StandardTicker`
- **Plugin Validators** — 验证器独立模块，由 `validatorManager` 编排
- **Benchmark Validator** — 以其他交易所中位数为基准，检测价格偏差
- **HTML Report** — 实时生成可视化校验报告
- **Fault Isolation** — 单个验证器异常不影响其他验证器

## Project Structure

```text
src/
├── adapters/          # 交易所行情适配
├── config/            # 交易所与校验阈值配置
├── handlers/          # WebSocket 消息处理
├── reporters/         # 控制台 / HTML 报告
├── state/             # 跨交易所市场状态
├── utils/             # 统计工具（中位数、偏差等）
├── validators/        # 各类验证器
└── websocket/         # WebSocket 客户端
tests/                 # Jest 单元测试
reports/               # HTML 报告输出目录
```

## Quick Start

### 安装依赖

```bash
npm install
```

### 启动监控

```bash
node src/app.js
```

启动后会连接 Binance；OKX 默认同时启用。校验结果输出到控制台，并写入 `reports/report.html`。

### 运行测试

```bash
npm test
```

当前测试结果：

```text
Test Suites: 6 passed, 6 total
Tests:       25 passed, 25 total
```

## Configuration

### 交易所配置 — `src/config/exchangeConfig.js`

| 配置项 | 说明 |
|--------|------|
| `OKX.WS_URLS` | OKX WebSocket 地址（支持多地址轮换） |
| `OKX.symbol` | 订阅交易对，如 `BTC-USDT` |
| `BINANCE.WS_URL` | Binance WebSocket 地址 |
| `BINANCE.symbol` | 订阅交易对，如 `btcusdt` |

### 校验阈值 — `src/config/validationConfig.js`

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `MAX_SPREAD_PERCENT` | `0.05` | 买卖价差上限（5%） |
| `MAX_BENCHMARK_DEVIATION` | `0.01` | 跨所基准价偏差上限（1%） |

### 环境变量

| 变量 | 说明 |
|------|------|
| `OKX_ENABLED=false` | 禁用 OKX 连接（网络受限时仅使用 Binance） |
| `HTTPS_PROXY` / `HTTP_PROXY` | 代理地址（需安装 `https-proxy-agent`） |

## Validators

| Validator | 说明 |
|-----------|------|
| `TimestampValidator` | 检测时间戳回退（消息乱序） |
| `PriceValidator` | 校验价格是否为有效正数 |
| `DuplicateValidator` | 检测重复推送消息 |
| `BidAskValidator` | 校验买卖价关系与价差阈值 |
| `BenchmarkValidator` | 与其他交易所中位价对比，检测异常偏差 |

## CI

项目使用 GitHub Actions，在每次 push / PR 到 `main` 分支时自动执行 `npm test`。

工作流文件：`.github/workflows/nodejs.yml`

## Screenshots

HTML 报告示例：运行 `node src/app.js` 后打开 `reports/report.html`。
