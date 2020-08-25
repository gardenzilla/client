FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]