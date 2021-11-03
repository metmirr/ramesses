using extension graphql;

module default {
  # Block metadata
  type Block {
    required property height -> bigint;
    required property chain_id -> str;
    required property created_at -> datetime;
  }

  type Transaction {
    required property hash -> bytes;
    required property block_id -> bigint;
    required link result -> TxResult;
  }

  type TxResult {
    required property code -> int64;
    required property gas_used -> int64;
    required property gas_wanted -> int64;
    property code_space -> int64;
    property data -> bytes;
    property log -> str;
    multi link events -> Event {
      # The exclusive constraint ensures that
      # this is a one-to-many relationship.
      constraint exclusive;
    }  
  }
}
