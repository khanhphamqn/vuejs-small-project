const keypress = (event, el) => {
  var charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) event.preventDefault();
  return true;
};
export const Integer = {
  inserted: function(el) {
    el.addEventListener("keypress", event => keypress(event, el));
  },
  unbind: function(el) {
    el.removeEventListener("keypress", event => keypress(event, el));
  }
};
