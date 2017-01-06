<template lang="html">
  <el-row>
    <el-col :span='20' :offset='2'>
      <div class="state">
        <el-row :gutter='0'>
          <el-col :span='8' v-for='(chess, index) in snap'>
            <div class="cell" @click="drop(index)">
              <i v-if='chess !== 0' :class='chess | tunedisplay'></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span='10' :offset='0'>
      <el-row>
        <el-col :span="20">
          <div class="grid-content">
            <el-button type="primary" @click="ChooseFlip">{{ current.first === 0?'':'重新' }}选择执棋</el-button><br>
            <el-button type="primary" @click="clearScene()">重新开局</el-button><br>
            <el-button type="primary" @click="randomDrop()">随机下一个棋子</el-button><br>
            先手 : <i :class='current.first | tunedisplay'></i> <br>
            选手 : <i :class='current.user | tunedisplay'></i> <br>
            当前 : <i :class='current.chess | tunedisplay'></i><br>
            Robot: 随机下棋 LEVEL
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span='10' :offset='1'>
      <h3>README</h3>
      <p>
        ＃字游戏，已完成：
      </p>
      <ul>
        <li>Js Array 操纵，生成二维数组</li>
        <li>变量与棋盘数据绑定</li>
        <li>计算已获胜状态</li>
        <li>重新开局</li>
        <li>无脑的Robot</li>
      </ul>
      <hr>
      <h3>TODO</h3>
      <ul>
        <li>基于Canvas的辅助线</li>
        <li>Robot的下棋策略</li>
        <li>样式打磨</li>
        <li>转换到Codepen.io上</li>
        <li>重新选择棋子按钮的状态变化</li>
        <li>需要重新开局时，重新开局按钮的变化，添加动态效果</li>
        <li>增加下棋步骤</li>
        <li>绘制页面方法流程图</li>
      </ul>
      <hr>
      <h3>TO FIX</h3>
      <ul>
        <li>判断逻辑</li>
        <li>平局状态</li>
      </ul>
    </el-col>
  </el-row>
</template>
<script>
export default {
  created () {
    this.ChooseFlip()
  },
  data () {
    return {
      snap: new Array(9).fill(0),
      current: {
        first: 0,
        chess: 0,
        user: 0
      },
      lib: {
        '1': 'X',
        '-1': '-'
      }
    }
  },
  computed: {
    snap2d () {
      let squareSize = Math.ceil(Math.sqrt(this.snap.length))
      return this.snap.reduce(function (p, n, i) {
        squareSize = 3
        var line = Math.floor(i / squareSize)
        if (!Array.isArray(p[line])) {
          p[line] = []
        }
        p[line].push(n)
        return p
      }, [])
    },
    linedatas () {
      let hlines = []
      let vlines = []
      let xlines = [[], []]
      for (let i = 0; i < 3; i++) {
        hlines.push(this.snap2d[i])
        for (let j = 0; j < 3; j++) {
          if (!Array.isArray(vlines[i])) {
            // console.log(`vlines[${i}] is not array`)
            vlines[i] = []
          }
          vlines[i].push(this.snap2d[j][i])
        }
        // console.log(xlines)
        xlines[0].push(this.snap2d[i][i])
        xlines[1].push(this.snap2d[2 - i][i])
      }
      return hlines.concat(vlines).concat(xlines)
    },
    linestatus () {
      // 可能的状态：
      // unique 数目 有1个 2个
      // 已放下棋子 0个 1个 2个 3个
      // 值得标记的状态： 不可能到3（unique 到 2），可能到3（未放棋子，未放全棋子），已经到3
      // fall, waiting, ok
      let indicator = null
      let possibleines = this.linedatas.map(function (arr) {
        arr = arr.filter((v) => v !== 0)
        let tmpArr = arr.filter((v, i, a) => a.indexOf(v) === i)
        if (tmpArr.length > 1) {
          return 'fall'
        } else {
          if (arr.length === 3) {
            indicator = arr[0]
            return 'ok'
          } else {
            return 'waiting'
          }
        }
      })
      if(possibleines.filter(v => v !== 'fall').length === 0) {
        indicator = 'none'
      }
      return { indicator, possibleines }
    }
  },
  filters: {
    tunedisplay: function (value) {
      let chessX = 'el-icon-close'
      let chessO = 'el-icon-minus'
      let chessNull = 'el-icon-loading'
      return (value === 1) ? chessX : (value === -1) ? chessO : chessNull
    }
  },
  methods: {
    automatic () {
      // 先手 是 X，每次计算当前，如果current 不是user的棋子，则自动下一个。
    },
    randomDrop () {
      let availableIndex = this.snap.map((v, i) => (v === 0) ? i : -1).filter(v => v !== -1)
      // console.log(availableIndex)
      // console.log(availableIndex.length)
      let randomIndex = Math.floor(Math.random() * (availableIndex.length))
      // console.log(randomIndex)
      // console.log(availableIndex[randomIndex])
      this.drop(availableIndex[randomIndex], 'robot')
    },
    calcResult () {
      // 根据数组 possibleines 判断是否结束
      // 需要判断 已有胜出、平局
      if (this.linestatus.indicator !== null) {
        // this.end()
        let msg = ''
        if (this.linestatus.indicator === 'none') {
          msg = '平局'
        } else {
          msg = `${this.lib[this.linestatus.indicator]} 方已获胜`
        }
        this.$alert(msg, '完', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      }
    },
    clearScene () {
      // 清空局面
      this.snap.splice(0, 9, ...(new Array(9).fill(0)))
      this.current.first = 0
      this.current.chess = 0
      this.current.user = 0
      this.ChooseFlip()
    },
    CheckInit () {
      if (this.current.user === 0) {
        this.$message({
          type: 'error',
          message: '未选择执棋'
        })
        return false
      } else {
        return true
      }
    },
    drop (index, identity) {
      // 先， 如果棋盘结束，不能落子
      if (this.linestatus.indicator !== null) {
        this.$message({
          type: 'warning',
          message: '请重新开局'
        })
        return
      }
      // 判断robot状态，避免不该某一方落子时，触发操作
      if (identity === 'robot') {
        if (this.current.chess === this.current.user) {
          // 是 robot， 当前下的棋子，与user执棋一致， 不可以下棋。
          this.$message({
            type: 'error',
            message: '出现了一个焦躁的robot'
          })
          return
        }
      } else {
        if (this.current.chess !== this.current.user) {
          // 不是 robot， 当前下的棋子，与user执棋不一致， 不可以下棋。
          this.$message({
            type: 'warning',
            message: '请等待robot落子'
          })
          return
        }
      }
      console.log(index)
      if (!this.CheckInit()) { return }
      if (this.snap[index] === 0) {
        this.snap.splice(index, 1, this.current.chess)
        this.setCurrentChess()
        this.calcResult()
      } else {
        console.log('已有棋子')
      }
    },
    ChooseFlip () {
      // var _this = this
      let firstchess = 1
      let userchess = null
      this.$confirm(' X or O ?', '选择棋子', {
        confirmButtonText: 'X',
        cancelButtonText: 'O',
        type: 'info'
      }).then(() => {
        userchess = 1
        this.$message({
          type: 'success',
          message: '已选 X'
        })
      }, () => {
        userchess = -1
        this.$message({
          type: 'success',
          message: '已选 O '
        })
      }).then(() => {
        // console.log(userchess)
        this.current.user = userchess
        this.current.first = firstchess
        this.setCurrentChess(firstchess)
      })
    },
    setCurrentChess (set = null) {
      // console.log(this.current.chess)
      if (!set) {
        // 没有参数传入，
        if (this.current.first === 0) {
          // 既没有传入参数，也没有选择需要的棋子，当前操作无效
          console.log('unable')
          this.$message({
            type: 'warning',
            message: '选择执棋'
          })
        } else {
          this.current.chess *= -1
        }
        // 则 翻转
      } else {
        this.current.chess = set
      }
      // 当棋局没有结束时， 判断一下robot 是否下棋
      if (this.linestatus.indicator === null && this.current.chess !== this.current.user) {
        setTimeout(
          this.randomDrop
          , Math.random() * 1000 + 300
        )
      }
    }
  }
}
</script>

<style lang="css">
.state{
  margin:40px auto 0;
  width: 480px;height:480px;
  background:#d3dce6;
  border-radius: 4px;
}
.cell{
  box-sizing: border-box;
  /* border:thin solid #000; */
  height: 140px;
  text-align: center;
  line-height: 140px;
  margin: 10px ;
  font-size: 56px;
  cursor: pointer;
}
.grid-content{
  margin:.5em;
}
</style>
