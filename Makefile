#
# Copyright (C) 2008-2014 The LuCI Team <luci@lists.subsignal.org>
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI support for Vlmcsd KMS Server
LUCI_DEPENDS:=+vlmcsd
LUCI_PKGMAINTAINER:=permails <logo@permails.com>

PKG_VERSION:=1.26.9
PKG_RELEASE:=1
PKG_MAINTAINER:=permails <logo@permails.com>

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
