import { useState } from '#imports'

export const useUser = () => useState('user', () => null)
export const useCounter = () => useState<number>('counter', () => 0)
export const useTauri = () => useState<boolean>('tauri', () => window['__TAURI_IPC__'])
