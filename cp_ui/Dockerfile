FROM node:latest
COPY ./cp_ui /app
WORKDIR /app

RUN npm install
RUN npm run build
RUN npm install -g serve

COPY ./cp_ui/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh
