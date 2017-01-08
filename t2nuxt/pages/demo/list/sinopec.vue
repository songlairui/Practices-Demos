<template lang="html">
  <section>
    <h1>Sinopec</h1>
    <p>源地址： <a href="http://zgsh.sinopec.com/supp/index.shtml">招标信息</a></p>
    <hr>

  </section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return axios.post(`http://zgsh.sinopec.com/f/supp/bid/queryBidNotices.do`,{
      pageNo: '1',
      type: '10',
      paramJson: '{"title":"","consigncode":"","bidorg":"","prodcode":"","createtimeStart":"","createtimeEnd":"","opentimeStart":"","opentimeEnd":""}'
    })
    .then((res) => {
      console.log(res)
      return { status: res.data.status, message: res.data.message, result: res.data.result }
    })
  }
}
</script>

<style lang="css">
</style>
