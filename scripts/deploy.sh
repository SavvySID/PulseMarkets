 #!/usr/bin/env bash
 set -euo pipefail

WORKSPACE_ROOT="$(dirname "$0")/.."
CONTRACT_DIR="$WORKSPACE_ROOT/contracts/market"

echo ">> Building contract for deployment"
cd "$CONTRACT_DIR"
cargo build --release --target wasm32-unknown-unknown

echo ">> TODO: integrate with linera-client deploy flow"
echo "Artifacts available under: $CONTRACT_DIR/target/wasm32-unknown-unknown/release"



