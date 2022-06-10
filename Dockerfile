FROM node:alpine
WORKDIR c://windows
EXPOSE 3000
COPY ./ ./
RUN npm install
CMD ["npm", "start"]