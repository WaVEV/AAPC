FROM node:latest
COPY ./cp_ui /app
WORKDIR /app

RUN npm install

COPY ./cp_ui/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh
