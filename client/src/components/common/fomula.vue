<template>
    <div class="fomula" :id="num">
        <form>
            <div class="row">
                <div class="col-3">
                    <label :for="'act'+num">ICT Activities</label>
                    <select :id="'act'+num" class="form-control" v-model="selectedA">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in activities" >{{item.activity}}</option>
                    </select>
                </div>
                <div class="col-2">
                    <label :for="'mins'+num">Using Time</label>
                    <input :id="'mins'+num" type="text" class="form-control" v-model="time" placeholder="minutes">
                </div>
                <div class="col-1">
                    <label :for="'mins'+num">Mb/min</label>
                    <input :id="'mins'+num" type="text" class="form-control" :placeholder="dataMb" disabled>
                </div>
                <div class="col-3">
                    <label :for="'dev'+num">ICT Device</label>
                    <select :id="'dev'+num" class="form-control" v-model="selectedB"> 
                        <option disabled value="">Please Select</option>
                        <option v-for="item in device" >{{item.devicename}}</option>
                    </select>
                </div>
                <div class="col-1" v-if="selectedB != ''">
                    <label :for="'lWh'+num">{{lwh}}Wh</label>
                    <input :id="'lWh'+num" type="radio" class="form-control" :value="lwh" v-model="picked">
                </div>
                <div class="col-1" v-if="selectedB != ''">
                    <label :for="'hWh'+num">{{hwh}}hWh</label>
                    <input :id="'hWh'+num" type="radio" class="form-control" :value="hwh" v-model="picked">
                </div>
                <div id="del" class="col-1">
                    <button type="button" class="btn btn-danger" @click="setIndex">Delete</button>
                </div>
                <!-- <h1>{{result}}</h1> -->
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props:["num","fixedNum","activities","device"],
    data:function () {
        return {
            disabled:false,
            selectedA: '',
            selectedB: '',
            dataMb:'',
            lwh:'',
            hwh:'',
            picked:'',
            time:0,
            result:{
                "id":this.num,
                "activity":null,
                "time":null,
                "traffic":null,
                "device":null,
                "wh":null
            }
        }
    },
    methods:{
        setIndex(){
            this.$emit('delFormula',this.num);
        }
    },
    watch: {
        selectedA:function () {
            for (const i in this.activities) {
                if (this.activities[i].activity==this.selectedA) {
                    this.dataMb = this.activities[i].traffic;
                    this.result.activity = this.activities[i].activity;
                    this.result.traffic = this.activities[i].traffic;
                }
            }
        },
        selectedB:function () {
            for (const i in this.device) {
                if (this.device[i].devicename==this.selectedB) {
                    this.lwh = this.device[i].lWh;
                    this.hwh = this.device[i].hWh;
                    this.result.device = this.device[i].devicename;
                    this.result.wh = null;
                }
            }
        },
        picked(){
            this.result.wh = this.picked;
        },
        time(){
            let reg = /^\+?[0-9][0-9]*$/;
            if (reg.test(this.time)) {
                this.result.time = parseInt(this.time);
            } else {
                this.time = null;
                this.result.time = null;
                this.result.traffic = this.traffic;
            }
        }
    },
    updated(){
        this.$emit('getSingleResult',this.result);
    }
}
</script>
<style scoped>
#del{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>