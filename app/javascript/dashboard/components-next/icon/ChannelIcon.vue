<script setup>
import { toRef, computed } from 'vue';
import { useChannelIcon } from './provider';
import Icon from 'next/icon/Icon.vue';

const props = defineProps({
  inbox: {
    type: Object,
    required: true,
  },
});

const channelIcon = useChannelIcon(toRef(props, 'inbox'));

// Verificar si tiene avatar personalizado
const avatarUrl = computed(() => {
  return props.inbox?.avatar_url;
});
</script>

<template>
  <!-- Si tiene avatar_url, mostrar imagen -->
  <img 
    v-if="avatarUrl"
    :src="avatarUrl"
    :alt="inbox.name || 'Channel icon'"
    class="w-full h-full object-cover rounded"
  />
  <!-- Si no, mostrar icono por defecto -->
  <Icon v-else :icon="channelIcon" />
</template>
