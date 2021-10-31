import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

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
    next: (b) => {
      const { txs, header } = b;
      const { height } = header;
      console.log(`BLOCK SUBSCRIPTION`, height);
    },
    complete: () => {
      subscription.unsubscribe();
      return;
    },
  });
}
