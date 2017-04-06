const {
	timer, 
	interval, getCount, 
	date, getTs
} = require('./timersAndDates');

beforeEach(() => {
	jest.useFakeTimers();
});

test('interval add increment every 100ms', () => {
  expect(getCount()).toBe(0);

  interval();

  expect(getCount()).toBe(0);

  jest.runTimersToTime(110)

  expect(getCount()).toBe(1);

  jest.runTimersToTime(110)
  
  expect(getCount()).toBe(2);
});

test('interval add increment every 100ms', () => {
	global.Date = jest.fn();

	date();
	
	const ts = getTs();
	console.log('TSS', ts)
	expect(ts).toBeInstanceOf(Date);
	expect(ts).toEqual(global.Date.mock.instances[0]);
});

afterEach(() => {
	jest.clearTimers
});
