function color(el, binding) {
  try {
    el.style.color = binding.value
  } catch (e) {
    console.log(`excpetion(color.js) : ${e.message}`)
  }
}

export default color
