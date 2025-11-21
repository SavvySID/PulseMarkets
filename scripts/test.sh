 #!/usr/bin/env bash
 set -euo pipefail

echo ">> Running Rust tests"
pushd "$(dirname "$0")/../contracts/market" >/dev/null
cargo test
popd >/dev/null

echo ">> Running frontend tests"
pushd "$(dirname "$0")/../frontend" >/dev/null
pnpm install
pnpm test
popd >/dev/null



