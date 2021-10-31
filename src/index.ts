import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { decode, decodeMessage } from './parser';
import { subscribeNewBlock, subscribeTx } from './subscription';

let client: Tendermint34Client;

async function main() {
  console.log(`init...`);
  const url = 'ws://localhost:26657';

  client = await Tendermint34Client.connect(url);

  // Get node status
  const status = await client.status();

  // Get block transactions
  const b = await client.block(3418);
  const firstTx = b.block.txs[0];
  const decodedTx = decode(firstTx);
  console.log(decodedTx);

  const { authInfo, body, signatures } = decodedTx;

  const msg = decodeMessage(decodedTx.body.messages[0]);
  const value = msg.value;
  const str = Buffer.from(value).toString();

  // console.log(str);

  subscribeTx(client);
  subscribeNewBlock(client);

  console.log(`done`);
}

main().catch(console.error);
