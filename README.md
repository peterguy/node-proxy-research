# node-proxy-research
Some research into how to use proxies in NodeJS, including Unix Domain Socket proxies.

Using [agent-base](https://www.npmjs.com/package/agent-base) and the [proxy-agents](https://github.com/TooTallNate/proxy-agents) packages.

For the experiments that use a Unix Domain Socket, you can use `socat` plus `mitmproxy`.

```
brew install socat mitmproxy
```

```
mitmweb
```

```
socat -d -d unix-listen:~/https-proxy.sock,fork tcp:localhost:8080
```

You can run either `mtimproxy` or `mtimweb`. `mtimweb` lets you interact with the requests in a browser.

The `-d -d` for `socat` turns on debug logging so you can see requests being made in the terminal.

Make sure that the path for `unix-listen` - `/tmp/https-proxy.sock` matches the path used in the code.

I was doing research specifically for proxying to my employer's site - https://sourcegraph.com - you probably want to change that for your testing.

I have one TypeScript test file in here that probably doesn't work.