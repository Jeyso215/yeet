import {
  Boolean,
  Number,
  String,
  Partial,
  Record,
  Array,
  Union,
  Null,
  Dictionary,
} from "runtypes";

const ConfigDiscord = Record({
  tokens: Array(String),
});

const ConfigPurge = Record({
  enabled: Boolean,
  keep_days: Number,
});

export const Config = Record({
  discord: ConfigDiscord,
  purge: ConfigPurge,
});
