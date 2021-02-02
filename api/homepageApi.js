export const getCarousel = (ctx) => ctx.$axios.$get('v1/cm/index_banner')

export const getMenuList = (ctx) => ctx.$axios.$get('v1/cm/index_menu_list')

export const getMenuCounter = (ctx) => ctx.$axios.$get('v1/cm/index_menu_stat')
