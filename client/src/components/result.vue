<template>
  <div id="result" class="container">
      <div class="mx-auto py-1 my-2 row" id="intro">
        <h2 class="mx-auto">{{name}} 's Digital Carbon Footprint Profile</h2>
      </div>
      <div class="mx-auto col-9 my-4">
          <section>
            Your digital carbon footprint profile calculates based on your personal ICT usage preferences and the country or region electricity conversion factor. The electricity conversion factor is the intensity of carbon dioxide consumed per kWh of electricity. Due to the differences in the power production structure of various countries, the power conversion factors of different regions are different. You can click or zoom to view detailed data of each country.
          </section>
      </div>
      <div class="mx-auto py-1 my-2">
        <div id="country" :style="barboard"></div>
      </div>
      <div class="mx-auto col-9 mb-5">
          <section>
            The following content is the final result of the digital carbon footprint calculation and the percentage of time your ICT equipment is used in a day. The results of ICT activities use behaviour is displayed by main types.
          </section>
      </div>
      <div class="mx-auto my-2 row">
        <div id="board6" class="col-4">
          <div class="my-3 card bg-success text-white">
            <div id="infoCard" class="card-header">
              <h5>Invisible Footprint</h5>
            </div>
            <div id="infoCardbody" class="card-body">
              Your daily digital CO2 emissions are approximately {{allCarbon.low}}g ~ {{allCarbon.high}}g.
              <br>
              Predicting that your digital carbon footprint power consumes yearly about {{allElectricity.final}}kWh.
              <br>
              If you plant trees to be carbon neutral, which means neutralize your digital carbon footprint. You need to plant {{allCarbon.final}} trees every year.
              <br><br>
              <small>* It is assumed that planting a cedar tree that could live for 30 years can absorb 111 kg of carbon dioxide entirely.</small>
            </div>
          </div>
        </div>
        <div id="device" class="col-8":style="barboard"></div>
      </div>
      <div id="board" class="d-flex flex-column accordion">
          <div class="single card">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  General Apps
                </button>
              </h2>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#board">
              <div id ="generalcontent" class="row">
                <div id="general" :style="board" class="col-lg-6 col-md-12"></div>
                <div id="generalTime" :style="board" class="col-lg-6 col-md-12"></div>
              </div>
            </div>
          </div>

          <div class="single card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Video Steaming
                </button>
              </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#board">
              <div id ="videocontent" class="row">
                <div id="video" :style="board" class="col-lg-6 col-md-12"></div>
                <div id="videoTime" :style="board" class="col-lg-6 col-md-12"></div>
              </div>
            </div>
          </div>

          <div class="single card">
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Audio Steaming
                </button>
              </h2>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#board">
              <div id ="audiocontent" class="row">
                <div id="audio" :style="board" class="col-lg-6 col-md-12"></div>
                <div id="audioTime" :style="board" class="col-lg-6 col-md-12"></div>
              </div>
            </div>
          </div>

          <div class="single card">
            <div class="card-header" id="headingFour">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Messaging
                </button>
              </h2>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#board">
              <div id ="messagecontent" class="row">
                <div id="message" :style="board" class="col-lg-6 col-md-12"></div>
                <div id="messageTime" :style="board" class="col-lg-6 col-md-12"></div>
              </div>
            </div>
          </div>

          <div class="single card">
            <div class="card-header" id="headingFive">
              <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  Gaming
                </button>
              </h2>
            </div>
            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#board">
              <div id ="gamecontent" class="row">
                <div id="game" :style="board" class="col-lg-6 col-md-12"></div>
                <div id="gameTime" :style="board" class="col-lg-6 col-md-12"></div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = '/root';
export default {
  data(){
    return {
      board: {
        'width': '600px',
        'height':'400px'
      },
      barboard: {
        'width': '100%',
        'height':'450px'
      },
      name:'',
      countryIndex:'',
      times: {
        daytime:0,
        activitiesTime:0
      },
      allElectricity:{
        low:0,
        high:0,
        final:0
      },
      allCarbon:{
        low:0,
        high:0,
        final:0
      },
      devices:[
        {"value":0,"name":"Smartphone"},
        {"value":0,"name":"Tablet"},
        {"value":0,"name":"Laptop PC"},
        {"value":0,"name":"Desktop PC"},
        {"value":0,"name":"TV"},
        {"value":0,"name":"Projector"},
        {"value":0,"name":"Wearable"},
        {"value":0,"name":"Microsoft Xbox"},
        {"value":0,"name":"Sony PlayStation"},
        {"value":0,"name":"Nintendo Switch"},
      ],
      country:[],
      home:[],
      generalresult:[],
      videoresult:[],
      audioresult:[],
      messageresult:[],
      gameresult:[],
      tablesName:['electricity','home','generalresult','videoresult','audioresult','messageresult','gameresult'],
    }
  },
  methods:{
    selectRightArr(name,data){
      if (name === 'generalresult') {
        this.generalresult = JSON.parse(JSON.stringify(data));;
      } else if (name === 'videoresult') {
        this.videoresult = data;
      } else if (name === 'audioresult') {
        this.audioresult = data;
      } else if (name === 'messageresult') {
        this.messageresult = data;
      } else if (name === 'gameresult') {
        this.gameresult = data;
      } else if (name === 'home') {
        this.home = data;
      } else if (name === 'electricity') {
        this.country = data;
      }
    },
    insertArr(){
      this.tablesName.forEach(name => {
            axios.get('./getSaved',{
            params: {
              tableName:name
            }
          }).then(res => {
            this.selectRightArr(name,res.data)
          }).catch(function (error) {
            alert(error);
          })
      });
    },
    countDaytime(home){
      let time = (24-parseInt(home[0].time))*60;
      this.times.daytime = time;
      this.name = home[0].name;
      this.countryIndex = home[0].production_fuel;
      if(home[0].selectCPE =="true"){
        this.allElectricity.low = 6 * 24; 
        this.allElectricity.high = 6 * 24; 
      }
    },
    countActivitiesTime(Arr){
      let time = 0;
      Arr.forEach(function(element){
        let sTime = parseInt(element.time);
        time = time+sTime;
      });
      //console.log(time);
      this.times.activitiesTime = this.times.activitiesTime+time;
    },
    countCarbon(Arr){
      let cf1 = 0;
      let cf2 = 0;
      Arr.forEach(el=>{
        cf1 = cf1+ parseFloat(el.electricity1);
        cf2 = cf2+ parseFloat(el.electricity2);
      })
      this.allElectricity.low = this.allElectricity.low+cf1;
      this.allElectricity.high = this.allElectricity.high+cf2;
    },
    dealArr(Arr,num){
      let dataArr = [];
      for (let i = 0; i < num; i++) {
        let obj = {};
        obj["name"] = Arr[i].activity;
        obj["time"] = Arr[i].time;
        obj["electricity1"] = (Arr[i].time/60 * Arr[i].wh)+((Arr[i].time * Arr[i].traffic)/1024 * 200);
        obj["electricity2"] = (Arr[i].time/60 * Arr[i].wh)+((Arr[i].time * Arr[i].traffic)/1024 * 500);
        dataArr.push(obj);
      }
      for (let i = num; i < Arr.length; i++) {
        dataArr.forEach(el=>{
          if (el.name==Arr[i].activity) {
            el.time = el.time+Arr[i].time;
            el.electricity1 = el.electricity1+(Arr[i].time/60 * Arr[i].wh)+((Arr[i].time * Arr[i].traffic)/1024 * 200);
            el.electricity2 = el.electricity2+(Arr[i].time/60 * Arr[i].wh)+((Arr[i].time * Arr[i].traffic)/1024 * 600)
          }
        })
      }
      //console.log(dataArr);
      return dataArr;
    },
    dealDevices(Arr){
      //console.log(this.devices.length);
      let a = 0;
      Arr.forEach(el=>{
        for (let i = 0; i < this.devices.length; i++) {
          if (this.devices[i].name == el.device) {
            this.devices[i].value = this.devices[i].value + parseInt(el.time);
          }
        }
      })
    },
    initData(Arr,type){
      let data = [];
      Arr.forEach(el=>{
        let obj = {};
        if (type=='time') {
          obj["value"] = el.time;
        }else if(type=="electricity"){
          obj["value"] = el.electricity2.toFixed(2);
        }
        obj["name"] = el.name;
        data.push(obj);
      })
      return data;
    },
    drawPie(Arr,divName,type) {
      let myChart = this.$echarts.init(document.getElementById(divName));
      let useData=[];
      let useFormatter='';
      let seriesTitle='';
      let useMax = 0;
      let head = '';
      if(type=="time"){
        useData = this.initData(Arr,type);
        useFormatter = '{a} <br/>{b} : {c}mins ({d}%)';
        seriesTitle = 'Time Consumption';
        head = 'Time Consumption Ratio';
        useMax = Math.max(useData.time);
      }else if (type=="electricity"){
        useData = this.initData(Arr,type);
        useFormatter = '{a} <br/>{b} : {c}w ({d}%)';
        seriesTitle = 'Electricity Consumption';
        head = 'Electricity Consumption Ratio';
        useMax = Math.max(useData.electricity);
      }
      let option = {
            title: {
                text: head,
                subtext: 'The data comes from your preferences',
                left: "30%",
            },
            tooltip: {
                trigger: 'item',
                formatter: useFormatter
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: useData.name
            },
            series: [
                {
                    name: seriesTitle,
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: useData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                }
            ]
        };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initBarData(Arr,type){
      let data = [];
      Arr.forEach(el=>{
        if (type == 'country') {
          data.push(el.country)
        } else if (type == 'production_fuel') {
          data.push(el.production_fuel.toFixed(4))
        }
      })
      return data;
    },
    drawBar(Arr) {
      let myChart = this.$echarts.init(document.getElementById("country"));
      let echart = this.$echarts;
      let target = parseFloat(this.countryIndex).toFixed(4);
      var dataAxis = this.initBarData(Arr,"country");
      var data = this.initBarData(Arr,"production_fuel");
      var yMax = 1;
      var dataShadow = [];

      for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
      }

      let option = {
          title: {
              text: 'Electricity Conversion Factor of Different Countries',
              subtext: 'Unit: kg CO2/kWh',
              left:"center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          xAxis: {
              data: dataAxis,
              axisLabel: {
                  inside: true,
                  rotate:90,
                  textStyle: {
                      color: '#fff'
                  }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              z: 10
          },
          yAxis: {
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  textStyle: {
                      color: '#999'
                  }
              }
          },
          dataZoom: [
              {
                  type: 'inside'
              }
          ],
          series: [
              {
                  type: 'bar',
                  showBackground:true,
                  itemStyle: {
                      color:function(params){
                        if (params.value == target) {
                          return new echart.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                        } else {
                          return new echart.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#70c080'},
                                {offset: 0.5, color: '#58a858'},
                                {offset: 1, color: '#107038'}
                            ]
                          )
                        }
                      }
                  },
                  barCategoryGap: '10%',
                  emphasis: {
                      itemStyle: {
                          color: new this.$echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                      }
                  },
                  data: data
              }
          ]
      };

      // Enable data zoom when user click bar.
      let zoomSize = 6;
      myChart.on('click', function (params) {
          console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          myChart.dispatchAction({
              type: 'dataZoom',
              startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
              endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
      });
      myChart.setOption(option);
      window.onresize = function () {
        myChart.resize();
      }
    },
    drawTimePie(Arr,divName,times) {
      let allTimes = times.activitiesTime;
      let myChart = this.$echarts.init(document.getElementById(divName));
      let useFormatter='{a} <br/>{b} : {c}mins ({d}%)';
      let seriesTitle='';
      let useMax = Math.max(Arr.time);
      let head = 'The ratio of how long electronic devices are used in a day';
      let option = {
            title: {
                text: head,
                subtext: `You spent ${allTimes} minutes in these ICT devices`,
                textAlign: "center",
                left: "60%"
            },
            tooltip: {
                trigger: 'item',
                formatter: useFormatter
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: Arr.name,
                top: 20,
                left:20
            },
            series: [
                {
                    name: seriesTitle,
                    type: 'pie',
                    radius: '55%',
                    center: ['60%', '50%'],
                    data: Arr,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                }
            ]
        };
      myChart.setOption(option);
    },
  },
  created(){
    this.insertArr();
  },
  mounted(){
    setTimeout(()=>{
      this.drawBar(this.country);
    });

    setTimeout(()=>{
      this.drawTimePie(this.devices,"device",this.times);
    },1000);
  },
  watch:{
    home(){
			this.$nextTick(()=>{
          this.countDaytime(this.home); 
          this.drawBar(this.country);
          //console.log(this.countryIndex);
			})
    },
    generalresult(){
      this.$nextTick(()=>{
          this.countActivitiesTime(this.generalresult); 
          let newArr = this.dealArr(this.generalresult,4);
          this.countCarbon(newArr);
          this.dealDevices(this.generalresult);
          this.drawPie(newArr,"general","electricity");
          this.drawPie(newArr,"generalTime","time");
			})
    },
    videoresult(){
      this.$nextTick(()=>{
          this.countActivitiesTime(this.videoresult); 
          let newArr = this.dealArr(this.videoresult,6);
          this.countCarbon(newArr);
          this.dealDevices(this.videoresult);
          this.drawPie(newArr,"video","electricity");
          this.drawPie(newArr,"videoTime","time");
			})
    },
    audioresult(){
      this.$nextTick(()=>{
          this.countActivitiesTime(this.audioresult); 
          let newArr = this.dealArr(this.audioresult,4);
          this.countCarbon(newArr);
          this.dealDevices(this.audioresult);
          this.drawPie(newArr,"audio","electricity");
          this.drawPie(newArr,"audioTime","time");
			})
    },
    messageresult(){
      this.$nextTick(()=>{
          this.countActivitiesTime(this.messageresult); 
          let newArr = this.dealArr(this.messageresult,4);
          this.countCarbon(newArr);
          this.dealDevices(this.messageresult);
          this.drawPie(newArr,"message","electricity");
          this.drawPie(newArr,"messageTime","time");
			})
    },
    gameresult(){
      this.$nextTick(()=>{
          this.countActivitiesTime(this.gameresult); 
          let newArr = this.dealArr(this.gameresult,3);
          this.countCarbon(newArr);
          this.dealDevices(this.gameresult);
          this.drawPie(newArr,"game","time");
          this.drawPie(newArr,"gameTime","time");
			})
    },
    getLowElectricity:{
      handler(){
        this.allCarbon.low = (this.allElectricity.low.toFixed(3) * this.countryIndex).toFixed(3);
      }
    },
    getHighElectricity:{
      handler(){
        this.allCarbon.high = (this.allElectricity.high.toFixed(3) * this.countryIndex).toFixed(3);
        this.allElectricity.final = ((this.allElectricity.high+ this.allElectricity.low)/2000*365).toFixed(3);
        this.allCarbon.final = ((this.allElectricity.final * this.countryIndex)/111).toFixed(1);
      }
    }
  },
  computed:{
    getLowElectricity() {
      return this.allElectricity.low;
    },
    getHighElectricity() {
      return this.allElectricity.low;
    }
  }
}
</script>

<style scoped>
.row{
  margin: 0 auto;
}
.col-lg-6 .col-md-12{
  padding: 0;
}
.btn-link {
  font-weight: 800;
  color: #ffffff;
}
.collapse{
  padding: 1rem;
}
#headingOne,#headingThree,#headingFive,#infoCardbody{
  background-color:#81b214;
}
#headingTwo,#headingFour,#infoCard{
  background-color:#206a5d;
}
h5{
  margin: 0;
}
</style>