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
  Undefined,
} from "runtypes";

const ConfigYeet = Record({
  run: String,
});

const ConfigDiscord = Record({
  tokens: Array(String),
});

const ConfigPurge = Record({
  enabled: Boolean,
  keep_days: Number,
});

const ConfigIgnore = Record({
  servers: Array(String).Or(Undefined),
  users: Array(String).Or(Undefined),
});

export const Config = Record({
  yeet: ConfigYeet,
  discord: ConfigDiscord,
  purge: ConfigPurge,
  ignore: ConfigIgnore.Or(Undefined),
});
