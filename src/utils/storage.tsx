export default {
  /**
   * Set a value to local storage
   *
   * @param {string} key
   * @param {*} value
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * Get a value from local storage
   *
   * @param {string} key
   * @returns {*}
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * Remove a value from local storage
   *
   * @param {string} key
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * Clear all values from local storage
   */
  clear() {
    localStorage.clear()
  }
}
