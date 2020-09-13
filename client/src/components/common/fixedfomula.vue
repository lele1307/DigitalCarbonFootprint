<template>
    <div class="fomula" :id="idNum">
        <form>
            <div class="row">
                <div class="col-3">
                    <label :for="'act'+idNum">ICT Activities</label>
                    <input :id="'mins'+idNum" type="text" class="form-control" :placeholder="activity" disabled>
                </div>
                <div class="col-2">
                    <label :for="'mins'+idNum">Using Time</label>
                    <input :id="'mins'+idNum" v-model="time" type="text" class="form-control" placeholder="minutes">
                </div>
                <div class="col-2">
                    <label :for="'data'+idNum">Mb/min</label>
                    <input :id="'data'+idNum" type="text" class="form-control" :placeholder="traffic" disabled>
                </div>
                <div class="col-3">
                    <label :for="'dev'+idNum">ICT Device</label>
                    <select :id="'dev'+idNum" class="form-control" v-model="selected">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in device" >{{item.devicename}}</option>
                    </select>
                </div>
                <div class="col-1" v-if="selected != ''">
                    <label :for="'lWh'+idNum">{{lwh}}Wh</label>
                    <input :id="'lWh'+idNum" type="radio" class="form-control" :value="lwh" v-model="picked">
                </div>
                <div class="col-1" v-if="selected != ''">
                    <label :for="'hWh'+idNum">{{hwh}}Wh</label>
                    <input :id="'hWh'+idNum" type="radio" class="form-control" :value="hwh" v-model="picked">
                </div>
                <!-- <h1>{{this.result}}</h1> -->
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props:["idNum","activity","traffic","device"],
    data(){
        return {
            selected:'',
            lwh:'',
            hwh:'',
            picked:null,
            time:null,
            result:{
                "id":this.idNum,
                "activity":this.activity,
                "time":null,
                "traffic":this.traffic,
                "device":null,
                "wh":null
            }
        };
    },
    methods:{
    },
    watch:{
        selected() {
            for (const i in this.device) {
                if (this.device[i].devicename==this.selected) {
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
                this.result.traffic = this.traffic;
            } else {
                this.time = null;
                this.result.time = null;
                this.result.traffic = this.traffic;
            }
        }
    },
    updated(){
        //console.log(this.result);
        this.$emit('getSingleResult',this.result);
    }
}
</script>
<style scoped>
.fomula{
    margin: 2em 1em;
}
</style>