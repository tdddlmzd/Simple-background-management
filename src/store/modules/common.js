import website from '@/assets/js/website';
const common = {
    state: {
        website: website,
        nowAdd : false,
        nowTab : false,
        nowCourse : false,
        nowCrawl : false,
        coverage : {},
        sidebar : false,
        numberCount: 0,
    },
    actions: {
      
    },
    mutations: {
        handleNowAdd(state,payload){
            state.nowAdd = payload;
        },
        handleTurnC(state,payload){
            state.coverage = payload;
        },
        handleChangeSider(state,payload){
            state.sidebar = payload;
        },
        handleNowTab(state,payload){
            state.nowTab = payload;
        },
        handCourse(state,payload){
            state.nowTab = payload
        },
        handCrawl(state,payload){
            state.nowTab = payload
        },
        handeCount(state,payload){
            state.numberCount = payload
        }
    }
};
export default common;