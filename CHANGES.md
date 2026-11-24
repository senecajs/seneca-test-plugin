# Changes

## 0.2.0 2026-11-20

First entry of this change log. Earlier versions are on npm and in the git history.

* Seneca 4: the peer dependency is `seneca` `^4.0.0`. Version 0.1.0 had
  no `seneca` peer; Seneca 3 users stay on `@seneca/test-plugin@0.1`.
* Node.js 24 or later (`engines.node` `>=24`).
* The plugin code (`test-plugin.js`) is unchanged.
* Tests run on the Node.js test runner (`node --test`) with
  `node:assert`, in place of `lab` 18 and `code` 5, which do not run on
  current Node.js. The development dependency `seneca` is `^4.0.0` (it
  was the git reference `senecajs/seneca`). `seneca-promisify` and
  `use('promisify')` are removed, because promises are built into
  Seneca 4 (D4), and so is the removed option `legacy.transport` (D3).
* The test checks the `bad_foo` error by `code` and `details` as well
  as by its message.
* Removed `.travis.yml` (Node.js 8 and 10) and the `coveralls` script.
