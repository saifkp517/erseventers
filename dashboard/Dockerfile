FROM node:20.10.0

COPY . /app
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && npm run build


CMD ["npm", "run" ,"start"] 
