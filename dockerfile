FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm run generate
RUN npm run build

EXPOSE 3000

CMD /wait-for-it.sh db:3306 --strict --timeout=60 -- \
  sh -c "npm run migrate && npm start"
