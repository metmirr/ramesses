import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { DbManager } from './db';

export async function subscribeTx(client: Tendermint34Client) {
  const subscription = client.subscribeTx().subscribe({
    next: (x) => {
      console.log(x.height, x.hash, x.tx, x.result.events);
      console.log(`TX SUBSCRIPTION`);
    },
    complete: () => {
      subscription.unsubscribe();
      return;
    },
  });
}

// Subscriptions
export async function subscribeNewBlock(client: Tendermint34Client) {
  const subscription = client.subscribeNewBlock().subscribe({
    next: async (blockEvent) => {
      const { txs, header } = blockEvent;
      const { height, chainId, time: createdAt } = header;

      await DbManager.insertBlock({ height: BigInt(height), chainId, createdAt: createdAt as Date });
    },
    complete: () => {
      subscription.unsubscribe();
      return;
    },
  });
}
