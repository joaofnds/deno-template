FROM denoland/deno:alpine

ENV DENO_ENV=production NODE_ENV=production

WORKDIR /app
COPY . .
RUN deno install --entrypoint src/main.ts
USER 1000

EXPOSE 3000
CMD ["dist/main.js"]