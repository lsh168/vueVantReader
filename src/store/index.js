import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
// import book from './modules/book'
// import user from './modules/user'
// import getters from './getters'
// import actions from './actions'

Vue.use(Vuex)

const TOKEN_KEY = 'READER_USER'
export default new Vuex.Store({

  
  state: {
    // 一个对象，存储当前用户登陆信息（token数据）
    user: getItem(TOKEN_KEY),
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // book ------------

    fileName: "",
    menuVisible: false,
    settingVisible: -1,
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
    // book---------------


  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为防止刷新丢失，把数据存到本地
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    },
    // book----------------
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENU_VISIBLE': (state, visible) => {
      state.menuVisible = visible
    },
    'SET_SETTING_VISIBLE': (state, visible) => {
      state.settingVisible = visible
    },
    'SET_DEFAULT_FONT_SIZE': (state, fontSize) => {
      state.defaultFontSize = fontSize
    },
    'SET_DEFAULT_FONT_FAMILY': (state, font) => {
      state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
      state.fontFamilyVisible = visible
    },
    'SET_DEFAULT_THEME': (state, theme) => {
      state.defaultTheme = theme
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_IS_PAGINATING': (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    'SET_CURRENT_BOOK': (state, currentBook) => {
      state.currentBook = currentBook
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_PAGINATE': (state, paginate) => {
      state.paginate = paginate
    },
    'SET_PAGELIST': (state, pagelist) => {
      state.pagelist = pagelist
    },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
    // book-------------------
  },
  actions: {
    // commit 方法，用于调用mutations。
    // state  获取值
    // book-------------------------
    setFontFamilyVisible: ({ commit }, visible) => {
      return commit('SET_FONT_FAMILY_VISIBLE', visible)
    },
    setDefaultFontFamily: ({ commit }, font) => {
      return commit('SET_DEFAULT_FONT_FAMILY', font)
    },
    setDefaultFontSize: ({ commit }, fontSize) => {
      return commit('SET_DEFAULT_FONT_SIZE', fontSize)
    },
    setSettingVisible: ({ commit }, visible) => {
      return commit('SET_SETTING_VISIBLE', visible)
    },
    setMenuVisible: ({ commit }, visible) => {
      return commit('SET_MENU_VISIBLE', visible)
    },
    setFileName: ({ commit }, fileName) => {
      // console.log(fileName);
      return commit('SET_FILENAME', fileName)
    },
    setDefaultTheme: ({ commit }, theme) => {
      return commit('SET_DEFAULT_THEME', theme)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
      return commit('SET_BOOK_AVAILABLE', bookAvailable)
    },
    setProgress: ({ commit }, progress) => {
      return commit('SET_PROGRESS', progress)
    },
    setSection: ({ commit }, section) => {
      return commit('SET_SECTION', section)
    },
    setIsPaginating: ({ commit }, isPaginating) => {
      return commit('SET_IS_PAGINATING', isPaginating)
    },
    setCurrentBook: ({ commit }, book) => {
      return commit('SET_CURRENT_BOOK', book)
    },
    setNavigation: ({ commit }, navigation) => {
      return commit('SET_NAVIGATION', navigation)
    },
    setCover: ({ commit }, cover) => {
      return commit('SET_COVER', cover)
    },
    setMetadata: ({ commit }, metadata) => {
      return commit('SET_METADATA', metadata)
    },
    setPaginate: ({ commit }, paginate) => {
      return commit('SET_PAGINATE', paginate)
    },
    setPagelist: ({ commit }, pagelist) => {
      return commit('SET_PAGELIST', pagelist)
    },
    setIsBookmark({ commit }, isBookmark) {
      return commit('SET_IS_BOOKMARK', isBookmark)
    },
    setOffsetY({ commit }, offsetY) {
      return commit('SET_OFFSETY', offsetY)
    }
    // book----------------
  },
  getters: {
    fileName: state => state.fileName,
    menuVisible: state => state.menuVisible,
    settingVisible: state => state.settingVisible,
    defaultFontSize: state => state.defaultFontSize,
    defaultFontFamily: state => state.defaultFontFamily,
    fontFamilyVisible: state => state.fontFamilyVisible,
    defaultTheme: state => state.defaultTheme,
    bookAvailable: state => state.bookAvailable,
    progress: state => state.progress,
    section: state => state.section,
    isPaginating: state => state.isPaginating,
    currentBook: state => state.currentBook,
    navigation: state => state.navigation,
    cover: state => state.cover,
    metadata: state => state.metadata,
    paginate: state => state.paginate,
    pagelist: state => state.pagelist,
    offsetY: state => state.offsetY,
    isBookmark: state => state.isBookmark
  }

})