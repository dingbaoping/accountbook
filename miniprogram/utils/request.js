
const db = wx.cloud.database({ env:'dingbaoping-4d3c56'});

//数据库添加
function add(table, data, success, fail){
  db.collection(table).add({
    // data 字段表示需新增的 JSON 数据
    data: data,
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log("添加成功",res);
      success(res);
      
    },
    fail(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.error("添加失败",res);
      fail(res.data);

    }
  })
}

//数据库查询
function find(table,success) {
  db.collection(table).get({
    success(res) {
      console.log(res.data)
      success(res.data)
    }
  })
}

//数据库条件查询
function findWhere(table, data, success, fail) {
  db.collection(table).where(data).get({
      success: res => {
        success(res.data);
      },
      fail: err => {
        fail(res.data);
      }
    })
}

// 聚合查询
function findGroup(table, table1, field, field1, as, success){
  db.collection(table).aggregate()
  .lookup({
    from: table1,
    localField: field,
    foreignField: field1,
    as: as,
  })
  .end()
  .then(res => {
    console.log(res);
    success(res);
  })
  .catch(err => console.error(err))
}
  

//数据库更新
function update(table, id,data, success, fail) {
  db.collection(table).doc(id).update({
    // data 传入需要局部更新的数据
    data:data,
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res.data);
      success(res.data);

    },
    fail(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.error(res.data);
      fail(res.data);

    }
  })
}

//数据库删除
function del(table, id, success, fail) {
  db.collection(table).doc(id).remove({
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res);
      success(res.data);

    },
    fail(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.error(res);
      fail(res.data);

    }
  })
}

export { add, findGroup, find, findWhere, update,del};
