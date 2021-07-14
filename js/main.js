(function(){
  'use strict';

  var app = new Vue({
    el: '#app',
    data: {    
      newItem: '', 
      todos: [
        // {title: 'task1',time: nowTime,isDone: false},
        // {title: 'task2',time: nowTime,isDone: false},
        // {title: 'task3',time: nowTime,isDone: true}
      ],
      nowTime: '00:00',
      arrival_date: null,
      min_date: null,
      uniqueKey: 0
    },
    created: function(){
      var dt = new Date();
      dt.setDate(dt.getDate()+1);
      this.arrival_date = this.formatDate(dt);
      this.min_date = this.arrival_date;
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
      formatDate: function(){
        var dt = new Date();
        var y = dt.getFullYear();
        var m = ('00'+(dt.getMonth()+1)).slice(-2);
        var d = ('00' + dt.getDate()).slice(-2);
        var result = y +'-'+ m +'-' + d;
        return result;
      },
      addItem: function(){
        var date = new Date();
        let month = (date.getMonth() + 1).toString().padStart(2, 0);
        this.nowTime = date.getFullYear()+ '年'+ month + '月' +　date.getDate().toString().padStart(2, 0)+ '日'                         
                        + date.getHours().toString().padStart(2, 0) + ':'+ date.getMinutes().toString().padStart(2, 0);
        // var newStatus = this.status
        let keyId = ++this.uniqueKey;
        var item = {
          title: this.newItem,
          time: this.nowTime,
          isDone1: false,
          isDone2: false,
          isShow: true,
          arrival_date: null,
          min_date: this.arrival_date,
          id: keyId
        }
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index){
        if (confirm('このタスクを削除してもいいですか?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function(){//チェックがついているものを削除したい
        if (!confirm('終了しているタスクを削除してもいいですか？')) {
          return;
        } 
        this.todos = this.todos.filter(function(todo){
          return !todo.isDone2;//終わってないものだけ残す            
        });
      },
      clear: function(){//全部削除の場合
        if (!confirm('全タスクを削除してもいいですか？')) {
          return;
        } 
        this.todos.splice(0);
      },
      sorts: function(){
          this.todos.reverse();
      },
      //   this.todos = JSON.parse(localStorage.getItem('todos'))||[]
      //   for (let i=0 ; i<this.todos.length ; i++){
      //     if(this.todos[i].isDone2 === false){ 
      //       this.todos[i].isDone2 == true;
      //     }
      //     return this.todos;
      //   }
        // var elm = document.querySelectorAll('isDone1');
        // elm.textContent = 'true';
    
        // if(todo.isDone1 === false){
        //   todo.isShow = !todo.isShow;
        // }
        // return;
        // var item = this.todos.filter(function(todo){
          // if(todo.isDone1 === false){//チェックがついていなければ
          //   todo.isDone1 = !todo.isDone1;//falseを返す
          //   todo.isShow = !todo.isShow;
          // }      
      // },
      fin: function(){
        var item = this.todos.filter(function(todo){
        if(todo.isDone2 === false){//チェックがついていなければ
          todo.isDone2 = !todo.isDone2;//falseを返す
          todo.isShow = !todo.isShow;//
        }
        });
      },
      all: function(){
        for(let i=0 ; i<this.todos.length ; i++){
          if(this.todos[i].isShow === false){//非表示なら
            this.todos[i].isShow = true;
          }
        }
        // let item = this.todos.forEach(function(todo){
        //   if(todos.length != null){
        //     return item; 
        //   }
        // });
      },
      editItem: function(id){
        var newText = window.prompt('以下内容で更新します。');
        if(newText === ''){
          alert('空欄です。入力してください');
        }else if(newText !== null) {
          this.edit(id, newText);
        }
      },
      edit: function(id, text){
        var editIndex='';
        this.todos.some(function (value, index) {
          if (value.id === id) {
              editIndex = index;
          }
        });
      this.todos[editIndex].title = text;
      }
    },
    computed: {//remainingを利用して、進行中todoを作る
      remaining: function(){
        var items = this.todos.filter(function(todo){
          if (todo.isDone2 === false){
            return !todo.isDone2;//falseを返す
          }else{
            return null;
          }
        });
        return items.length;
      },
      go: function(){
        var newList=[];//絞り込み後のタスクを格納する新しい配列
        for(let i=0 ; i<this.todos.length ; i++){
          var isDone1 = false;//表示対象か判定するフラグ、以下表示しない場合を判定
          if((!this.todos[i].isDone1)&&(this.todos[i].isShow)){ 
            this.todos[i].isShow = false;//このタスクは、表示しない
          }
          if(isDone1){//対象のタスクだけ配列に追加
            newList.push(this.todos[i]);
          }
        }
        return newList;
        }
      },
      fin: function(){
        var newList=[];//絞り込み後のタスクを格納する新しい配列
        for(let i=0 ; i<this.todos.length ; i++){
          var isDone2 = false;//表示対象か判定するフラグ、以下表示しない場合を判定
          if((!this.todos[i].isDone2)&&(this.todos[i].isShow)){ 
            this.todos[i].isShow = false;//このタスクは、表示しない
          }
          if(isDone1){//対象のタスクだけ配列に追加
            newList.push(this.todos[i]);
          }
        }
        return newList;
        } 
  });
})();