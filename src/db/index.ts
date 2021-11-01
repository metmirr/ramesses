import { ReadonlyDateWithNanoseconds } from '@cosmjs/tendermint-rpc';
import { getConnection } from './connection';

interface Block {
  height: BigInt;
  chainId: string;
  createdAt: Date;
}

export class DbManager {
  static async insertBlock(block: Block) {
    const { height, chainId, createdAt } = block;

    const conn = await getConnection();
    try {
      await conn.query(
        `
        INSERT Block {
          height := <bigint>$height,
          chain_id := <str>$chainId,
          created_at := <datetime>$createdAt
        }`,
        {
          height,
          chainId,
          createdAt: createdAt as Date,
        }
      );
    } finally {
      conn.close();
    }
  }
}
