/* Copyright (c) 2018-2026 Richard Rodger and other contributors, MIT License */
'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')

const Seneca = require('seneca')

const Plugin = require('..')

test('happy', async () => {
  const si = await seneca_instance(null, { bar: 300 })

  assert.deepEqual(await si.post('role:test,cmd:foo,size:2'), {
    foo: 4,
    bar: 300,
    zed: 200,
  })
  assert.equal(si.export('test_plugin/qaz').get_zed(), 200)

  await assert.rejects(si.post('role:test,cmd:foo,size:2,bad:true'), (e) => {
    assert.equal(e.code, 'bad_foo')
    assert.deepEqual(e.details, { foo: 2 })
    assert.equal(e.message, 'seneca: Bad foo: 2.')
    return true
  })

  await si.close()
})

async function seneca_instance(testmode, opts) {
  const si = Seneca().test(testmode).quiet().use(Plugin, opts)
  await si.ready()
  return si
}
