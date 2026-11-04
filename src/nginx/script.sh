#!/bin/sh

if [ ! -f /etc/nginx/certs/nginx.crt ]; then
	mkdir -p /etc/nginx/certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/nginx/certs/nginx.key \
		-out /etc/nginx/certs/nginx.crt \
		-subj "/C=AT/ST=Vienna/L=Vienna/O=42/CN=tic-tac-toer.dev"
fi

exec nginx -g "daemon off;"
