function timer() {

}

let count = 0;

const getCount = () => count;

const interval = () => setInterval(() => count = count + 1, 100);

let ts = 0;

const getTs = () => ts;

const date = () => ts = new Date();

module.exports = {
	getCount,
	interval,
	timer,
	getTs,
	date
};
