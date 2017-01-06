<template lang="html">
  <el-row>
    <el-col :span='16' :offset='6'>
      <el-row>
        <el-col :span="20">
          <el-button type="primary" @click="ChooseFlip">{{ current.first === 0?'':'重新' }}选择执棋</el-button>
          <el-button type="primary" @click="setCurrentChess()">click</el-button>
          <el-button type="primary" @click="clearScene()">清空局面</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          先手 : <i :class='current.first | tunedisplay'></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          当前 : <i :class='current.chess | tunedisplay'></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          {{ snap[1] }}
        </el-col>
      </el-row>
    </el-col>
    <el-col :span='21' :offset='1'>
      <div class="state">
        <el-row :gutter='0'>
          <el-col :span='8' v-for='(chess, index) in snap'>
            <div class="cell" @click="drop(index)">
              <i :class='chess | tunedisplay'></i>
            </div>
          </el-col>
        </el-row>
      </div>
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
        chess: 0
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
    lines () {
      let hlines = []
      let vlines = []
      let xlines = [[], []]
      for (let i = 0; i < 3; i++) {
        hlines.push(this.snap2d[i])
        for (let j = 0; j < 3; j++) {
          if (!Array.isArray(vlines[i])) {
            console.log(`vlines[${i}] is not array`)
            vlines[i] = []
          }
          vlines[i].push(this.snap2d[j][i])
        }
        console.log(xlines)
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
      let possibleines = this.lines.map(function (arr) {
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
    calcResult () {
      // 根据数组 possibleines 判断是否结束
      // 需要判断 已有胜出、平局
      if (this.possibleines.filter((v) => v === 'ok').length > 0) {
        return 'ok'
      }
      if (this.possibleines.filter((v) => v !== 'fall').length === 0) {
        return 'out'
      }
    },
    clearScene () {
      // 清空局面
      this.snap.splice(0, 9, ...(new Array(9).fill(0)))
      this.current.first = 0
      this.current.chess = 0
    },
    CheckInit () {
      if (this.current.first === 0) {
        this.$message({
          type: 'error',
          message: '未选择执棋'
        })
        return false
      } else {
        return true
      }
    },
    drop (index) {
      console.log(index)
      if (!this.CheckInit()) { return }
      if (this.snap[index] === 0) {
        this.snap.splice(index, 1, this.current.chess)
        this.setCurrentChess()
      } else {
        console.log('已有棋子')
      }
    },
    ChooseFlip () {
      // var _this = this
      let firstchess = null
      this.$confirm(' X or O ?', '选择棋子', {
        confirmButtonText: 'X',
        cancelButtonText: 'O',
        type: 'info'
      }).then(() => {
        firstchess = 1
        this.$message({
          type: 'success',
          message: '已选 X'
        })
      }, () => {
        firstchess = -1
        this.$message({
          type: 'success',
          message: '已选 O '
        })
      }).then(() => {
        console.log(firstchess)
        this.current.first = firstchess
        this.setCurrentChess(firstchess)
      })
    },
    setCurrentChess (set = null) {
      console.log(this.current.chess)
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
</style>
