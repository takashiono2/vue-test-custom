(function(){
  'use strict';

  var app = new Vue({
    el: "#app",
    data: {
      newItem: '', 
      todos: [
        // {title: 'task1',time: nowTime,isDone: false},
        // {title: 'task2',time: nowTime,isDone: false},
        // {title: 'task3',time: nowTime,isDone: true}
      ],
      nowTime: '00:00'
    },
    watch: {
      todos: {
        handler: function(){
          localStorage.setItem('todos',JSON.stringify(this.todos))
          // alert('data saved!')
        },
        deep: true
      }
    },
    mounted: function(){
      this.todos = JSON.parse(localStorage.getItem('todos'))||[]
    },
    methods: {
      addItem: function(){
        var date = new Date();
        let month = (date.getMonth() + 1).toString().padStart(2, 0);
        this.nowTime = date.getFullYear()+ '年'+ month + '月' +　date.getDate().toString().padStart(2, 0)+ '日'                         
                        + date.getHours().toString().padStart(2, 0) + ':'+ date.getMinutes().toString().padStart(2, 0);
        var newStatus = this.status                
        var item = {
          title: this.newItem,
          time: this.nowTime,
          isDone1: false,
          isDone2: false,
          isShow: true
        }
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index){
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function(){//チェックがついているものを削除したい
        if (!confirm('選択されているタスクを削除でしてもいいですか？')) {
          return;
        } 
        this.todos = this.todos.filter(function(todo){
          return !todo.isDone2;//終わってないものだけ残す            
        });
      },
      clear: function(){//全部削除の場合
        if (!confirm('全タスクを削除でしてもいいですか？')) {
          return;
        } 
        this.todos.splice(0);
      },
      sorts: function(){
          this.todos.reverse();
      },
      go: function(){
        var item = this.todos.filter(function(todo){
          if(todo.isDone1 === false){//チェックがついていなければ
            todo.isDone1 = !todo.isDone1;//falseを返す
            todo.isShow = !todo.isShow;//
        // const app = document.querySelector('#app');
        // const ul = app.querySelectorAll('.ul');
        // const li = ul.querySelectorAll('.li');
        // li.forEach(function(e){
        //   console.log(e);
        // }
          }
      });
      }
    },
    computed: {
      remaining: function(){
        var items = this.todos.filter(function(todo){
          if (todo.isDone2 === false){
            return !todo.isDone2;//falseを返す
          }else{
            return null;
          }
        });
        return items.length;
      }
    }
  });
})();