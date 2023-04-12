const postRequest = async (url: RequestInfo | URL, body: any) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      return res.json()
    } else {
      window.console.log(`status=${res.status}, msg=${res.body} from request=${url} `)
    }
  } catch (err) {
    window.console.log('error', err)
  }
}

const getRequest = async (url: RequestInfo | URL) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      return res.json()
    } else {
      window.console.log(`status=${res.status}, msg=${res.body} from request=${url} `)
    }
  } catch (err) {
    window.console.log('error', err)
  }
}

export const createSession = (name: string) => {
  return postRequest(`${import.meta.env.VITE_SERVER_ADDRESS}/sessions/${name}`, {})
}

export const getSessions = () => {
  return getRequest(`${import.meta.env.VITE_SERVER_ADDRESS}/sessions/`)
}
