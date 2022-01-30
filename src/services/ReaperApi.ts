import axios, { AxiosResponse } from 'axios'
import ReaperResponse from '../models/ReaperResponse'

async function get(url: string) {
  return await axios
    .get<ReaperResponse, AxiosResponse>(url)
    .then((response) => {
      return new ReaperResponse(response)
    })
    .then((response) => response)
}

const ReaperApiService = {
  get,
}

export default ReaperApiService
