/* Copyright (c) 2018 Richard Rodger and other contributors, MIT License */
'use strict'


module.exports = test_plugin

test_plugin.defaults = {
  bar: 100,
  zed: 200
}

test_plugin.errors = {
  'bad_foo': 'Bad foo: <%=foo%>.'
}

function test_plugin(options) {
  var bar = null

  this
    .add('role:test,cmd:foo', cmd_foo)
    .init(init)

  var Joi = this.util.Joi

  
  cmd_foo.validate = {
    size: Joi.number()
  }
  
  function cmd_foo(msg, reply) {
    if(!msg.bad) {
      reply({foo: intern.make_foo(msg.size), bar: bar, zed: options.zed})
    }
    else {
      throw this.fail('bad_foo', {foo: msg.size})
    }
  }


  function init(reply) {
    setTimeout(function() {
      bar = options.bar
      reply()
    }, 100)
  }

  
  return {
    exports: {
      qaz: {
        get_zed: function() {
          return options.zed
        }
      }
    }
  }
}


const intern = test_plugin.intern = {
  make_foo: function(size) {
    return size * 2
  }
}

