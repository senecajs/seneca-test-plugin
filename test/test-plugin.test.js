/* Copyright (c) 2018-2022 Richard Rodger and other contributors, MIT License */
'use strict'

const Util = require('util')

const Lab = require('lab')
const Code = require('code')
const lab = (exports.lab = Lab.script())
const expect = Code.expect

// const PluginValidator = require('seneca-plugin-validator')
const Seneca = require('seneca')

const Plugin = require('..')


// TODO: replace with seneca-maintain
// lab.test('validate', Util.promisify(function(x,fin){PluginValidator(Plugin, module)(fin)}))


lab.test('happy', async () => {
  var si = await seneca_instance(null,{bar:300})
  expect(await si.post('role:test,cmd:foo,size:2')).equal({foo:4,bar:300,zed:200})
  expect(si.export('test_plugin/qaz').get_zed()).equal(200)

  try {
    await si.post('role:test,cmd:foo,size:2,bad:true')
    expect(false).true()
  }
  catch(e) {
    expect(e.code).equal('bad_foo')
    expect(e.message).equal('seneca: Bad foo: 2.')
  }
})



async function seneca_instance(testmode, opts) {
  return await Seneca({legacy:{transport: false}})
    .test(testmode)
    .quiet()
    .use('promisify')
    .use(Plugin, opts)
    .ready()
}
