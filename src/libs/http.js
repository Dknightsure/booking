function http($){

    var methods = {
        get: null,
        post: null,
        delete: null,
        put: null
    }

    $.each(methods,function(method,val) {
        methods[method] = function(type, params) {
            var promise = new Promise(function(resolve,reject){
                $.ajax({
                    url: '/' + type,
                    type: method,
                    data: params,
                    dataType: 'json',
                    success: function(d,n,x) {
                        d.xhr = x;
                        resolve(d)
                    },error:function(err){
                        reject(err)
                    }
                })
            })

            return promise
        }
    })

    return methods
}


module.exports = http
