import { BadgerAPI, Network, VaultSnapshot } from '@badger-dao/sdk';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function updatePrices() {
  const vaults: VaultSnapshot[] = [];
  for (const network of Object.values(Network)) {
    try {
      const api = new BadgerAPI({ network, baseURL: 'https://staging-api.badger.com/v2' });
      const networkVaults = await api.loadVaults();
      networkVaults.forEach((vault) => {
        vaults.push({
          address: vault.vaultToken,
          block: 0,
          timestamp: Date.now(),
          strategyBalance: vault.balance - vault.available,
          boostWeight: vault.boost.weight,
          totalSupply: 0,
          yieldApr: vault.yieldProjection.yieldApr,
          harvestApr: vault.yieldProjection.harvestApr,
          available: vault.available,
          balance: vault.balance,
          pricePerFullShare: vault.pricePerFullShare,
          strategy: vault.strategy,
          value: vault.value,
          apr: vault.apr,
        });
      });
    } catch {}
  }
  writeFileSync(resolve(__dirname, '../vault-snapshots.json'), JSON.stringify(vaults, null, 2));
}

updatePrices();
