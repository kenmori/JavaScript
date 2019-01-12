#!/bin/sh -eu

# replace environment value
sed -i "s/\${PROXY_PASS}/$PROXY_PASS/" /etc/nginx/nginx.conf
sed -i "s/\${FORCE_SECURE}/$FORCE_SECURE/" /etc/nginx/nginx.conf

exec "$@"
