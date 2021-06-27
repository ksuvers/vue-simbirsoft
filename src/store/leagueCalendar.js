import leagueApi from "@/api/leagues";

export const mutationTypes = {
    setData: "[league calendar] setData",
    setIsLoading: "[league calendar] setIsLoading"
};

export const getterTypes = {
    getAllMatches: "[league calendar] get all matches",
    isLoading: "[league calendar] is loading"
};

export const actionTypes = {
    getLeagueCalendar: "[league] get league calendar"
};

const state = {
    data: null,
    isLoading: false
};

const getters = {
    [getterTypes.getAllMatches]: state => state.data,
    [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
    [mutationTypes.setData]: (state, data) => state.data = data,
    [mutationTypes.setIsLoading]: (state, value) => state.isLoading = value,
};

const actions = {
    async [actionTypes.getLeagueCalendar]({ commit }, { id }) {
        try {
            commit(mutationTypes.setIsLoading, true);
            commit(mutationTypes.setData, null);

            const league = await leagueApi.getLeagueCalendar(id);

            commit(mutationTypes.setData, league);
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