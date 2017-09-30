;(function () {

  'use strict';

  function copy(obj) {
    return Object.assign({}, obj);
}

  new Vue({
    el: '#main',
    data: {
      list: [],
      current: {}

    },

    mounted: function () { //每次初始化的是  浏览器里存的数据取出来
      this.list = ms.get('list') || this.list;
    },

    methods: {
      merge: function () {
        var is_update, id; // 不明白在这里定义ID的 意义
        is_update = id = this.current.id;
        if (is_update) {   // 判断 是否 ID 存在
          var index = this.find_index(id);
          // var index = this.list.findIndex(function (item) { // 迭代 list  返回 与current.id （相等的一项 ~？)命名为item
          //   return item.id == is_update;             // 返回 (???一项) （数值？？！！） 满足 这个式子
          //});
          Vue.set(this.list, index, this.current);
          //this.list[index] = copy(this.current);
          console.log('this.list:', this.list);
        }else {
          var title = this.current.title;  // 判断输入是否为空
          if (!title && title !== 0) return;

          var todo = copy(this.current);//todo 是新加入的 项
          todo.id = this.next_id();
          this.list.push(todo);
          console.log('this.list:', this.list);
          console.log('this.current:', this.current);

        }

        this.reset_current();

      },


      // 删除元素 需要定位元素（标记每个元素）
      remove: function (id) {
        var index = this.find_index(id);  //通过 ID 找 index
        this.list.splice(index,1);
      },
      next_id: function()  {
        return this.list.length + 1;
      },
      set_current: function (todo) {
        this.current = copy(todo);
      },
      reset_current: function () {
        this.set_current({});
      },

      find_index: function(id) {
        return this.list.findIndex(function(item) {
          return item.id == id;
        })
      },

      toggle_complete: function (id) {
        var i = this.find_index(id);
        Vue.set(this.list[i],'completed', !this.list[i].completed);// 必须用这写法，Vue才能检测到数据
        //this.list[i].completed = !this.list[i].completed;
      }

    },



    watch: { // 监控 list的 数值变化， 并作出反应
      list: {
        deep: true, // 无论深度 list有变化就执行 handler 函数
        handler: function (n, o) {
          if (n) {
            ms.set('list', n);
          }else {
            ms.set('list', []);
        }
      }
    }
   }
  });





})();
