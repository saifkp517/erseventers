FROM node:20.10.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm run build


COPY . .

CMD ["npm", "run" , "start"] 
