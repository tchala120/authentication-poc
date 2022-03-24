import store from 'store'

import type { StorageName } from './types'

const storagePrefix = 'hooray'

export const storageVersion = '0.0.0'

export const storageName: StorageName = {
  accessToken: `${storagePrefix}:accessToken`,
  refreshToken: `${storagePrefix}:refreshToken`,
  version: `${storagePrefix}:version`,
}

export const accessToken = {
  get: () => store.get(storageName.accessToken),
  set: (value: string) => store.set(storageName.accessToken, value),
}

export const refreshToken = {
  get: () => store.get(storageName.refreshToken),
  set: (value: string) => store.set(storageName.refreshToken, value),
}

export const version = {
  get: () => store.get(storageName.version),
  set: (value: string) => store.set(storageName.version, value),
}

const setupStorage = () => {
  const currentVersion = version.get()

  if (currentVersion !== storageVersion) {
    store.clearAll()
    version.set(storageVersion)
  }
}

export default setupStorage
