class PubSub {
  constructor(props) {
    this.arr = [];
  }

  on = (eventName, cb) => {
    this.arr.push({ cb, eventName });
  };

  publish = (eventName, ...result) => {
    const filteredArr = this.arr.filter(el => el.eventName === eventName);
    if (!!filteredArr.length) {
      filteredArr.forEach(obj => obj.cb(...result));
    }
  };
}

const a = new PubSub();
a.on("event", payload => {
  alert(payload);
});

a.publish("event", "payload"); // should result in calling subscription
