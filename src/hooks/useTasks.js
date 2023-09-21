import useSWR from 'swr'

const API_URL = 'http://localhost:3001'

export default function useTasks(options) {
  return useSWR(
    `${API_URL}/tasks`,
    (url) => {
      return fetch(url).then((res) => res.json())
    },
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      ...options,
    },
  )
}
