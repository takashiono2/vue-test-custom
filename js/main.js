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
      go: function(){//オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない。        
        for(let i=0 ; i<this.todos.length; i++){
          if((this.todos[i].isDone1 === false)&&(this.todos[i].isShow === false)){
            this.todos[i].isShow = true;
            continue;
          }
          if(this.todos[i].isDone1 === true){//チェックありなら
            this.todos[i].isShow = true;//表示
          }
          if(this.todos[i].isDone1 === false){//チェックなしなら、非表示
            this.todos[i].isShow = false;
          }
          continue;
          }
        // this.todo[i].isShow = !this.todo[i].isShow; 
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
      function(){//オブジェクトはthis.todosに入っている
          for(let i=0 ; i<this.todos.length; i++){
            if((this.todos[i].isDone1 === true)&&(this.todos[i].isShow === true)){//チェックあり、表示
              var items = this.todos.filter(function(todo){
                  return todo.isDone1 === true;
              });
              this.todos = items;
            // }else if(this.todos.length !== this.items.length){
            //   console.log(this.items.length);
            }else{
              continue;
            }
          }
        }
      // },
      // fin: function(){
      //   var newList=[];//絞り込み後のタスクを格納する新しい配列
      //   for(let i=0 ; i<this.todos.length ; i++){
      //     var isDone2 = false;//表示対象か判定するフラグ、以下表示しない場合を判定
      //     if((!this.todos[i].isDone2)&&(this.todos[i].isShow)){ 
      //       this.todos[i].isShow = false;//このタスクは、表示しない
      //     }
      //     if(isDone1){//対象のタスクだけ配列に追加
      //       newList.push(this.todos[i]);
      //     }
      //   }
      //   return newList;
      // }
    }
  });
})();