(function(){
  'use strict';

  var app = new Vue({
    el: "#app",
    data: {
      newItem: '', 
      todos: [
        'test1',
        'test2',
        'test3'
      ]
    },
    methods: {
      addItem: function(){
        this.todos.push(this.newItem);
        this.newItem = '';
      },
      deleteItem: function(index){
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      }
    }
  }) 
})();