import { date2Snowflake, log, sleep } from "./common";
import config from "./config";
import * as DiscordAPI from "./DiscordAPI";
import ProgressBar from "progress";
import later from "@breejs/later";

if (!config.purge.enabled) {
  throw new Error(
    "lol u moron enable purge cuz this shit ain't doing anytihng else for u"
  );
}

const discordTimeout = 500;
const date = new Date();
date.setDate(date.getDate() - config.purge.keep_days);
const maxId = date2Snowflake(date);
let bar: ProgressBar | undefined;

async function yeetChan(token: string, data: any, real_max_id: string) {
  let ignored: string[] = [];
  let latestId: string | undefined = undefined;

  while (true) {
    let res: DiscordAPI.Results;
    try {
      let filters = {
        ...data,
      };

      if (data.sort === "oldest") {
        filters.min_id = latestId;
      } else {
        filters.max_id = latestId;
      }

      if (!filters.max_id || parseInt(filters.max_id) > parseInt(real_max_id)) {
        filters.max_id = real_max_id;
      }
      res = await DiscordAPI.waitForSearch(token, filters);
    } catch {
      continue;
    }
    const resMessages = res.messages;

    if (!res.total_results || res.total_results == 0 || !resMessages) {
      break;
    }

    if (!bar) {
      bar = new ProgressBar(":bar :percent :current/:total eta: :eta s", {
        total: res.total_results,
      });
    }

    const messages: any[] = resMessages.map((x: any) => {
      return x.reduce((acc: any, val: any) => (val.hit ? val : acc));
    });

    for (var i = 0; i < messages.length; i++) {
      if (!ignored.includes(messages[i].id)) {
        while (true) {
          try {
            latestId = messages[i].id;
            await DiscordAPI.removeMessage(
              token,
              messages[i].channel_id,
              messages[i].id
            );
            bar.tick();
            await sleep(discordTimeout);
            break;
          } catch (e) {
            try {
              if (e.message === "No") {
                ignored.push(messages[i].id);
                break;
              }
            } catch (e) {}
            await sleep(discordTimeout);
          }
        }
      }
    }
  }

  await sleep(2000);
}

async function yeet() {
  for (const token of config.discord.tokens) {
    const account = await DiscordAPI.getUser(token);
    if (!account) {
      throw new Error("no account");
    }

    log("acc: ", account.username + "#" + account.discriminator);
    log("-- dms");
    const dms = await DiscordAPI.getOfType(token, "channel");
    for (const chan of dms) {
      log(
        "---- ",
        chan.recipients.reduce(
          (acc: string, y: any, i: number) =>
            (i != 0 ? acc + ", " : "") + y.username + "#" + y.discriminator,
          ""
        )
      );
      if (
        chan.recipients.length === 1 &&
        config.ignore?.users?.includes(chan.recipients[0].id)
      ) {
        log("---- ignoring...");
        continue;
      }

      await yeetChan(
        token,
        {
          target: chan.id,
          type: "channel",
          author_id: account.id,
        },
        maxId
      );
      if (bar) {
        bar.terminate();
        bar = undefined;
      }
    }

    log("-- servers");
    const servers = await DiscordAPI.getOfType(token, "guild");
    for (const chan of servers) {
      log("---- ", chan.name);
      if (config.ignore?.servers?.includes(chan.id)) {
        log("---- ignoring...");
        continue;
      }

      await yeetChan(
        token,
        {
          target: chan.id,
          type: "guild",
          author_id: account.id,
        },
        maxId
      );
      if (bar) {
        bar.terminate();
        bar = undefined;
      }
    }
  }
}

if (config.yeet.run === "once") {
  yeet();
} else {
  later.date.localTime();
  const parsed = later.parse.text(config.yeet.run);
  later.setInterval(yeet, parsed);
}
