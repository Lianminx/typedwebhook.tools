# Lianmin Webhook 调试工具

- 地址：https://lianmin-webhooks.uptimeworker.workers.dev
- 原项目：https://github.com/inngest/typedwebhook.tools
- 配置：`wrangler.personal.jsonc`，不要使用上游的旧 `wrangler.toml`。
- 使用免费 Workers、KV 和 SQLite Durable Objects；不需要 R2、自定义域名或 Inngest 账号。
- 接收地址有效期 30 分钟；打开页面建立 WebSocket 后，再向页面显示的地址发送请求。会话读取依赖随机令牌，不是持久化收件箱。
- 已移除向上游发送使用事件的调用和请求头日志。

## 更新部署

```powershell
npm ci
Push-Location ui
npx --yes yarn@1.22.22 install --frozen-lockfile --ignore-engines --non-interactive
$env:CF_PAGES='1'
npm run build
Pop-Location
node prepare-deploy.mjs
npx wrangler@4.130.0 deploy --config wrangler.personal.jsonc
```

2026-09-17 使用 Node.js 22.22.2。此项目采用较旧的 SvelteKit，构建已将 highlight.js 打入服务端包以兼容当前 Node.js。`prepare-deploy.mjs` 准备静态资源，排除服务端 Worker 文件；`src/personal.ts` 将页面、Webhook 和 WebSocket 接入同一 Worker。

## 已验证与边界

2026-09-17 线上首页返回 200；创建会话后 WebSocket 成功连接，POST 测试 JSON 返回 200，接收内容与发送内容一致。前端 WASM 类型生成功能尚未在浏览器中验证。

当前机器通过代理访问 workers.dev 成功，直连可达性不保证。修改后提交推送 GitHub；推送不自动发布。
