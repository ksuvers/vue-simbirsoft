import leaguesApi from "@/api/leagues";

export const getterTypes = {
    getAll: "[leagues list] get all",
    isLoading: "[league list] is loading"
};

export const mutationTypes = {
    setData: "[leagues list] setData",
    setIsLoading: "[leagues list] setIsLoading"
};

export const actionTypes = {
    getLeagues: "[leagues list] get leagues"
};

const state = {
    data: null,
    isLoading: false
};

const getters = {
    [getterTypes.getAll]: state => state.data,
    [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
    [mutationTypes.setData]: (state, data) => state.data = data,
    [mutationTypes.setIsLoading]: (state, value) => state.isLoading = value,
};

const actions = {
    async [actionTypes.getLeagues]({ commit }) {
        try {
            commit(mutationTypes.setIsLoading, true);
            commit(mutationTypes.setData, null);

            const leagues = await leaguesApi.getLeagues();

            commit(mutationTypes.setData, leagues);
            commit(mutationTypes.setIsLoading, false);
        } catch (e) {
            commit(mutationTypes.setIsLoading, false);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};