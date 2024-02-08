<script>
import { ref, onMounted } from 'vue'

export default {
   data(){
       return {
           menuList: [{ text: 'Home', link:'#' }, { text: 'Chi siamo', link:"#", submenu : [{text : ' La nostra storia', link : '#'}, {text : 'Il team', link : '#'}]}, { text: 'Cosa facciamo', link:'#', submenu : [{text : ' Accessibilità ', link : '#'}, {text : 'Wcag', link : '#'}]}, { text: 'Contattaci', link:'#'}],
           isOpen : null,
           hasTabindex : 0,
           subMenuVoices: [],
           voicesLink: []
        }
       
   },
    mounted(){
        this.voicesLink = this.$el.getElementsByClassName('j-firstLink')
    },

    methods: {
        openMenu(index){
            this.isOpen = this.isOpen == index ? null : index;
        }
    }
}


</script>





<template>
    <header class="header">
        <a class="header__logo" href="#"><h1>LOGO</h1></a>
        <div class="menu">
            <div class="menu__aux">
                <ul class="menu__firstLevel">
                    <li v-for="(menuItem, index) in menuList" 
                        class="menu__firstLevelVoice" 
                        :class = "{'menu__firstLevelVoice--open' : isOpen == index}">
                        <template v-if="menuItem.submenu">
                            <a :href= menuItem.link 
                            @click.prevent="openMenu(index)"
                            @keyup.prevent ="keyDownTrack(index)"
                            class="menu__firstLevelLink j-firstLink"> 
                                {{ menuItem.text }}
                            </a>
                            
                        </template>
                        <template v-else>
                            <a 
                            @keyup.prevent ="keyDownTrack(index)" 
                            :href="menuItem.link " 
                            class="menu__firstLevelLink j-firstLink"> 
                                {{ menuItem.text }}
                            </a>
                        </template>

                        <ul
                        v-if="menuItem.submenu" 
                        class="menu__secondLevel"
                        :class = "{'menu__secondLevel--open' : isOpen == index}">
                            <li role="none"
                                class="menu__secondLevelVoice" v-for="(subitem, index) in menuItem.submenu">
                                <a 
                                :href="subitem.link"
                                class="menu__secondLevelLink j-submenuLink">
                                    {{ subitem.text }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <button class="header__signIn">
            Accedi
        </button>
    </header>
</template>

<style scoped>

.header{
    align-items: center;
    background-color: #264D8C;
    box-shadow:  0.3em 0.3em 1em rgb(0 0 0 / 60%);
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
}
.header__logo{
    color: white;
}
.menu{
    
    display: flex;
    align-items: center;

}
.menu__aux{
    max-width: 1280px;
    display: flex;
    align-items: center;
    padding: 0 30px;
}
.menu__firstLevel{
    display: flex;
    padding: 0;
}

.menu__firstLevelVoice::after{
    content: none;
    width: 80%;
    height: 5px;
    background-color: white;
    bottom: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.menu__firstLevelVoice{
    text-align: center;
    position: relative;
    color: white;
}


.menu__firstLevelVoice:hover::after{
    content: '';
}


.menu__firstLevelLink{
    color: white;
    padding: 23px 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.menu__firstLevelIcon{
    position: relative;
    transform: rotate(90deg);
    top: 0;
}

.menu__firstLevelIcon--open{
    transform: rotate(-90deg);
    bottom: 0;
    top: unset;
}

.menu__secondLevel.menu__secondLevel--open{
    display: block;
    width: 100%;
    z-index: 1;
    opacity: 1;
    visibility: visible;
}

.menu__firstLevelVoice--open::after{
   content: '';
}

.menu__secondLevel{
    opacity: 0;
    position: absolute;
    top: 100%;
    padding: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #A5B4CC;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}


.menu__secondLevelVoice{
    padding: 12px 30px;
    text-align: center;
}

.menu__secondLevelLink{
    color: black;
}

.menu__secondLevelLink:hover{
    text-decoration: underline;
}

.header__signIn{
    font-size: 16px;
    color: white;
}


</style>