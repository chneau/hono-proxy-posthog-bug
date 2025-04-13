# hono-proxy-posthog-bug

A minimal bug reproduction to show a small issue with Hono proxy proxying to
posthog

## Steps to reproduce

```bash
# install dependencies
bun install
# set your POSTHOG_TOKEN="..." in a .env file
# or just pass it to bun start
POSTHOG_TOKEN="..." bun start
# run the server
bun start

# go to http://localhost:9000
# try and refresh each kind of wways to initialize posthog
# 1. without proxy - works OK
# 2. with proxy following https://posthog.com/docs/advanced/proxy/remix
# 3. with proxy trying to use https://hono.dev/examples/proxy
```
