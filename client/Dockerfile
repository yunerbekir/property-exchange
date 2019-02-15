FROM node:10.8.0-alpine as builder
WORKDIR /app
COPY . .

ARG CURRENT_VERSION
ARG CURRENT_DATE
RUN echo $CURRENT_VERSION
RUN echo $CURRENT_DATE
RUN npm install
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=builder /app/build /usr/share/nginx/html

ARG CURRENT_VERSION
ARG CURRENT_DATE

RUN sed -i "s,#gzip  on;,gzip  on;\n gzip_vary on;\n gzip_proxied any;\n gzip_comp_level 6;\n gzip_buffers 16 8k;\n gzip_http_version 1.1;\n gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;,g" /etc/nginx/nginx.conf
RUN sed -i "s,#gzip  on;,gzip  on;\n gzip_vary on;\n gzip_proxied any;\n gzip_comp_level 6;\n gzip_buffers 16 8k;\n gzip_http_version 1.1;\n gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;,g" /etc/nginx/nginx.conf.default
RUN sed -i 's,index  index.html index.htm;,index  index.html index.htm; \n try_files $uri /index.html;,g' /etc/nginx/conf.d/default.conf
RUN sed -i "s,package_version,$CURRENT_VERSION,g" /usr/share/nginx/html/index.html
RUN sed -i "s,build_date,$CURRENT_DATE,g" /usr/share/nginx/html/index.html

CMD sed -i "s,http://localhost:1234,$server,g" /usr/share/nginx/html/index.html && sed -i "s,http://10.65.2.92:7777,$server,g" /usr/share/nginx/html/index.html && nginx -g 'daemon off;'
