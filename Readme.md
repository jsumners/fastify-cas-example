# fastify-cas example

This is a demonstration project for [fastify-cas](https://npm.im/fastify-cas).
It includes Dockerfiles, and a `docker-compose` configuration, to run the demo
locally.

1. Clone the repository.
1. `npm install` within the repository root directory.
1. Add `127.0.0.1 app.example.com` and `127.0.0.1 cas.example.com` to your
`/etc/hosts` file.
1. Run `docker-compose up` within the repository root directory.
1. Open `http://app.example.com:9000` within your web browser.

The running app container exposes the Node debug port 9292. So using Chrome's
built-in Node DevTools via `chrome://inspect` is supported.

## Configuration
This app uses [nixconfig](https://npm.im/nixconfig) to manage the configuration.
Looking at [`lib/config.js`](lib/config.js) we can see, in the `module.exports`,
that we tell `nixconfig` what our app's name is for the purposes of configuration:
`cas-demo`. Given that knowledge, if we look at [`nodemon.json`](nodemon.json)
we can see that an environment variable is set that tells `nixconfig` about
an additional path where configuration files may be found. The value of this
variable is set to the path within the Docker container where we mount the
application; this happens to map to the root directory of the project. Thus, we
could create a `cas-demo.json`, or `cas-demo.js`, file in the root directory of
the project and override any of the settings withing `config.js`.
