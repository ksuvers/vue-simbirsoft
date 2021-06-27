import teamApi from "@/api/teams";

export const getterTypes = {
    calendar: "[team calendar] team calendar",
    isLoading: "[team calendar] is loading"
};

export const mutationTypes = {
    setData: "[league calendar] setData",
    setIsLoading: "[league calendar] setIsLoading"
};

export const actionTypes = {
    getTeamCalendar: "[team calendar] get team calendar"
};

const state = {
    data: null,
    isLoading: false
};

const getters = {
    [getterTypes.calendar]: state => state.data,
    [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
    [mutationTypes.setData]: (state, data) => state.data = data,
    [mutationTypes.setIsLoading]: (state, value) => state.isLoading = value,
};

const actions = {
    async [actionTypes.getTeamCalendar]({ commit }, { teamId }) {
        try {
            commit(mutationTypes.setIsLoading, true);
            commit(mutationTypes.setData, null);

            const calendar = await teamApi.getTeamCalendar(teamId);

            commit(mutationTypes.setData, calendar);
            commit(mutationTypes.setIsLoading, false);
        } catch (e) {
            commit(mutationTypes.setIsLoading, false);
            throw e;
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};