<template>
    <div v-if="!children.length == 0" class="cm-holder" :class="{'cm-holder-main' : level == 0}">
        <input type="radio" :name="'level-' + level" @click="menuItem($event)">
        <div class="cm-title">
            <component :is="icon" class="cm-icon" />
            <span class="cm-title-text">{{ title }}</span>
            <fa-chevron-down class="cm-icon-down" />
        </div>
        <div class="cm-content">
            <div class="cm-inner-holder">
                <div class="collapse-menu" v-for="(item, index) in children" :key="index">
                    <recursive-menu
                        v-bind="{
                            level: level + 1,
                            title: item.title,
                            children: item.children,
                            to: item.to,
                            icon: item.icon
                        }"
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="cm-holder cm-holder-link" :class="{'cm-holder-main' : level == 0}">
        <input type="radio" :name="'level-' + level" @click="$router.push(to)">
        <router-link class="cm-title" :to="to">
            <component :is="icon" class="cm-icon" />
            <span class="cm-title-text">{{ title }}</span>
        </router-link>
    </div>
</template>

<script>
import faAddressCard from '../../../assets/icons/address-card.svg'
import faAirplay from '../../../assets/icons/airplay.svg'
import faBlockBrick from '../../../assets/icons/block-brick.svg'
import faChevronDown from '../../../assets/icons/chevron-down.svg'
import faHouse from '../../../assets/icons/house.svg'
import faShieldCheck from '../../../assets/icons/shield-check.svg'
import faTags from '../../../assets/icons/tags.svg'
import faUserGroup from '../../../assets/icons/user-group.svg'

export default {
    name: 'recursive-menu',
    components: {
        faAddressCard,
        faAirplay,
        faBlockBrick,
        faChevronDown,
        faHouse,
        faShieldCheck,
        faTags,
        faUserGroup
    },
    props: {
        level: {
            type: Number,
            required: true,
        },
        icon: {
            type: String,
            default: 'fa-airplay',
        },
        title: {
            type: String,
            required: true,
        },
        children: {
            type: Array,
            default: () => [],
        },
        to: {
            type: String,
            default: '/',
        }
    },
    data() {
        return {}
    },
    methods: {
        menuItem(event) {
            var el = event.target;
            var level = el.getAttribute('name');

            if ( el.classList.contains('active') ) {
                if ( el.classList.contains('collapsing') ) {
                    return;
                }
                el.classList.remove('active');
                el.checked = false;
                this.slide(el, 'close');
            } else {
                var elActive = document.querySelector('input[name="' + level +'"].active');
                if ( elActive ) {
                    elActive.classList.remove('active');
                    this.slide(elActive, 'close');
                }
                el.classList.add('active');
                this.slide(el, 'open');
            }
        },
        
        slide(el, state) {
            if ( el.nextSibling.nextSibling ) {
                var elContent = el.nextSibling.nextSibling;
                var elHeight = el.nextSibling.nextSibling.scrollHeight;

                if ( state == 'open' ) {
                    // //console.log(elHeight);
                    el.classList.add('collapsing');
                    elContent.style.height = elHeight + 'px';

                    elContent.addEventListener('transitionend', function() {
                        elContent.style.height = 'auto';
                        el.classList.remove('collapsing');
                    }, { once: true });
                } else if ( state == 'close' ) {
                    // //console.log('close');
                    el.classList.add('collapsing');
                    elContent.style.height = elHeight + 'px';
                    el.nextSibling.nextSibling.scrollHeight;
                    elContent.style.height = '0';
                    elContent.addEventListener('transitionend', function() {
                        el.classList.remove('collapsing');
                        // //console.log(el.name + 'collapsed');
                    }, { once: true });
                }
            }
        }
    }
}
</script>

<style>
</style>
