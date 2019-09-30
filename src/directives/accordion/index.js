const onClick = (evt, el) => {
  evt.stopPropagation();
  el.isOpen = !el.isOpen;
  if (el.isOpen) {
    el.classList.add("is-open");
  } else {
    el.classList.remove("is-open");
  }
};
export const Accordion = {
  bind: function(el, binding, vnode) {
    if (el.classList.contains("is-open")) {
      el.isOpen = true;
    }
  },
  inserted: function(el) {
    el.addEventListener("click", event => onClick(event, el));
  },
  unbind: function(el) {
    el.removeEventListener("click", event => onClick(event, el));
  }
};
