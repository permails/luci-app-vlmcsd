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
