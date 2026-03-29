import api from './api'

export const insightService = {
    async getTickerInsight(ticker) {
        const res = await api.get(`/insights/${ticker}`)
        return res.data // { ticker, insight }
    },
}
