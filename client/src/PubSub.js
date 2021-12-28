class PubSub {
  constructor(props) {
    this.obj = {};
  }

  on = (eventName, cb) => {
    this.obj[eventName] = this.obj[eventName] || [];
    this.obj[eventName].push(cb);
    return this;
  };

  publish = (eventName, ...result) => {
    const event = this.obj[eventName];
    event && event.forEach(cb => cb(...result));
  };
}

const a = new PubSub();
a.on("event", (...payload) => {
  console.log(...payload);
}).publish("event", "payload1", "test"); // should result in calling subscription