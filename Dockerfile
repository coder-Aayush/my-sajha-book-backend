FROM node:14-buster-slim

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN yarn prisma generate

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --ignore-engines

COPY . .

COPY . /app


RUN yarn  build

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

EXPOSE 3000


CMD [ "yarn", "start:prod" ]