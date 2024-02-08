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
            let submenu = this.voicesLink[index].nextSibling;
            this.$nextTick(() => {
                this.subMenuVoices = submenu.getElementsByClassName('j-submenuLink');
                this.subMenuVoices[0].focus();
            })
            

        },

        keyDownTrackSubmenu(i){
            switch(event.key){
            case 'Down':
            case 'ArrowDown':
                event.preventDefault();
                if(i === this.subMenuVoices.length - 1){
                    this.subMenuVoices[0].tabindex = 0;
                    this.subMenuVoices[0].focus();
                    
                }else {
                    this.subMenuVoices[i + 1].tabindex = 0;
                    this.subMenuVoices[i + 1].focus();
                }
                break;
            case 'Up':
            case 'ArrowUp':
                event.preventDefault();
                if(i > 0){
                    
                    this.subMenuVoices[i - 1].tabindex = 0;
                    this.subMenuVoices[i - 1].focus();
                }else {
                    this.subMenuVoices[this.subMenuVoices.length - 1].tabindex = 0;
                    this.subMenuVoices[this.subMenuVoices.length - 1].focus();
                }

                break;
            case 'Tab':
                    this.voicesLink[this.isOpen + 1].focus();
                    this.hasTabindex = this.isOpen + 1;
                    this.isOpen = null
                break;
            case 'Escape':
                this.voicesLink[this.isOpen].focus();
                this.isOpen = null
                break;
            }
            
        },

        keyDownTrack(i){
            switch(event.key){
            case 'Right':
            case 'ArrowRight':
                if(i === this.voicesLink.length - 1){
                    this.hasTabindex = 0;
                    this.voicesLink[0].focus();
                }else {
                    this.hasTabindex = i + 1;
                    this.voicesLink[i + 1].focus();
                }
                break;
            case 'Left':
            case 'ArrowLeft':
                if(i > 0){
                    this.hasTabindex = i - 1;
                    this.voicesLink[i - 1].focus();
                }else {
                    this.hasTabindex = this.voicesLink.length - 1;
                    this.voicesLink[this.voicesLink.length - 1].focus();
                }
                break;
            }
        },
    }
}


</script>





<template>
    <header class="header" role="banner">
        <a class="header__logo" href="#"><h1>LOGO</h1></a>
        <nav aria-label="main menu" class="menu">
            <div class="menu__aux">
                <ul class="menu__firstLevel"
                    role="menubar"
                    aria-label="main menu">
                    <li v-for="(menuItem, index) in menuList" 
                        role="none" class="menu__firstLevelVoice" 
                        :class = "{'menu__firstLevelVoice--open' : isOpen == index}">
                        <template v-if="menuItem.submenu">
                            <a :href= menuItem.link 
                            role="menitem"
                            :tabindex = "hasTabindex == index ? 0 : -1 "
                            aria-haspopup="true"
                            :aria-expanded="this.isOpen == index ? true : false"
                            @click.prevent="openMenu(index)"
                            @keyup.prevent ="keyDownTrack(index)"
                            class="menu__firstLevelLink j-firstLink"> 
                                {{ menuItem.text }}
                            </a>
                            
                        </template>
                        <template v-else>
                            <a 
                            :tabindex = "hasTabindex == index ? 0 : -1"
                            @keyup.prevent ="keyDownTrack(index)" 
                            role="menuitem" 
                            :href="menuItem.link " 
                            class="menu__firstLevelLink j-firstLink"> 
                                {{ menuItem.text }}
                            </a>
                        </template>

                        <ul
                        v-if="menuItem.submenu" 
                        class="menu__secondLevel" 
                        role="menu" 
                        :class = "{'menu__secondLevel--open' : isOpen == index}"
                        :aria-label="menuItem.text">
                            <li role="none"
                                class="menu__secondLevelVoice" v-for="(subitem, index) in menuItem.submenu">
                                <a role="menuitem" 
                                :href="subitem.link"
                                @keyup.prevent = keyDownTrackSubmenu(index)
                                class="menu__secondLevelLink j-submenuLink"
                                :tabindex= "isOpen != index ? -1 : 0" >
                                    {{ subitem.text }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
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
    pointer-event: auto;
}

.menu__firstLevelVoice--open::after{
   content: '';
}

.menu__secondLevel{
    opacity: 0;
    visibility: hidden;
    pointer-event: none;
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