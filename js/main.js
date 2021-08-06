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
      // isShow: true,
      isDone1: false,
      isDone2: false,
      uniqueKey: 0,
      btn:''
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
      limit: function(){
        this.todos.sort(function(a, b){
          return parseInt(b.arrival_date.replace(/-/g,"")) - parseInt(a.arrival_date.replace(/-/g,""));
        });
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
      },
      go: function(){//ボタンは変数(doneTodos)を切り替えるだけ。オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない
         this.btn="goBtn";
      },
      // go: function(){//ボタンは変数(doneTodos)を切り替えるだけ。オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない
      //   this.todos.forEach((todo)=>{//todosそのものを切り替える,todosの中身が変わらないように
      //     if(this.doneTodos.length !== this.todos.length){//チェックがないなら
      //       return todo.isShow = todo.isDone1;
      //     }else{
      //       return todo.isShow = !todo.isShow;
      //     }
      //   });
      // },
      fin: function(){//ボタンは変数(doneTodos)を切り替えるだけ。オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない
        this.btn="finBtn"
      },
      // fin: function(){//ボタンは変数(doneTodos)を切り替えるだけ。オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない
      //   this.todos.forEach((todo)=>{
      //     if(this.doneTodos.length !== this.todos.length){//チェックがないなら
      //       return todo.isShow = todo.isDone2;
      //     }else{
      //       return todo.isShow = !todo.isShow;
      //     }
      //   });
      // },
      all: function(){
        this.btn="allBtn"
      }
      // all: function(){
      //   this.todos.forEach((todo)=>{
      //     return todo.isShow = true;
      //   });
      // }
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
      doneTodos(){
        this.todos;
        switch(this.btn){
          case 'goBtn':
            return this.todos.filter(todo=>todo.isDone1);
            break;
          case 'finBtn':
            return this.todos.filter(todo=>todo.isDone2);
            break;
          case 'allBtn':
            return this.todos;
            break;
          default:
            return this.todos;
          //   return [];
          }
      },     
      // doneTodos(){
      //   return this.todos.filter(todo=>todo.isDone1);//チェックありを返す
      // },
      // doneTodos2(){
      //   return this.todos.filter(todo=>todo.isDone2);
      // }
      // function(){//オブジェクトはthis.todosに入っている
      //   for(let j=0 ; j<this.todos.length; j++){
      //     if((this.todos[j].isDone1 === true)&&(this.todos[j].isShow === true)){//チェックあり、表示
      //       var items = this.todos.filter(function(todo){
      //           return todo.isDone1 === true;
      //       });
      //       this.todos = items;//変数を用意して、変数をかえる
      //     // }else if(this.todos.length !== this.items.length){
      //     //   console.log(this.items.length);
      //     }else{
      //       continue;
      //     }
      //   }
      // }
    }
  });
})();