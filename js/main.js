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
      limit: function(){
        this.todos.sort(function(a, b){
          return parseInt(b.arrival_date.replace(/-/g,"")) - parseInt(a.arrival_date.replace(/-/g,""));
        });
      },
      // sortkana: function(){
      //   this.todos.sort(function(a, b){
      //       a = katakanaToHiragana(a.title.toString());
      //       b = katakanaToHiragana(b.title.toString());
      //       if(a < b){
      //           return -1;
      //       }else if(a> b){
      //           return 1;
      //       }
      //       return 0;
      // });
// https://gist.github.com/kawanet/5553478
/* カタカナをひらがなに変換する関数
 * @param {String} src - カタカナ
 * @returns {String} - ひらがな
 */
      //   function katakanaToHiragana(src) {
      //       return src.replace(/[\u30a1-\u30f6]/g, function(match) {
      //           var chr = match.charCodeAt(0) - 0x60;
      //           return String.fromCharCode(chr);
      //       });
      //   }
      // },
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
        for(let j=0 ; j<this.todos.length; j++){
          if((this.todos[j].isDone1 === false)&&(this.todos[j].isShow === false)){
            this.todos[j].isShow = true;
            continue;
          }
          if(this.todos[j].isDone1 === true){//チェックありなら
            this.todos[j].isShow = true;//表示
          }
          if(this.todos[j].isDone1 === false){//チェックなしなら、非表示
            this.todos[j].isShow = false;
          }
          continue;
          }
        // this.todo[i].isShow = !this.todo[i].isShow; 
      },
      fin: function(){//オブジェクトはthis.todosに入っている。キャッシュしないのでフィルターしない。        
        for(let j=0 ; j<this.todos.length; j++){
          if((this.todos[j].isDone2 === false)&&(this.todos[j].isShow === false)){
            this.todos[j].isShow = true;
            continue;
          }
          if(this.todos[j].isDone2 === true){//チェックありなら
            this.todos[j].isShow = true;//表示
          }
          if(this.todos[j].isDone2 === false){//チェックなしなら、非表示
            this.todos[j].isShow = false;
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
        for(let j=0 ; j<this.todos.length; j++){
          if((this.todos[j].isDone1 === true)&&(this.todos[j].isShow === true)){//チェックあり、表示
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
    }
  });
})();