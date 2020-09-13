<template>
    <div class="fomula" :id="idNum">
        <form>
            <div class="row">
                <div class="col-2">
                    <label :for="'act'+idNum">Game Type</label>
                    <input :id="'mins'+idNum" type="text" class="form-control" :placeholder="activity" disabled>
                </div>
                <div class="col-2">
                    <label :for="'mins'+idNum">Using Time</label>
                    <input :id="'mins'+idNum" v-model="time" type="text" class="form-control" placeholder="minutes">
                </div>

                <div class="col-3" v-if="result.activity=='Console Game'">
                    <label :for="'dev'+idNum">ICT Device</label>
                    <select :id="'dev'+idNum" class="form-control" v-model="selectedA">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in device1" >{{item.devicename}}</option>
                    </select>
                </div>
                <div class="col-3" v-else-if="result.activity=='Mobile Game'">
                    <label :for="'dev'+idNum">ICT Device</label>
                    <select :id="'dev'+idNum" class="form-control" v-model="selectedA">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in device2" >{{item.devicename}}</option>
                    </select>
                </div>
                <div class="col-2" v-else-if="result.activity=='PC Game'">
                    <label :for="'dev'+idNum">ICT Device</label>
                    <select :id="'dev'+idNum" class="form-control" v-model="selectedA">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in device3" >{{item.devicename}}</option>
                    </select>
                </div>

                <div class="col-3" v-if="result.activity=='Console Game'&& selectedA !=''">
                    <label :for="'lWh'+idNum">{{lwh}}Wh | Console mode</label>
                    <input :id="'lWh'+idNum" type="radio" class="form-control" :value="lwh" v-model="picked">
                </div>
                <div class="col-2" v-if="selectedA != '' && result.activity=='Console Game'">
                    <label :for="'hWh'+idNum">{{hwh}}Wh | TV mode</label>
                    <input :id="'hWh'+idNum" type="radio" class="form-control" :value="hwh" v-model="picked">
                </div>

                <div class="col-1" v-if="result.activity!='Console Game'&& selectedA !='' ">
                    <label :for="'lWh'+idNum">{{lwh}}Wh</label>
                    <input :id="'lWh'+idNum" type="radio" class="form-control" :value="lwh" v-model="picked">
                </div>
                <div class="col-1" v-if="result.activity!='Console Game'&& selectedA != ''">
                    <label :for="'hWh'+idNum">{{hwh}}Wh</label>
                    <input :id="'hWh'+idNum" type="radio" class="form-control" :value="hwh" v-model="picked">
                </div>

                <div class="col-3" v-if="result.activity=='PC Game'">
                    <label :for="'dev'+idNum">Game Name</label>
                    <select :id="'dev'+idNum" class="form-control" v-model="selectedB">
                        <option disabled value="">Please Select</option>
                        <option v-for="item in gameName" >{{item.gamename}}</option>
                    </select>
                </div>
                <div class="col-1" v-if="result.activity=='PC Game'">
                    <label :for="'data'+idNum">Mb/min</label>
                    <input :id="'data'+idNum" type="text" class="form-control" :placeholder="traffic" disabled>
                </div>

                <div class="col-1" v-if="result.activity=='Mobile Game'">
                    <label :for="'data'+idNum">Mb/min</label>
                    <input :id="'data'+idNum" type="text" class="form-control" :placeholder="mobileTraffic" disabled>
                </div>
                <!-- <h1>{{this.result}}</h1> -->
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props:["idNum","activity","device1","device2","device3","device4"],
    data(){
        return {
            selected:'',
            lwh:'',
            hwh:'',
            picked:null,
            time:null,
            selectedA: '',
            selectedB: '',
            device:[
                {id:'1',devicename:"Microsoft Xbox",lWh:76.1,hWh:276.1},
                {id:'2',devicename:"Sony PlayStation",lWh:49.1,hWh:249.1},
                {id:'3',devicename:"Nintendo Switch",lWh:17.3,hWh:217.3},
                {id:'4',devicename:"Smartphone",lWh:3,hWh:5},
                {id:'5',devicename:"Tablet",lWh:10,hWh:15},
                {id:'6',devicename:"Laptop PC",lWh:40,hWh:90},
                {id:'7',devicename:"Desktop PC",lWh:60,hWh:300},
                {id:'8',devicename:"TVs",lWh:200,hWh:240},
                {id:'9',devicename:"Projectors",lWh:250,hWh:300}
            ],
            gameName:[
                {id:'1',gamename:"Destiny 2",traffic:5},
                {id:'2',gamename:"Counter-Strike: Global Offensive",traffic:4.17},
                {id:'3',gamename:"Dota 2",traffic:2},
                {id:'4',gamename:"League of Legends",traffic:0.75},
                {id:'5',gamename:"Minecraft",traffic:0.67},
                {id:'6',gamename:"World of Warcraft",traffic:0.5},
                {id:'7',gamename:"Final Fantasy XIV",traffic:0.34},
                {id:'8',gamename:"Hearthstone",traffic:0.05},
            ],
            traffic:0,
            mobileTraffic:1,
            result:{
                "id":this.idNum,
                "activity":this.activity,
                "time":null,
                "gameName":null,
                "traffic":1,
                "device":null,
                "wh":null
            }
        };
    },
    methods:{
    },
    watch:{
        selectedA () {
        const targetDevice = this.device.find((item) => (item.devicename == this.selectedA));
            this.lwh = targetDevice.lWh;
            this.hwh = targetDevice.hWh;
            this.result.device = targetDevice.devicename;
            this.result.wh = null;
            if (targetDevice.devicename=='Microsoft Xbox'||targetDevice.devicename=='Sony PlayStation'||targetDevice.devicename=='Nintendo Switch') {
                this.result.traffic = 0;
            }
        },
        selectedB () {
            const targetGame = this.gameName.find((item) => (item.gamename == this.selectedB));
            this.result.gameName = targetGame.gamename;
            this.traffic = targetGame.traffic;
            this.result.traffic = parseFloat(this.traffic);
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