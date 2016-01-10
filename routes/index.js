var express = require('express');
var router = express.Router();
var Room = require('../models').Room;
var Event = require('../models').Event;
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = req.query
    res.render('index',{title:'会议室预定',admin: (typeof query.admin == 'string')})
});

router.all('/rooms', function(req, res, next) {
    var method = req.method;
    var func = {};
    func.GET = function() {
        Room.find({}, function(err, docs) {
            if (err) {
                console.log(err)
            }
            res.send(docs)
        })
    }

    func.POST = function() {
        var body = req.body
        var room_params = _.extend({}, {
            errno: 1,
            message: '成功'
        }, {
            name: body.name,
            event_color: body.eventColor
        })

        var errmsg = [];
        _.forEach(room_params, function(val, key) {
            if (val == undefined) {
                errmsg.push(key + '不合法')
            }
        })

        if (errmsg.length) {
            res.send({
                errno: 0,
                message: errmsg.join()
            });
            return;
        }

        Room.create(room_params, function(err, docs) {
            if (err) {
                res.send({
                    errno: 1,
                    message: err
                })
                return;
            }
            res.send(_.extend({}, {
                errno: 1,
                message: '成功'
            }, docs._doc))
        })
    }

    func.DELETE = function() {
        var _id = req.body.id;
        var belongs = req.body.belongs

        if (!_id || belongs!='delete') {
            res.send({
                errno:0,
                message: "密码不正确"
            })
            return;
        }
        Room.findOneAndRemove({_id:_id}, function(err,docs) {
            console.log(docs)
            if (err) {
                res.send({
                    errno:0,
                    message: "失败"
                })
                return;
            }
            res.send({
                errno:1,
                message: '成功'
            })
        })
    }

    func.PUT = function() {
        var body = req.body;
        var _id = body.id;
        if (!_id) {
            res.send({
                errno: 0,
                message: "木有id"
            })
            return;
        }
        var room_params = _.extend({}, {
            errno: 1,
            message: '成功'
        })
        _.forEach(body, function(val, key) {
            if (val) {
                room_params[key] = val
            }
        })

        delete room_params.id;

        Room.findByIdAndUpdate(_id, room_params, {
            new: true
        }, function(err, docs) {
            if (err) {
                res.send({
                    errno: 0,
                    message: err
                })
                return;
            }
            res.send(_.extend({}, {
                errno: 1,
                message: '成功'
            }, docs._doc))
        })
    }

    try {
        func[method]()
    } catch (e) {
        res.send({
            errno:0,
            message: '000'
        })
    }
})

router.all('/events', function(req, res) {
    var method = req.method;
    var func = {};
    func.GET = function() {
        Event.find({}, function(err, docs) {
            if (err) {
                console.log(err)
            }
            res.send(docs)
        })
    }

    func.POST = function() {
        var body = _.isString(req.body) ? JSON.parse(req.body) : req.body;
        var event_params = _.extend({}, {
            errno: 1,
            message: '成功'
        }, {
            user: body.user,
            title: body.title,
            start: body.start,
            end: body.end,
            resourceId: body.resourceId,
            belongs: body.belongs
        })

        var errmsg = [];

        _.forEach(event_params, function(val, key) {
            if (val == undefined) {
                errmsg.push(key + '不合法')
            }
        })

        if (errmsg.length) {
            res.send({
                errno: 0,
                message: errmsg.join()
            });
            return;
        }

        Event.create(event_params, function(err, docs) {
            if (err) {
                res.send({
                    errno: 1,
                    message: err
                })
                return;
            }
            res.send(_.extend({}, {
                errno: 1,
                message: '成功'
            }, docs._doc))
        })
    }

    func.DELETE = function() {
        var _id = req.body.id
        var belongs = req.body.belongs

        if (!_id || !belongs) {
            res.send({
                'message': "木有id,或者密码不正确"
            })
            return;
        }
        Event.findOneAndRemove({_id:_id,belongs:belongs}, function(err,docs) {
            console.log(docs)
            if (err|| !docs) {
                res.send({
                    errno:0,
                    message: "失败"
                })
                return;
            }
            res.send({
                errno:1,
                message: '成功'
            })
        })
    }

    func.PUT = function() {
        var body = req.body;
        var _id = body.id;
        var belongs = body.belongs;

        if (!_id || !belongs) {
            res.send({
                'message': "木有id或者密码"
            })
            return;
        }
        var event_params = _.extend({}, {
            errno: 1,
            message: '成功'
        })
        _.forEach(body, function(val, key) {
            if (val) {
                event_params[key] = val
            }
        })

        delete event_params._id;
        delete event_params.belongs;

        Event.findOneAndUpdate({_id: _id,belongs: belongs}, event_params, {
            new: true
        }, function(err, docs) {
            if (err || !docs) {
                res.send({
                    errno:0,
                    message: err
                })
                return;
            }
            res.send(_.extend({}, {
                errno: 1,
                message: '成功'
            },docs._doc))
        })
    }

    try {
        func[method]()
    } catch (e) {
        res.send({
            message: e
        })
    }
})

module.exports = router;
