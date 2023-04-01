import { useIdentityStore } from './../stores/identityStore'

const GetDefaultOptions = (): RequestInit => {
  const identityStore = useIdentityStore()

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (identityStore.accessToken) {
    headers['Authorization'] = `Bearer ${identityStore.accessToken}`
  }

  const options: RequestInit = {
    headers,
    redirect: 'manual',
    referrerPolicy: 'no-referrer'
  }

  return options
}

export const Get = async (url: string) =>
  await fetch(url, {
    ...GetDefaultOptions(),
    method: 'get'
  })

export const Post = async <T>(url: string, data: T) =>
  await fetch(url, {
    ...GetDefaultOptions(),
    method: 'post',
    body: JSON.stringify(data)
  })

export const Put = async <T>(url: string, data: T) =>
  await fetch(url, {
    ...GetDefaultOptions(),
    method: 'put',
    body: JSON.stringify(data)
  })

export const Delete = async (url: string) =>
  await fetch(url, {
    ...GetDefaultOptions(),
    method: 'delete'
  })
