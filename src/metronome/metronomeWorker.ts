let intervalID: number | null = null;
let interval = 100;

const intervalTick = () => {
  postMessage('t');
};

self.onmessage = (e: MessageEvent) => {
  if (e.data == 'start') {
    console.log('Start');
    intervalID = setInterval(() => {
      intervalTick();
    }, interval);
  }
  if (e.data.interval) {
    console.log('Interval');
    interval = e.data.interval;
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = setInterval(() => {
        intervalTick();
      }, interval);
    }
  }
  if (e.data == 'stop') {
    console.log('Stop');
    intervalID && clearInterval(intervalID);
    intervalID = null;
  }
};

postMessage('Work');
