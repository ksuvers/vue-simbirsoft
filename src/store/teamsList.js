import teamsApi from "@/api/teams";

export const getterTypes = {
    getAllTeams: "[teams list] get all teams",
    isLoading: "[teams list] is loading"
};

export const mutationTypes = {
    setData: "[league calendar] setData",
    setIsLoading: "[league calendar] setIsLoading"
};

export const actionTypes = {
    getTeams: "[teams list] get teams"
};

const state = {
    data: null,
    isLoading: false
};

const getters = {
    [getterTypes.getAllTeams]: state => state.data,
    [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
    [mutationTypes.setData]: (state, data) => state.data = data,
    [mutationTypes.setIsLoading]: (state, value) => state.isLoading = value,
};

const actions = {
    async [actionTypes.getTeams]({ commit }) {
        try {
            commit(mutationTypes.setIsLoading, true);
            commit(mutationTypes.setData, null);

            const teams = await teamsApi.getTeams();

            commit(mutationTypes.setData, teams);
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