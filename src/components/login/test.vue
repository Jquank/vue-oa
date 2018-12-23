<template>
<div class="test">
   <ol>
    <li @click="jump(item.split('&pwd=')[0].split('=')[2],item.split('&pwd=')[1])" v-for="(item,index) in pwdArr" :key="index">{{index+1+': '+item.split('=')[1]+item.split('=')[2]}}</li>
  </ol>
</div>
</template>

<script>
export default {
  data () {
    return {
      pwdArr: ['showName=admin&name=admin&pwd=1234rfv',
        'showName=商务&name=周俞&pwd=admin',
        'showName=商务&name=陈志良&pwd=888888',
        'showName=商务&name=龙胜男&pwd=admin',
        'showName=商务&name=李平&pwd=065550',
        'showName=商务&name=李双3&pwd=265322',
        'showName=商务&name=崔航&pwd=151258',
        'showName=商务主管-客发一区1部&name=胡志亮&pwd=202091',
        'showName=商务主管-客发一区1部&name=陈家龙&pwd=Cjl123456789,',
        'showName=商务-客发一区1部&name=杨秀丽&pwd=admin123',
        'showName=商务-客发一区1部&name=代丹军&pwd=junjun',
        'showName=商务-客发一区1部&name=肖文超&pwd=01223X',

        'showName=商务主管-客发二区9部&name=柳青&pwd=273717',
        'showName=商务-客发二区9部&name=秦志&pwd=admin123',
        'showName=商务-客发二区9部&name=陈静2&pwd=admin123',
        'showName=商务-客发二区9部&name=卫思琪&pwd=admin123',
        'showName=商务-客发二区26部&name=金红颜&pwd=083827',
        'showName=商务&name=肖文超&pwd=01223X',

        'showName=大客户商务&name=李明&pwd=admin123',
        'showName=大客户商务&name=皮永存&pwd=163210',
        'showName=大客户商务&name=王小卓&pwd=182990',

        'showName=商务-直通车二区2部&name=赵亮&pwd=936295',
        'showName=商务-直通车二区2部主管&name=瞿沙雄&pwd=272418',
        'showName=经理-直通车二区经理&name=黄旭&pwd=caolima,88',

        'showName=商务-直通车二区2部主管&name=文静1&pwd=180060',
        'showName=商务-直通车二区2部&name=毛文培&pwd=271254',

        'showName=商务-直通车二区2部&name=汪超&pwd=066557',
        'showName=经理-直通车二区&name=危迪&pwd=137813',

        'showName=商务-直通车一区3部&name=田振&pwd=292978',
        'showName=商务-直通车一区1部&name=刘玉&pwd=123456',
        'showName=经理-直通车一区&name=袁琪&pwd=20140424',

        'showName=经理-直通车副总&name=欧阳迪宇&pwd=27791X',
        'showName=经理-直通车总监&name=李桃&pwd=150029',
        'showName=经理-直通车维护一部经理&name=曹白丽&pwd=200423',
        'showName=经理-直通车维护一部主管&name=刘舒娴&pwd=303429',
        'showName=经理-直通车维护一部&name=冯文文&pwd=188425',

        'showName=经理-地市副总&name=李琴&pwd=300021',
        'showName=经理-地市总监&name=王新星&pwd=273716',
        'showName=经理-地市二区客发经理&name=戴光黎&pwd=157011',
        'showName=经理-地市二区客发主管&name=熊杰&pwd=096616',
        'showName=经理-地市二区客发&name=高黎&pwd=193839',

        'showName=极捷号商务&name=江亮&pwd=085812',
        'showName=极捷号商务&name=刘彦平&pwd=291219',
        'showName=极捷号商务&name=徐兵&pwd=253313',
        'showName=极捷号主管二部&name=李进2&pwd=153835',
        'showName=极捷号经理&name=陈洁1&pwd=293525',

        'showName=综客客服&name=吴红&pwd=158026',
        'showName=业支审核&name=李程&pwd=zhichi3333',
        'showName=业支审核&name=售前审核3&pwd=admin',
        'showName=薪资审核&name=百捷薪资一&pwd=baijiexinzi1',
        'showName=薪资审核&name=曾燕&pwd=860320',
        'showName=收单出纳分配合同&name=收单出纳1&pwd=admin123',
        'showName=收单出纳分配合同&name=收单出纳2&pwd=admin',
        'showName=收单出纳分配合同&name=刘永红&pwd=admin123',
        'showName=收单出纳分配合同&name=田湘云&pwd=805029',
        'showName=理单员&name=理单员&pwd=123456',
        'showName=理单员1&name=理单员1&pwd=admin123',
        'showName=理单员2&name=理单员2&pwd=admin',
        'showName=理单员3&name=理单员3&pwd=admin123',
        'showName=理单员3&name=KA理单&pwd=admin123',
        'showName=极捷号理单员&name=极捷号理单员&pwd=123456',
        'showName=财务部&name=王婧朦&pwd=200902',

        'showName=财务部&name=左慧萍&pwd=197024',
        'showName=开专票&name=许娟&pwd=79970715',

        'showName=直通车糯米开发票&name=吴小瑾&pwd=088822',
        'showName=开普票&name=涂思佳&pwd=kfp123456',
        'showName=财务部&name=会计1&pwd=654321',
        'showName=财务部&name=寄普票专员&pwd=123456',
        'showName=财务部&name=寄专票专员&pwd=123456',

        'showName=质检外审&name=外审01&pwd=admin',
        'showName=质检内审派单&name=外审02&pwd=admin',
        'showName=质检内审&name=武汉内审01&pwd=admin',
        'showName=质检申请加款&name=FEED物料专员&pwd=admin123',
        'showName=质检申请加款&name=武汉开户01&pwd=admin',
        'showName=质检经理&name=质检经理&pwd=221641',
        'showName=质检经理&name=熊轩&pwd=221641',

        'showName=理单员3&name=产品专员1&pwd=admin123',
        'showName=理单员3&name=产品专员2&pwd=admin123',

        'showName=投诉部&退款审核&name=刘顿&pwd=XDweihu668',
        'showName=运营支持副总经理(运营支持)&name=叶范杰&pwd=86775004',
        'showName=综合部总经理(综合部)&name=周全秀&pwd=184867',
        'showName=薪酬部经理&name=陈燕&pwd=171103xc',
        'showName=综合部经理&name=刘永红&pwd=admin123',
        'showName=百度发票管理员&name=左慧萍&pwd=197024',

        'showName=综合部复审&name=续费主管&pwd=admin123',
        'showName=财务审核&name=转户出纳&pwd=admin123',
        'showName=账户加款&name=加款出纳&pwd=admin123',
        'showName=质检开户&name=武汉开户01&pwd=admin',
        'showName=客户提单&name=提单800&pwd=admin',
        'showName=质检一部&name=质检一部审核&pwd=123456',
        'showName=客户派单&name=客服主管1&pwd=admin',
        'showName=提单完成&name=客服1&pwd=admin',
        'showName=新客内审&name=客服内审&pwd=admin123',
        'showName=客服&name=客服1&pwd=admin',

        'showName=网数派单&name=网建内审&pwd=admin',
        'showName=网建外审&name=网建外审&pwd=admin',
        'showName=网开空域&name=网开空域&pwd=admin',
        'showName=网建经理派单&name=李智芳&pwd=133948',
        'showName=网站制作&name=网建资料员&pwd=admin',
        'showName=网建内审&name=网建内审&pwd=admin',

        'showName=业支外审&name=业支外审&pwd=123456',
        'showName=业支外审&name=业支外审2&pwd=151459',
        'showName=业支开户&name=业支开户&pwd=admin123',
        'showName=业支开户&name=业支开户2&pwd=123456',
        'showName=业支派单&name=业支派单&pwd=admin123',
        'showName=客服申请加款&name=冯文文&pwd=188425',
        'showName=客服申请加款&name=姜飞&pwd=256619',
        'showName=客服申请加款&name=程爽&pwd=21004X',
        'showName=业支内审&name=业支内审&pwd=admin123',
        'showName=业支主管&name=李程&pwd=zhichi3333',

        'showName=财务审核&name=续费收单1&pwd=admin',
        'showName=财务审核&name=续费收单2&pwd=admin',
        'showName=财务审核&name=收单出纳3&pwd=admin123',
        'showName=财务审核&name=收单出纳4&pwd=admin',
        'showName=财务审核&name=续费主管&pwd=admin123',
        'showName=财务审核&name=转户出纳&pwd=admin123',
        'showName=财务加款&name=加款出纳&pwd=admin123',
        'showName=转出出纳&name=转出出纳&pwd=admin123',
        'showName=客户派单&name=客服主管1&pwd=admin',

        'showName=分公司续费主管审核&name=王丹1&pwd=303521',

        'showName=老板&name=王国平&pwd=273511',
        'showName=财务总经理&name=周全秀&pwd=184867',
        'showName=商务副总&name=黄华&pwd=133318',
        'showName=商务副总&name=欧阳迪宇&pwd=27791X',
        'showName=武百总经理&name=徐新国&pwd=288318',
        'showName=客服副总经理&name=李琴&pwd=300021',
        'showName=客服副总经理&name=闵风波&pwd=87593124',
        'showName=大客户部武百副总经理(大客户)&name=舒丹&pwd=021023',
        'showName=客服总监&name=赵璀&pwd=19820727',
        'showName=客服总监&name=刘勇&pwd=160037',
        'showName=客服总监&name=李玉&pwd=072444',
        'showName=客服经理-新客户服务中心&name=黄文明&pwd=190022',
        'showName=客服经理-新客户服务中心&name=提单800&pwd=admin',
        'showName=客服经理-VIP一部&name=郑宁&pwd=240435',
        'showName=客服经理-增值一部&name=尹藤&pwd=130040',
        'showName=客服经理-增值五部&name=熊惟丹&pwd=201807',
        'showName=客服经理-VIP二部&name=张艳&pwd=010022',
        'showName=客服经理-增值二部&name=程晓平&pwd=191918',
        'showName=客服经理-增值三部&name=曹冲&pwd=050075',
        'showName=客服经理-品牌客户运营中心&name=潘春梅&pwd=031129',
        'showName=客服主管-策略支持组&name=刘婧娴&pwd=120048',
        'showName=策略支持组&name=黄夏&pwd=260028',
        'showName=分公司续费&name=吴咪&pwd=041465',
        'showName=渠道续费&name=王哲宇&pwd=200350',
        'showName=客服续费&name=baijie1520&pwd=admin123',
        'showName=客服续费&name=baijie1312&pwd=123456',
        'showName=客服续费&name=baijie1906&pwd=123456',
        'showName=客服续费&name=baijie1805&pwd=123456',
        'showName=客服续费&name=baijiepxhy06&pwd=123456',
        'showName=客服续费&name=xindan8110&pwd=123456',
        'showName=客服续费&name=baijie1611&pwd=123456',
        'showName=客服续费&name=baijiepxhy06&pwd=123456',
        'showName=客服续费&name=baijie1111&pwd=123456',
        'showName=客服续费&name=baijie1606&pwd=123456',
        'showName=客服主管-新客户1组&name=段金容&pwd=053720',
        'showName=客服主管-新客户1组&name=xindan8100&pwd=123456',
        'showName=客服主管-新客户2组&name=谭丽元&pwd=123456',
        'showName=客服主管-新客户2组&name=xindan8200&pwd=123456',
        'showName=客服主管-新客户3组&name=xindan8300&pwd=12345678',
        'showName=客服主管-新客户3组&name=刘红&pwd=292828',
        'showName=客服主管-新客户5组&name=刘虎&pwd=010132',
        'showName=客服主管-新客户5组&name=xindan8500&pwd=123456',
        'showName=客服主管-VIP一部1组&name=VIP一部1组主管&pwd=123456',
        'showName=客服主管-VIP一部2组&name=宋庆龄&pwd=070346',
        'showName=客服主管-增值一部2组&name=李颖&pwd=060047',
        'showName=客服主管-增值一部9组&name=韩小凯&pwd=ws05230207',
        'showName=客服主管-增值五部5组&name=冷立军&pwd=164814',
        'showName=客服主管-增值五部7组&name=全俊&pwd=200011',
        'showName=客服主管-VIP二部1组&name=赵清玉&pwd=291822',
        'showName=客服主管-VIP二部2组&name=廖沙&pwd=241041',
        'showName=客服主管-增值二部6组&name=孙艮&pwd=122846',
        'showName=客服主管-增值二部6组&name=baijie1600&pwd=123456',
        'showName=客服主管-增值二部3组&name=杨慧娟&pwd=120542',
        'showName=客服主管-增值三部8组&name=baijie1800&pwd=123456',
        'showName=客服主管-增值三部1组&name=宋璐璐&pwd=083033',
        'showName=客服主管-增值三部1组&name=baijie1100&pwd=123456',
        'showName=客服主管-失效挽回&name=曾婵&pwd=063522',
        'showName=客服主管-品牌增值部&name=付禅康&pwd=021279',
        'showName=客服主管-广告行业部&name=高冀&pwd=242975',
        'showName=客服主管-区域客户管理部&name=颜洁&pwd=024148'

      ]
    }
  },
  methods: {
    jump(name, pwd) {
      this.$router.push({
        path: '/login',
        query: {data: {'name': name, 'pwd': pwd}}
      })
    }
  }
}
</script>

<style scoped>
.test{
  width: 100%;
  height: 100vh;
  background: gray;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  font-size: 16px;
}
ol{
           margin-left: 100px;
       }
        ol li{
            padding: 8px 0 8px 0;
            cursor: pointer;
        }
        li:hover a{
            color: red;
        }
        a{
            text-decoration: none;
            color: #fff;
        }
</style>
