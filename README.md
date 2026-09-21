# luci-app-vlmcsd

LuCI support for Vlmcsd KMS Server, implemented using modern LuCI JavaScript APIs (client-side rendering) without legacy `luci-compat` dependencies.

## Overview

- **Frontend**: Native LuCI JS (`form.Map`, `rpc`, `poll`, `view`), fully compatible with OpenWrt 22.03+ and mainline.
- **Service Management**: Procd init script managing daemon lifecycle, firewall WAN rules, and dnsmasq SRV record injection (`_vlmcs._tcp.lan`).
- **Configuration**: Graphical UCI configuration for port, LCID, worker threads, renewal intervals, and log management.
- **Bundled Core**: Includes local `vlmcsd` package source to avoid external fetch failures during buildroot compilation.

## Repository Structure

```
├── Makefile                # Package build definition
├── htdocs/                 # LuCI JavaScript view
│   └── luci-static/resources/view/vlmcsd.js
├── root/
│   ├── etc/
│   │   ├── config/vlmcsd   # Default UCI config
│   │   └── init.d/vlmcsd   # Procd service init script
│   └── usr/share/
│       ├── luci/menu.d/    # LuCI menu entry definition
│       └── rpcd/acl.d/     # RPCD ACL permissions
├── po/                     # Gettext translations (zh_Hans, zh_Hant)
└── vlmcsd/                 # Underlying vlmcsd package source
```

## Build Integration

Add this repository to your OpenWrt build environment:

```bash
git clone https://github.com/permails/luci-app-vlmcsd.git package/luci-app-vlmcsd
```

Enable in `make menuconfig`:

```text
LuCI --->
  3. Applications --->
    <*> luci-app-vlmcsd
```

## UCI Configuration Reference

File: `/etc/config/vlmcsd`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | boolean | `0` | Enable or disable KMS service |
| `auto_activate` | boolean | `1` | Automatically add DNS SRV record to dnsmasq |
| `internet_access` | boolean | `0` | Open firewall port to allow WAN connections |
| `port` | port | `1688` | KMS listen port |
| `lcid` | integer | `1033` | Locale ID for generated ePIDs (e.g. 1033, 2052, 1028) |
| `max_workers` | integer | `4` | Maximum concurrent worker processes |
| `activation_interval` | string | `2h` | Unactivated client retry interval |
| `renewal_interval` | string | `7d` | Activated client renewal interval |
| `log_enabled` | boolean | `0` | Write activation logs to `/var/log/vlmcsd.log` |
| `log_verbose` | boolean | `0` | Enable verbose log output (`-v`) |

## License

Licensed under the Apache License, Version 2.0.
Upstream vlmcsd binary licensed under MIT.
