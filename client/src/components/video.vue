<template>
  <div id="video" class="d-flex flex-column my-5">
    <div class="mx-auto col-10 py-1 my-2 row" id="intro">
      <h2 class="mx-auto col-3">Video streaming</h2>
      <BaseNav class="col-9"></BaseNav>
    </div>
    <div class="mx-auto alert alert-info col-8" role="alert">
      The chosen video resolutions and formats were representative of video services viewed on smartphones today, as well as some “emergent” formats. There are no definitive bit rates for specific video resolutions, as they are sensitive to many parameters—including container, codec, profile, audio coding, overheads, and not least, content. For the bitrates here, we have set “typical” values.
      <br>
      All the bitrates are for calculating traffic volume, not for determining the bandwidth required for a good user experience (which can be twice the bitrate).
      <br>
      Virtual reality (VR) is part of rapidly evolving ecosystems which include devices (smartphones, headsets, glasses, displays), sensors, cameras, SDKs, and application servers.
    </div>
    <div class="mx-auto alert alert-warning col-8" role="alert">
      <strong>Note:</strong>
      <br>
      1.The power consumption of ICT devices can choose different Wh according to your usage.
      <br>
      2.The "Add" button helps you create customized calculating form.
    </div>
    <div id="inputInfo" class="mx-auto p-3">
      <div id="fcontent">
        <Fixformula v-for="item in Activities" :key="item.id" :idNum="item.id" :activity="item.activity" :traffic="item.traffic" :device="Device" @getSingleResult="setSingleResult"></Fixformula>
      </div>
      <div id="ocontent" v-if="finalResult.length > 6">
        <Formula v-for="item in clearFinalResult" :key="item.id" :num="item.id" :activities="Activities" :device="Device" @delFormula="delFormula" @getSingleResult="setSingleResult"></Formula>
      </div>
      <div class="mx-auto my-3" id="button-group">
        <div class="mx-1">
          <button type="button" class="btn btn-success" @click="addFormula">ADD</button>
        </div>
        <div class="mx-1">
          <button type="button" class="btn btn-success" @click="saveResult">SAVE</button>
        </div>
        <div class="mx-1">
          <router-link :to=router :class="nextBtn" role="button" aria-pressed="true" >NEXT</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseNav from '../components/common/nav.vue'
import Fixformula from '../components/common/fixedfomula.vue' 
import Formula from '../components/common/fomula.vue'
import axios from 'axios';
axios.defaults.baseURL = '/root';

export default {
  components: {
    BaseNav,
    Fixformula,
    Formula
  },
  data(){
    return{
      router:'/audio',
      save:'/save',
      delete:'/cleantable',
      tableName:'videoresult',
      Activities:[
        {id:'1',activity:"360p",traffic:2.25},
        {id:'2',activity:"480p",traffic:6},
        {id:'3',activity:"720p",traffic:11.25},
        {id:'4',activity:"1080p",traffic:19.5},
        {id:'5',activity:"4K",traffic:120},
        {id:'6',activity:"VR",traffic:75},
      ],
      Device:[
        {id:'1',devicename:"Smartphone",lWh:3,hWh:5},
        {id:'2',devicename:"Tablet",lWh:10,hWh:15},
        {id:'3',devicename:"Laptop PC",lWh:40,hWh:90},
        {id:'4',devicename:"Desktop PC",lWh:60,hWh:300},
        {id:'5',devicename:"TV",lWh:200,hWh:240},
        {id:'6',devicename:"Projector",lWh:250,hWh:300},
        {id:'7',devicename:"Wearable",lWh:40,hWh:90}
      ],
      fixedNum:0,
      finalResult:[],
      nextBtn:{
        "btn":true,
        "btn-secondary":true,
        "active":false,
        "disabled":true,
      }
    }
  },
  computed: {
    clearFinalResult: function () {
      return this.finalResult.filter(function (item) {
        return item.id > 6
      })
    }
  },
  methods:{
    initFinalResult(){
      this.fixedNum = this.Activities.length;
      for (let i = 0; i < this.fixedNum; i++) {
        this.finalResult.push({
          "id":i+1,
          "activity":this.Activities[i].activity,
          "time":null,
          "traffic":this.Activities[i].traffic,
          "device":null,
          "wh":null
        });
      }
    },
    addFormula(){
      const len = this.finalResult.length;
      let lastId = parseInt(this.finalResult[len-1].id);
      console.log(this.finalResult[len-1]);
      let addId = lastId+1;
      this.finalResult.push({
          "id":addId,
          "activity":null,
          "time":null,
          "traffic":null,
          "device":null,
          "wh":null
      });
      this.nextBtnDisabled();
    },
    delFormula(itemId){
      var index;
      const delId = itemId;
      for (const i in this.finalResult) {
        let id = this.finalResult[i].id;
        if(delId === id){
          index = i;
        }
      }
      this.finalResult.splice(index,1);
    },
    setSingleResult(singleRes){
      const selectId = parseInt(singleRes.id);
      this.finalResult.forEach(item => {
        if (item.id === selectId){
          this.$set(item, 'activity',singleRes.activity);
          this.$set(item, 'traffic',singleRes.traffic);
          this.$set(item, 'time',singleRes.time);
          this.$set(item, 'device',singleRes.device);
          this.$set(item, 'wh',singleRes.wh);
        }
      })
      console.log(this.finalResult);
    },
    saveResult(){
      const item = this.finalResult;
      let target = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].activity!=null) {
          if (item[i].time!= null) {
            if (item[i].time==0) {
              target++;
            }else {
              if (item[i].device!=null) {
                if (item[i].wh!=null) {
                  target++;
                } else {
                  alert("Please Check Power consumption intensity!");
                  this.nextBtnDisabled();
                  break;
                }
              } else {
              alert("You may have missed the ICT Devices part!");
              this.nextBtnDisabled();
              break;
              }
            }
          } else {
            alert("You may have missed the usage time part!");
            this.nextBtnDisabled();
            break;
          }
        } else {
          alert("Please Choose ICT Activity at Optional Part!");
          this.nextBtnDisabled();
          break;
        }
      }
      if (target==item.length) {
        this.delTableContents().then(
          this.sentAllDb
        );
        this.nextBtnActive();
        alert("success");
      }
    },
    sentAllDb(){
      this.finalResult.forEach(item=>{
        this.sentToDB(item);
      })
    },
    delTableContents(){
      return axios.get(this.delete, {
        params: {
          tableName:this.tableName
        }
      })
    },
    sentToDB(item){
      return axios.get(this.save, {
        params: {
          tableName:this.tableName,
          id:item.id,
          activity: item.activity,
          traffic: item.traffic,
          device: item.device,
          wh: item.wh,
          time: item.time
        }
      })
    },
    nextBtnDisabled(){
      this.nextBtn.active = false;
      this.nextBtn.disabled = true;
    },
    nextBtnActive(){
      this.nextBtn.active = true;
      this.nextBtn.disabled = false;
    }
  },
  created(){
    this.initFinalResult();
  }
}
</script>
<style scoped>
</style>