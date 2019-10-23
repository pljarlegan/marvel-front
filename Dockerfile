FROM node:10.16.3 AS builder

RUN mkdir /ihm
WORKDIR /ihm
COPY . /ihm
RUN npm run build

FROM nginx:1.17-alpine AS ihm

COPY --from=builder /ihm/build /var/www
COPY --from=builder /ihm/src/config/nginx.conf /etc/nginx/nginx.conf
WORKDIR /var/www

CMD ["/bin/sh", "-c", "/var/www/build-env.sh && nginx -g 'daemon off;'"]
