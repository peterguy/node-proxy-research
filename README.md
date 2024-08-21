# node-proxy-research
Some research into how to use proxies in NodeJS, including Unix Domain Socket proxies.

Using [agent-base](https://www.npmjs.com/package/agent-base) and the [proxy-agents](https://github.com/TooTallNate/proxy-agents) packages.

For the experiments that use a Unix Domain Socket, you can use `socat`.

```
brew install socat
```

```
socat unix-listen:/tmp/https-proxy.sock,fork openssl:sourcegraph.com:443,verify=0
```

Make sure that the path for `unix-listen` - `/tmp/https-proxy.sock` matches the path used in the code.

I was doing research specifically for proxying to my employer's site - https://sourcegraph.com - you probably want to change that for your testing.

I have one TypeScript test file in here that probably doesn't work.