using extension graphql;

module default {
  # Block metadata
  type Block {
    required property height -> bigint;
    required property chain_id -> str;
    required property created_at -> datetime;
  }
}
