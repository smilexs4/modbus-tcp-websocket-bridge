import { client as ModbusClient } from "jsmodbus";
import websocketStream from "websocket-stream";

const stream = websocketStream("ws://192.168.100.191:8502");

const client = new ModbusClient.TCP(stream);

stream.on("connect", async () => {
  console.log("Connected to Modbus Server via WebSocket");

  try {
    const result = await client.readHoldingRegisters(0, 2);
    console.log("Data:", result.response.body.values);
  } catch (err) {
    console.error("Modbus Error:", err);
  }
});

stream.on("error", (err) => {
  console.error("Connection Error:", err);
});
