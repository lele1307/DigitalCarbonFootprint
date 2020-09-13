<template>
    <div id="nav">
        <ul id="menu" class="nav-left-container my-2">
            <li v-for="(item,index) in List" :key="index">
                <router-link :to="item.router">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    template:'#BaseNav',
    data:function(){
        return{
            List:[
                {router:"/genApp",name:"Apps"},
                {router:"/video",name:"Video"},
                {router:"/audio",name:"Audio"},
                {router:"/messaging",name:"Messaging"},
                {router: "/gaming", name: "Game"}
            ]
        }
    }
}
</script>
<style scoped>
ul {
    margin: 0;
    padding: 0;
}
#menu{
	font-size: 18px;
    font-weight: bold;
}
#menu li{
    border-radius:20px; 
    margin: auto 0.1rem;
    padding:0.5rem;
	text-decoration: none;
	list-style: none;
	display: inline;
	background-color: #81b214;
}
#menu li a{
	color:#040404;
	text-decoration: none;
	margin:1em;
	height:3em; 
	line-height:3em; 
	text-align:center;
}
#menu li:hover{
background-color: #206a5d;
}
</style>