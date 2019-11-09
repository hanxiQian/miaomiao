import Vue from 'vue';
import MessageBox from './MessageBox';


export var messageBox = (function(){
    var defaults = {
        // 默认值
        title :"",
        content: '',
        cancel : '',
        ok : '',
        handleCancel : null,
        handleOk : null
    };
    return function( opts ){//配置参数
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
        var MyComponent = Vue.extend(MessageBox);  //extend可以结合vue和js
        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.bind(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.bind(this);
                    document.body.removeChild (vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el);
    }
});