#!/bin/bash
# ==========================================================
# 自动发布脚本 publish.sh
# 功能：
# 1. 临时切换到官方 npm 源
# 2. 自动构建项目
# 3. 发布 npm 包
# 4. 恢复国内镜像源
# ==========================================================

# 设置错误中断
set -e

# 当前镜像源
CURRENT_REGISTRY=$(npm config get registry)
OFFICIAL_REGISTRY="https://registry.npmjs.org/"
CN_REGISTRY="https://registry.npmmirror.com/"

echo "当前 npm 源：$CURRENT_REGISTRY"
echo "--------------------------------------"
echo "👉 正在临时切换到官方源发布..."
npm config set registry $OFFICIAL_REGISTRY

echo "✅ 当前源已切换为：$(npm config get registry)"
echo "--------------------------------------"

# 自动构建（可选）
if [ -f package.json ]; then
  if grep -q "\"build\"" package.json; then
    echo "🚧 检测到 build 脚本，正在构建项目..."
    npm run build
  else
    echo "⚠️  未检测到 build 脚本，跳过构建。"
  fi
fi

# 登录（如果之前没登录）
echo "👤 检查 npm 登录状态..."
npm whoami >/dev/null 2>&1 || npm login

# 发布包
echo "🚀 开始发布到 npm 官方源..."
npm publish --access public

# 恢复国内源
echo "--------------------------------------"
echo "🔁 恢复国内镜像源..."
npm config set registry $CN_REGISTRY
echo "✅ 当前源已恢复为：$(npm config get registry)"
echo "--------------------------------------"

echo "🎉 发布完成！"
