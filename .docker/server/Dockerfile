FROM denoland/deno:2.0.4


WORKDIR /app

COPY . .

RUN deno install
RUN deno cache deps.ts

EXPOSE 8000

RUN chmod +x ./.docker/server/entrypoint.sh

CMD deno task dev
