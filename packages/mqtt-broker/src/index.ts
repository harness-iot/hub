import Aedes, { Client } from "aedes";
import { createServer } from "net";

const port = 1883;
const aedes = Aedes();
const server = createServer(aedes.handle);

const nodeSecret = (client: Client) => {
  if (!client || !client.id) {
    return;
  }

  const clientId = client.id.split(":");

  if (clientId[0] !== "input" && clientId[0] !== "output") {
    return;
  }

  return clientId[1];
};

server.listen(port, function () {
  console.log(` ********** Broker listening on port: ${port} **********`);
});

aedes.on("ping", function (_packet, client) {
  const secret = nodeSecret(client);

  if (secret) {
    aedes.publish(
      {
        cmd: "publish",
        topic: "ping",
        payload: secret,
        retain: false,
        dup: false,
        qos: 0,
      },
      (err) => {
        if (!err) {
          return;
        }

        console.log("Failed to publish ping");
      }
    );
  }
});

aedes.on("subscribe", function (subscriptions, client) {
  console.log(
    "MQTT client \x1b[32m" +
      (client ? client.id : client) +
      "\x1b[0m subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    aedes.id
  );

  if (client && client.id === "controller") {
    const online = subscriptions.find((s) => s.topic === "controller_online");

    if (online) {
      aedes.publish(
        {
          cmd: "publish",
          topic: "controller_online",
          payload: "",
          retain: false,
          dup: false,
          qos: 0,
        },
        (err) => {
          if (!err) {
            return;
          }

          console.log("Failed to publish controller_online");
        }
      );
    }
  }
});

aedes.on("unsubscribe", function (subscriptions, client) {
  console.log(
    "MQTT client \x1b[32m" +
      (client ? client.id : client) +
      "\x1b[0m unsubscribed to topics: " +
      subscriptions.join("\n"),
    "from broker",
    aedes.id
  );
});

// fired when a client connects
aedes.on("client", function (client) {
  console.log(
    "Client Connected: \x1b[33m" + (client ? client.id : client) + "\x1b[0m",
    "to broker",
    aedes.id
  );
});

// fired when a client disconnects
aedes.on("clientDisconnect", function (client) {
  console.log(
    "Client Disconnected: \x1b[31m" + (client ? client.id : client) + "\x1b[0m",
    "to broker",
    aedes.id
  );
});

// fired when a message is published
aedes.on("publish", async function (packet, client) {
  // const isHeartBeat = new RegExp("\\$SYS/.*/heartbeat").test(packet.topic);

  // if (isHeartBeat) {
  //   // Don't log
  //   return;
  // }

  // const isPing = new RegExp("ping/*").test(packet.topic);

  // if (isPing) {
  //   return;
  // }

  console.log(
    "Client \x1b[31m" +
      (client ? client.id : "BROKER_" + aedes.id) +
      "\x1b[0m has published",
    packet.payload.toString(),
    "on",
    packet.topic,
    "to broker",
    aedes.id
  );
});
