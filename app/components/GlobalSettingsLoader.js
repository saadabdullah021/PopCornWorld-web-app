'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGlobalSettings } from '../store/slices/appSlice'

export default function GlobalSettingsLoader() {
  const dispatch = useDispatch()
  const { globalSettings, globalSettingsLoading, globalSettingsError } = useSelector(state => state.app)
  console.log(globalSettings, globalSettingsLoading, globalSettingsError)
  useEffect(() => {
    if (!globalSettings && !globalSettingsLoading) {
      dispatch(fetchGlobalSettings())
    }
  }, [dispatch, globalSettings, globalSettingsLoading])

  return null
}
