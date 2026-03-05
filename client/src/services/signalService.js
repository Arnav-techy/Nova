import api from './api'

export const signalService = {
    async getSignals(date, limit = 20) {
        const params = {}
        if (date) params.date = date
        if (limit) params.limit = limit

        // axios interceptor already unwraps response.data, so res = ApiResponse {statusCode, data, message}
        const res = await api.get('/signals', { params })
        return res?.data || []
    },

    async triggerAggregation(date) {
        const body = {}
        if (date) body.date = date

        const res = await api.post('/signals/aggregate', body)
        return res.data
    },
}
