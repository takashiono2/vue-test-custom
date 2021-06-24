(function(){
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {
      newItem:'',
      todos:[
        {title: 'task1' , isDone: false},
        {title: 'task2' , isDone: false},
        {title: 'task3' , isDone: true}
      ]
    },
    watch: {
      // todos: function() {
      //   localStorage.setItem('todos', JSON.stringify(this.todos));
      //   alert('Data saved!');
      // }
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saved!');
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods:{
      addItem: function(){
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index){
        if(confirm('are you sure?')){
          this.todos.splice(index,1);
        }
      },
      purge: function() {
        if (!confirm('delete finished?')) {
          return;
        }
        // this.todos = this.todos.filter(function(todo) {
        //   return !todo.isDone;
        // });
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function() {
        // var items = this.todos.filter(function(todo) {
        //   return !todo.isDone;
        // });
        // return items.length;
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  })
})();
