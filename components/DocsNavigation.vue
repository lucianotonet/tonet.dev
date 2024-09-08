<!-- Start of Selection -->
<template>
    <ContentNavigation :query="`/${props.repo}/${props.dir}/`" v-slot="{ navigation }">
        <ul class="">
            <li v-for="link in navigation" :key="link._path">
                <template v-if="link.children && link.children.length">
                    <h3 class="mb-10 text-2xl font-semibold">{{ link.title }}</h3>
                    <ul class="flex flex-col text-xs">
                        <li v-for="child in link.children" :key="child._path" class="flex flex-col">
                            <template v-if="child.children && child.children.length">
                                <!-- <span class="font-semibold mb-1">{{ child.title }}</span> -->
                                <ul class="flex flex-col gap-1">
                                    <li v-for="grandChild in child.children" :key="grandChild._path"
                                        class="flex flex-col ml-1">
                                        <template v-if="grandChild.children && grandChild.children.length">
                                            <span class="font-semibold opacity-50 uppercase my-1">{{ grandChild.title }}</span>
                                            <ul class="flex flex-col gap-1">
                                                <li v-for="greatGrandChild in grandChild.children"
                                                    class="flex flex-col ml-1" :key="greatGrandChild._path">
                                                    <NuxtLink :to="greatGrandChild._path" class="hover:underline">
                                                        {{ greatGrandChild.title }}
                                                    </NuxtLink>
                                                </li>
                                            </ul>
                                        </template>
                                        <template v-else>
                                            <NuxtLink :to="grandChild._path" class="hover:underline">
                                                {{ grandChild.title }}
                                            </NuxtLink>
                                        </template>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <NuxtLink :to="child._path" class="hover:underline">
                                    {{ child.title }}
                                </NuxtLink>
                            </template>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <NuxtLink :to="link._path" class="hover:underline">
                        {{ link.title }}
                    </NuxtLink>
                </template>
            </li>
        </ul>
    </ContentNavigation>
</template>

<script setup>
import { onMounted, defineProps, computed } from 'vue'; // Importando a store
import { state, actions } from '@/store/docs'; // Importando a store

const props = defineProps(['username', 'repo', 'dir', 'version']) // Adicionando a prop de versão
const files = computed(() => state.files)
onMounted(() => {
    actions.fetchDocs(props.username, props.repo, props.dir, props.version)
})
</script>