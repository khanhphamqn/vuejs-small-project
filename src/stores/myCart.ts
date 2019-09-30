const store = localStorage.getItem("boughtItems")
  ? JSON.parse(localStorage.getItem("boughtItems") || "{}")
  : [];

export const myCart = {
  state: {
    BoughtItem: store
  },
  mutations: {
    addToCard(state: any, item: any) {
      state.BoughtItem = state.BoughtItem.concat(item);
      localStorage.setItem("boughtItems", JSON.stringify(state.BoughtItem));
    },
    deleteItem(state: any, item: any) {
      state.BoughtItem = state.BoughtItem.filter((b: any) => b.id !== item.id);
      localStorage.setItem("boughtItems", JSON.stringify(state.BoughtItem));
    },
    updateItem(state: any, item: any) {
      state.BoughtItem = state.BoughtItem.filter((b: any) => b.id !== item.id);
      state.BoughtItem = state.BoughtItem.concat(item);
      localStorage.setItem("boughtItems", JSON.stringify(state.BoughtItem));
    }
  },
  getters: {
    myCart: (state: any, getters: any) => {
      return getters.unitItems.reduce((a: any, c: any) => {
        let isExist = a.findIndex((i: any) => i.supplierId == c.supplierId);
        if (isExist == -1) {
          a.push({
            supplier: c.supplier,
            supplierId: c.supplierId,
            data: [c]
          });
        } else {
          a[isExist].data.push(c);
        }
        return a;
      }, []);
    },
    unitItems: (state: any) =>
      state.BoughtItem.reduce((a: any, c: any) => {
        let isExist = a.findIndex((i: any) => i.id == c.id);
        if (isExist == -1) {
          a.push(Object.assign({}, c));
        } else {
          a[isExist].buy = Math.min(
            a[isExist].buy + parseInt(c.buy),
            parseInt(c.inStock) * 1000
          );
        }
        return a;
      }, []).sort((a: any, b: any) => {
        if (a.product > b.product) return 1;
        return -1;
      })
  },
  actions: {
    cartFlow({ commit }: { commit: any }, payload: any) {
      switch (payload.type) {
        case "DELETE":
          commit("deleteItem", payload.item);
          break;
        case "UPDATE":
          commit("updateItem", payload.item);
          break;
      }
    }
  }
};
