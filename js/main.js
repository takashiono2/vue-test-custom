(function(){
  'use strict';

  var app = new Vue({
    el: "#app",
    data: {
      newItem: '', 
      todos: [
        // {title: 'task1',isDone: false},
        // {title: 'task2',isDone: false},
        // {title: 'task3',isDone: true}
      ]
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
        var item = {
          title: this.newItem,
          isDone: false
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
        if (!confirm('delete finished?')) {
          return;
        }  
        this.todos = this.todos.filter(function(todo){
          return !todo.isDone;//終わってないものだけ残す            
        });
      }
    },
    computed: {
      remaining: function(){
        var items = this.todos.filter(function(todo){
          if (todo.isDone === false){
            return !todo.isDone;//falseを返す
          }else{
            return null;
          }
        });
        return items.length;
      }
    }
  });
})();