 #!/usr/bin/env bash
 set -euo pipefail

echo ">> Building Linera contract"
pushd "$(dirname "$0")/../contracts/market" >/dev/null
cargo build --target wasm32-unknown-unknown --release
popd >/dev/null

echo ">> Building frontend"
pushd "$(dirname "$0")/../frontend" >/dev/null
pnpm install
pnpm build
popd >/dev/null

echo "Build complete."



