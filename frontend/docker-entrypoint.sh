#!/bin/sh -eu

# replace environment value
sed -i "s/\${PROXY_PASS}/${PROXY_PASS:-api}/" /etc/nginx/nginx.conf
if [[ ${FORCE_SECURE} = "true" ]]; then
  sed -i "s/\${FORCE_SECURE}/add_header Strict-Transport-Security \"max-age=31536000\";/" /etc/nginx/nginx.conf
else
  sed -i "s/\${FORCE_SECURE}//" /etc/nginx/nginx.conf
fi

exec "$@"
