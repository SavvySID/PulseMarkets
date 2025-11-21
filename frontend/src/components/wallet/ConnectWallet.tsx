import { useState } from "react";
import Button from "../ui/Button";

const mockWallets = [
  { label: "Rainbow", address: "0xA11CE...C0DE" },
  { label: "Linera Dev", address: "linera_dev_wallet" },
];

function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = () => {
    if (address) {
      setAddress(null);
      return;
    }
    setIsModalOpen(true);
  };

  const handleSelect = (next: string) => {
    setAddress(next);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={handleConnect}>
        {address ?? "Connect Wallet"}
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
            <p className="mb-4 text-sm font-semibold text-white">Select wallet</p>
            <div className="space-y-3">
              {mockWallets.map((wallet) => (
                <button
                  key={wallet.address}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left text-white hover:border-brand-500"
                  onClick={() => handleSelect(wallet.address)}
                >
                  <span>{wallet.label}</span>
                  <span className="text-xs text-slate-400">{wallet.address}</span>
                </button>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectWallet;
