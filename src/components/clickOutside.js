export default {
  inserted (el, bindings, vnode) {
    document.addEventListener('click', function (e) {
      if (e.target === el || el.contains(e.target)) {
        return
      }
      bindings.value()
    })
  }
//   unbind () {
//     document.removeEventListener()
//   }
}
