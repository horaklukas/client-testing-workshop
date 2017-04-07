rmi:
	docker rmi js-testing

rm:
	docker rm testing

build: rmi
	docker build --force-rm=true -t js-testing .

start:
	docker run -it --rm=true  -p 3006:8080 --name=testing js-testing /bin/sh

server:
	docker run -it --rm=true --net=bridge -p 3006:8080 --name=testing js-testing npm start

test:
	docker run -it --rm=true --name=testing js-testing npm test