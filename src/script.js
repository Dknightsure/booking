require('./style/animation.css')
require('./style/bootstrap.css')
require('./style/dialog.css')
require('./style.css')
var $ = require('jquery')
var moment = require('moment')
require('./vendor/fullcalendar/fullcalendar')($, moment);
require('./vendor/fullcalendar/scheduler.js')($, moment);
var http = require('./libs/http.js')($)
var noty = require('./vendor/noty')($)

$(function() {
    if(!'placeholder' in document.createElement('input')){
        document.write('<h1 style="text-align:center;padding:50px;">会议室预定请使用chrome，firefox，ie8+或者各种国内极速版！</h1>');
        return;
    }

    var notyoptions = {
        killer:true,
        theme: 'relax',
        animation: {
            open: 'animated flipInX ',
            close: 'animated flipOutX '
        }
    }

    var customButtons = {}
    var resourceRender = function(){}

    if(window.glob && glob.admin){
        customButtons.promptResource = {
            text: '添加会议室',
            click: function() {
                noty({
                    modal:true,
                    text: '<div>'
                            +'<h3>添加会议室</h3>'
                            +'<div class="form-group"><input class="noty-event form-control input-sm" placeholder="请输入会议室名称"/></div>'
                            +'<div class="form-group"><input class="noty-color form-control input-sm" placeholder="请输入会议背景色（选填）"/></div>'
                            +'</div>',
                    type: 'confirm',
                    animation: {
                        open: 'animated flipInX ',
                        close: 'animated flipOutX '
                    },
                    killer:true,
                    layout: 'center',
                    theme: 'relax',
                    closeWith:['button'],
                    buttons: [{
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function($noty) {
                            var title = $noty.$message.find('.noty-event').val();
                            var color = $noty.$message.find('.noty-color').val();
                            if (!title) {
                                var $n = noty({
                                    layout: 'top',
                                    text: '名称不可为空',
                                    type: 'error',
                                    theme: 'relax'
                                })
                                setTimeout(function() {
                                    $n.close()
                                }, 3000)
                                return
                            }
                            var roomData = {
                                name: title,
                                title:title,
                                eventColor:color
                            }

                            http.post('rooms',roomData).then(function(data){
                                if(data.errno == 1){
                                    roomData.id = data._id
                                    $('#calendar').fullCalendar('addResource', roomData,true) // scroll to the new resource?
                                    $noty.close();
                                    var $n = noty({
                                        text: '会议室添加成功',
                                        type: 'success',
                                        theme: 'relax'
                                    });
                                    setTimeout(function() {
                                        $n.close()
                                    }, 3000)
                                }else{
                                    var $n = noty({
                                        text: '发生错误',
                                        type: 'error'
                                    });
                                    setTimeout(function() {
                                        $n.close()
                                    }, 3000)
                                }
                            })
                        }
                    }, {
                        addClass: 'btn btn-danger',
                        text: 'Cancel',
                        onClick: function($noty) {
                            $noty.close();
                            $('#calendar').fullCalendar('unselect');
                        }
                    }]
                });
            }
        }
        resourceRender = function(resource, cellEls){
            cellEls.on('click', function() {
                noty({
                    modal:true,
                    text: '<div>'
                            +'<h3>删除会议室</h3>'
                            // +'<div class="form-group"><input class="noty-event form-control input-sm" placeholder="请输入会议室主题"/></div>'
                            +'<div class="form-group"><input class="noty-belongs form-control input-sm" placeholder="输入会议室管理密码"/></div>'
                            +'</div>',
                    type: 'confirm',
                    animation: {
                        open: 'animated flipInX ',
                        close: 'animated flipOutX '
                    },
                    killer:true,
                    layout: 'center',
                    theme: 'relax',
                    closeWith:['button'],
                    buttons: [{
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function($noty) {
                            var belongs = $noty.$message.find('.noty-belongs').val()
                            if (!belongs) {
                                var $n = noty({
                                    layout: 'top',
                                    text: '密码不可为空',
                                    type: 'error'
                                })
                                setTimeout(function() {
                                    $n.close()
                                }, 3000)
                                return
                            }

                            var roomData = {
                                id:resource.id,
                                belongs: belongs
                            };
                            http.delete('rooms',roomData).then(function(data){
                                if(data.errno == 0){
                                    var $n = noty({
                                        text: '会议室管理密码不正确',
                                        type: 'error',
                                        theme: 'relax'
                                    });
                                    setTimeout(function() {
                                        $n.close()
                                    }, 3000)
                                }else{
                                    $('#calendar').fullCalendar('removeResource', resource);
                                    var $n = noty({
                                        text: '会议室删除成功',
                                        type: 'success'
                                    });
                                    setTimeout(function() {
                                        $n.close()
                                    }, 3000)
                                    $noty.close();
                                }
                            })
                        }
                    }, {
                        addClass: 'btn btn-danger',
                        text: 'Cancel',
                        onClick: function($noty) {
                            $noty.close();
                            $('#calendar').fullCalendar('unselect');
                        }
                    }]
                })
            });
        }
    }

    var pops;
    var options = {
        now: '',
        lang:'zh-CN',
        columnFormat:'ddd',
        buttonText:{
            today:    '返回当前',
            month:    '本月',
            week:     '本周',
            day:      '本日'
        },
        editable: true,
        aspectRatio: 2,
        scrollTime: '00:00',
        minTime:'09:00',
        maxTime:'21:00',
        resourceAreaWidth:'150px',
        header: {
            left: 'promptResource today prev,next',
            center: 'title',
            right: 'timelineDay,timelineWeek,timelineMonth'
        },
        selectable: true,
        selectHelper: true,
        slotEventOverlap: false,
        selectOverlap: false,
        eventStartEditable:false,
        eventDurationEditable:false,
        select: function(start, end, event, view, resource) {
            var eventData;
            var that = this;
            var $ny = noty({
                modal:true,
                text: '<div>'
                        +'<h3>信息填写</h3>'
                        +'<div class="form-group"><input class="noty-user form-control input-sm" placeholder="请输入预订人"/></div>'
                        +'<div class="form-group"><input class="noty-event form-control input-sm" placeholder="请输入会议主题"/></div>'
                        +'<div class="form-group"><input class="noty-belongs form-control input-sm" placeholder="输入当前会议管理密码"/></div>'
                        +'</div>',
                type: 'confirm',
                killer:true,
                animation: {
                    open: 'animated flipInX ',
                    close: 'animated flipOutX '
                },
                layout: 'center',
                theme: 'relax',
                closeWith:['button'],
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        var title = $noty.$message.find('.noty-event').val();
                        var user = $noty.$message.find('.noty-user').val();
                        var belongs = $noty.$message.find('.noty-belongs').val()
                        if (!user || !title || !belongs) {
                            var $n = noty({
                                layout: 'top',
                                text: '预订人，标题或者密码不可为空',
                                type: 'error',
                                theme: 'relax'
                            })
                            setTimeout(function() {
                                $n.close()
                            }, 3000)
                            return
                        }
                        eventData = {
                            user: user,
                            title: title,
                            start: start,
                            end: end,
                            resourceId: resource.id,
                            belongs: belongs
                        };
                        http.post('events',
                            $.extend({}, eventData, {
                                start: eventData.start.toJSON(),
                                end: eventData.end.toJSON()
                            })
                        ).then(function(data) {
                            if(data.errno == 1){
                                eventData.title = eventData.user + '-' + eventData.title
                                eventData.id = data._id
                                $('#calendar').fullCalendar('renderEvent', eventData, true);
                                $noty.close();
                            }else{
                                var $n = noty({
                                    text: '会议室预定失败',
                                    type: 'warning',
                                    theme: 'relax'
                                });
                                setTimeout(function() {
                                    $n.close()
                                }, 3000)
                            }

                        })
                        $('#calendar').fullCalendar('unselect');
                        var $n = noty({
                            text: '会议室预定成功',
                            type: 'success',
                            theme: 'relax'
                        });
                        setTimeout(function() {
                            $n.close()
                        }, 3000)
                    }
                }, {
                    addClass: 'btn btn-danger',
                    text: 'Cancel',
                    onClick: function($noty) {
                        $noty.close();
                        $('#calendar').fullCalendar('unselect');
                    }
                }]
            });
        },
        eventMouseover:function(event,element){
            // pops = setTimeout(function(){
            //      noty({
            //         text:event.title,
            //         layout:'top',
            //         theme: 'relax',
            //         type:'information',
            //         killer:true,
            //         animation: {
            //             open: 'animated fadeIn ',
            //             close: 'animated fadeOut ',
            //             speed: 100
            //         }
            //     })
            // },1000)
        },
        eventMouseout:function(){
            // clearTimeout(pops)
        },
        eventClick: function(event, element) {
            noty({
                modal:true,
                text: '<div>'
                        +'<h3>信息修改</h3>'
                        +'<div class="form-group"><input class="noty-user form-control input-sm" placeholder="请修改预订人（选填）"/></div>'
                        +'<div class="form-group"><input class="noty-event form-control input-sm" placeholder="请修改会议主题（选填）"/></div>'
                        +'<div class="form-group"><input class="noty-belongs form-control input-sm" placeholder="请输入会议管理密码"/></div>'
                        +'</div>',
                type: 'confirm',
                killer:true,
                closeWith:['button'],
                animation: {
                    open: 'animated fadeIn ',
                    close: 'animated fadeOut '
                },
                layout: 'center',
                theme: 'relax',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        var user = $noty.$message.find('.noty-user').val();
                        var title = $noty.$message.find('.noty-event').val();
                        var belongs = $noty.$message.find('.noty-belongs').val()
                        if (!belongs) {
                            var $n = noty({
                                layout: 'top',
                                text: '密码不可为空',
                                type: 'error',
                                theme: 'relax'
                            })
                            setTimeout(function() {
                                $n.close()
                            }, 3000)
                            return
                        }

                        var _id = event.id
                        event.title = title?title:event.title;
                        event.user = user?user:event.user;
                        http.put('events', {
                            id:_id,
                            // event_id: _id,
                            user: user,
                            title: title,
                            belongs:belongs
                        }).then(function(data) {
                            if(data.errno == 0){
                                var $m = noty({text:'密码不正确！', type:'warning'})
                                setTimeout(function() {
                                    $m.close()
                                }, 3000)
                                return;
                            }else{
                                event.title = event.user + '-' + event.title
                                $('#calendar').fullCalendar('updateEvent', event)
                                $noty.close();
                                var $m = noty({
                                    text: '会议主题修改成功！',
                                    type: 'success',
                                    theme: 'relax'
                                });
                                setTimeout(function() {
                                    $m.close()
                                }, 3000)
                            }
                        })
                    }
                }, {
                    addClass: 'btn btn-danger',
                    text: 'Cancel',
                    onClick: function($noty) {
                        $noty.close();
                        $('#calendar').fullCalendar('unselect');
                    }
                },{
                    addClass: 'btn btn-danger',
                    text: 'Delete',
                    onClick: function($noty) {
                        var title = $noty.$message.find('.noty-event').val();
                        var belongs = $noty.$message.find('.noty-belongs').val()
                        if (!belongs) {
                            var $n = noty({
                                layout: 'top',
                                text: '密码不可为空!',
                                type: 'error',
                                theme: 'relax'
                            })
                            setTimeout(function() {
                                $n.close()
                            }, 3000)
                            return
                        }
                        http.delete('events', {
                            id: event._id,
                            belongs: belongs
                        }).then(function(data){
                            if(data.errno == 0){
                                var $m = noty({text:'密码不正确！', type:'warning'})
                                setTimeout(function() {
                                    $m.close()
                                }, 3000)
                                return;
                            }
                            $('#calendar').fullCalendar('removeEvents', event._id)
                            $noty.close();
                            var $m = noty({
                                text: '会议删除成功！',
                                type: 'success',
                                theme: 'relax'
                            });
                            setTimeout(function() {
                                $m.close()
                            }, 3000)
                        })

                        $('#calendar').fullCalendar('unselect');
                    }
                }]
            })
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        defaultView: 'timelineDay',
        resourceLabelText: '会议室列表',
        events: [],
        resources: []
    }

    Promise.all([http.get('events', {}), http.get('rooms', {})]).then(function(data) {

        var date = new Date(data[0].xhr.getResponseHeader('Date'))

        options.now = moment(date).format('YYYY-MM-DD')

        options.customButtons = customButtons;

        options.resourceRender = resourceRender;

        $.each(data[0], function(key, event) {
            options.events.push({
                id: event._id,
                user: event.user,
                // event_id: event.event_id,
                resourceId: event.resourceId,
                start: event.start,
                end: event.end,
                title: event.user + '-' + event.title
            })
        })

        $.each(data[1], function(key, room) {
            options.resources.push({
                id: room._id,
                // room_id: room.room_id,
                title: room.name,
                name:room.name,
                eventColor:room.event_color
            })
        })

        $('#calendar').fullCalendar(options);

    })



});
