import { reactive } from 'vue';

const state = reactive({
    isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
});

const mutations = {
    SET_DARK_MODE(value) {
        state.isDarkMode = value;
    },
};

const actions = {
    toggleDarkMode() {
        mutations.SET_DARK_MODE(!state.isDarkMode);
    },
};

const getters = {
    isDarkMode: () => state.isDarkMode,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
