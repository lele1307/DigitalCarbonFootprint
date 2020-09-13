<template>
    <div class="d-flex flex-column my-5" id="home">
        <div class="mx-auto col-9 py-1 my-2 row" id="intro">
            <div class="mx-auto col-3" id="title">
                <h1>Invisible Footprint</h1>
            </div>
            <section class="col-9">
                Personal Digital Energy Calculator allows you to explore the relationship between the usage of various app types and daily electricity on   ICT equipment. The application enables the user to estimate the electricity impact of different types of ICT activities, including gaming, messaging, streaming of audio, streaming of various video resolutions, and immersive video formats, etc.
            </section>
        </div>
        <div class="mx-auto alert alert-info col-8" role="alert">
            Please complete the following blank according to your preference and save it !
        </div>
        <div id="inputInfo" class="col-9">
            <form class="p-3">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name" v-model="name" required="required">
                        <small class="form-text text-muted">Only support the input of English letters and spaces.</small>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="age">Age</label>
                        <input type="number" class="form-control" id="age" placeholder="Age" v-model="age" required="required" min="1">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="name">Sleeping Time (hours/day)</label>
                        <input type="number"class="form-control" id="sleep" placeholder="Sleeping Time" min="3" max="15" required="required" v-model="time">
                        <small class="form-text text-muted">Please enter an approximate integer.</small>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Region</label>
                        <select class="form-control" v-model="selectRegion">
                            <option disabled value="">Please Select</option>
                            <option v-for="item in Region">{{item}}</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="country">Country</label>
                        <select class="form-control" id="country" v-model="selectCountry">
                            <option disabled value="">Please Select</option>
                            <option v-for="item in finalCountries">{{item.country}}</option>
                        </select>
                    </div>
                    <small class="form-text text-muted">Some countries and regions cannot find because of data dropped.</small>
                </div>
                <div class="form-group row my-2">
                    <label class="col-form-label pt-0 mr-3">Is the home router powered on all day ?</label>
                        <div class="form-check pr-3">
                            <input id="true" type="radio" class="form-check-input" value="true" v-model="picked">
                            <label for="true">True</label>
                        </div>
                        <div class="form-check pr-1">
                            <input id="false" type="radio" class="form-check-input" value="false" v-model="picked">
                            <label for="false">False</label>
                        </div>
                </div>
                <div class="py-1" id="jump">
                    <button type="button" class="btn btn-success" @click="submitForm">SAVE</button>
                    <router-link :to=router :class="nextBtn" role="button" aria-pressed="true">NEXT</router-link>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = '/root'

export default {
    data:function () {
        return {
            router:'/genApp',
            tableName:'electricity',
            savedTableName:'home',
            Region:['Africa','Asia','Australasia','Middle East','North America','Central&South America','Europe'],
            countries:[],
            name:'',
            age:'',
            time:'',
            picked:'',
            selectRegion:'',
            selectCountry:'',
            production_fuel:'',
            nextBtn:{
                "btn":true,
                "btn-secondary":true,
                "active":false,
                "disabled":true,
            }
        }
    },
    computed: {
        finalCountries: function () {
            const _this = this;
            return this.countries.filter(function (item) {
                return item.region === _this.selectRegion
            })
        }
    },
    watch:{
        selectCountry(){
            for (const i in this.countries) {
                if(this.countries[i].country === this.selectCountry){
                    this.production_fuel = this.countries[i].production_fuel;
                }
            }
        }
    },
    methods:{
        checkForm(){
            if (this.checkName()&&this.checkNum(this.age)&&this.checkNum(this.time)) {
                if(this.checkNum(this.time)){
                    if (this.checkSelect()) {
                        return true;
                    }
                }
            }
            return false;
        },
        checkName(){
            const isletter = /^[a-zA-Z\s]+$/;
            if(this.name===''){
                return false;
            }
            if(isletter.test(this.name)){
                return true;
            } else {
                return false;
            }
        },
        checkNum(nubmer){
            const isNum = /^[0-9]+.?[0-9]*/;
            if (!isNum.test(nubmer)) {
                return false;
            }
            return true;
        },
        checkSelect(){
            if (this.selectRegion===''||this.selectCountry===''||this.picked==='') {
                return false;
            }
            return true;
        },
        submitForm(){
            const _this = this;
            if (!this.checkForm()) {
                alert("Please Input or Check your information!")
            } else {
                this.delTableContents().then(this.sendToTable);
                alert("Please go ahead and click \"NEXT\"");
                this.nextBtnActive();
            }
        },
        getCountries(){
            const _this = this;
            axios.get('./getSaved', {
                params: {
                    tableName: this.tableName,
                }
            }).then(function (response) {
                //console.log(response);
                _this.countries = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        sendToTable(){
            return axios.get('./save', {
                params: {
                        tableName:this.savedTableName,
                        name:this.name,
                        age: this.age,
                        time: this.time,
                        selectRegion: this.selectRegion,
                        selectCountry: this.selectCountry,
                        production_fuel:this.production_fuel,
                        selectCPE:this.picked,
                        id:new Date().getTime()
                }
            })
        },
        delTableContents(){
            return axios.get('/cleantable',{
                params: {
                    tableName:this.savedTableName
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
        this.getCountries()
    }
}

</script>

<style scoped>
#jump{
    text-align:center
}
.row{
    margin: 0 auto;
}

.form-group {
    margin: 0;
}
.form-row {
    margin-bottom: 1rem;
}

.alert {
    margin: 1rem auto;
}

</style>