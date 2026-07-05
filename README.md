# luci-app-vlmcsd (Modernized JS Edition)

[中文](README.md)

This is a heavily refactored KMS server interface (LuCI App) designed specifically for the latest versions of OpenWrt (22.03, 23.05, 24, 25 and above). The underlying KMS activation service is powered by the classic `vlmcsd`.

## 🌟 Core Features

This plugin completely abandons the obsolete Lua CBI rendering model, which has been deprecated by OpenWrt, and rewrites it using the latest JS (client-side rendering) standard, bringing lightning-fast opening speed and perfect compatibility.

### 1. Deep Adaptation to the Latest Frontend Architecture
Perfectly compatible with the latest OpenWrt mainline. You no longer need to install any historical compatibility packages like `luci-compat` to use it normally.

### 2. Say Goodbye to Handwritten Configs, Fully Graphical Parameters
The old version only allowed users to write the `.ini` configuration file manually in a text box. Now, we have directly integrated the most core and valuable parameters of the `vlmcsd` backend into the Web UI:
*   **Listen Port**: Say goodbye to fixed 1688, support arbitrary custom ports to prevent ISP blocking.
*   **Language / Region (LCID)**: Supports dropdown selection of `1033 (English)`, `2052 (Simplified Chinese)`, etc., making ePID more localized.
*   **Max Workers**: Control the concurrent thread occupation of the soft router.
*   **Renewal & Activation Interval**: Visually configure the time interval for clients (Windows/Office) to renew from the router (e.g., 2h or 7d).

### 3. One-Click Visual Activation Log
This is the most thoughtful new feature: **You can now directly view who has activated the KMS service in real-time on the webpage!**
After enabling logging in "Advanced Settings", switch to the "Activation Log" tab, and you can see all connected IP addresses, time, and the system version they activated (such as Windows 11 or Office 2021) at a glance.

### 4. More Powerful Process Daemon
Built-in `procd` startup script conforming to official OpenWrt standards. It will automatically handle firewall allow rules based on your interface settings, and automatically inject DNS SRV records (for LAN auto-discovery) into Dnsmasq.

## 📦 Installation & Compilation

Please ensure that the `vlmcsd` core package already exists in your compilation environment. Then pull this source code into the `package` directory of your OpenWrt source code:

```bash
cd package/
git clone https://github.com/permails/luci-app-vlmcsd.git luci-app-vlmcsd
```

Then enable it in `make menuconfig`:
```
LuCI ---> Applications ---> <*> luci-app-vlmcsd
```

## 📜 Credits
- Underlying activation program: [Wind4/vlmcsd](https://github.com/Wind4/vlmcsd)
- The original prototype of the plugin refers to the contributions of many open-source community authors (such as Lean), and a modernized refactoring was completed on this basis.


---


# luci-app-vlmcsd (Modernized JS Edition)

[English](README_EN.md)

这是一个专为最新版 OpenWrt (22.03, 23.05, 24, 25 及以上版本) 深度重构的 KMS 服务器插件界面 (LuCI App)。底层的 KMS 激活服务由经典的 `vlmcsd` 提供。

## 🌟 核心特性

本插件彻底抛弃了已被 OpenWrt 淘汰的旧版 Lua CBI 渲染模型，采用最新的 JS (客户端渲染) 规范重写，带来了极致的打开速度和完美的兼容性。

### 1. 深度适配最新的前端架构
完美兼容 OpenWrt 最新主线，不再需要额外安装 `luci-compat` 等任何历史兼容包即可正常使用。

### 2. 告别手写配置文件，参数全图形化
以往的旧版本只能让用户在一个文本框中手写 `.ini` 配置文件，现在，我们将 `vlmcsd` 后端最核心、最有价值的参数直接接入了 Web UI：
*   **监听端口 (Port)**：告别固定 1688，支持任意自定义端口，防 ISP 屏蔽。
*   **语言区域 (LCID)**：支持下拉选择 `1033 (英文)`、`2052 (简中)` 等，让 ePID 更加本地化。
*   **最大并发 (Max Workers)**：控制软路由的并发线程占用。
*   **续期与检查频率**：直观配置客户端（Windows/Office）来找路由器续期的时间间隔（如 2h 或 7d）。

### 3. 一键可视化激活日志
这是最贴心的新增功能：**您现在可以直接在网页端实时查看都有谁激活了 KMS 服务！**
在“高级设置”中开启日志后，切换到“激活日志”选项卡，即可一目了然地看到所有连接过来的 IP 地址、时间、以及它们激活的系统版本（如 Windows 11 或 Office 2021）。

### 4. 更加强大的进程守护
内置了符合 OpenWrt 官方规范的 `procd` 启动脚本。它会根据您的界面设置自动处理防火墙放行规则，以及将 DNS SRV 记录（用于局域网自动发现）自动注入到 Dnsmasq 中。

## 📦 安装与编译方法

请确保您的编译环境中已经存在 `vlmcsd` 核心包。然后将本源码拉取到您的 OpenWrt 源码 `package` 目录下：

```bash
cd package/
git clone https://github.com/permails/luci-app-vlmcsd.git luci-app-vlmcsd
```

接着在 `make menuconfig` 中开启：
```
LuCI ---> Applications ---> <*> luci-app-vlmcsd
```

## 📜 鸣谢
- 底层激活程序：[Wind4/vlmcsd](https://github.com/Wind4/vlmcsd)
- 原始插件雏形参考了诸多开源社区作者（如 Lean 等）的贡献，在此基础上完成了现代化的重构。
