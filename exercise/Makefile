rmi:
	docker rmi js-testing

rm:
	docker stop testing & docker rm testing

build:
	docker rmi js-testing & docker build --force-rm=true -t js-testing .

start:
	docker run -it --rm=true  -p 3006:3006 -p 9090:9090 --name=testing js-testing /bin/sh

server:
	docker run -it --rm=true --net=bridge -p 3006:3006 -p 9090:9090 --name=testing js-testing npm start

test:
	docker run -it --rm=true --name=testing js-testing npm test