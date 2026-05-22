FROM nginx:1.27-alpine

COPY . /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=8080
ENV API_BASE_URL=http://localhost:8080

RUN apk add --no-cache gettext

CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && envsubst '$API_BASE_URL' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && exec nginx -g 'daemon off;'"]
