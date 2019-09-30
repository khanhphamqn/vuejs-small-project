const keypress = (event, el) => {
  el.value = el.value.replace(/[^0-9.]/g, "");
  if (
    (event.which != 46 || el.value.indexOf(".") != -1) &&
    (event.which < 48 || event.which > 57)
  ) {
    event.preventDefault();
  }
};
export const Float = {
  inserted: function(el) {
    el.addEventListener("keypress", event => keypress(event, el));
  },
  unbind: function(el) {
    el.removeEventListener("keypress", event => keypress(event, el));
  }
};
