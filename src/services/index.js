import APIRequest from "../api";

const Request = new APIRequest({
  url: "https://yourapi.com"
});

export const GetAllItems = () => Request.get(`/allItems`);
export const SortItem = sort => Request.get(`/allItems?sort=${sort}`);
export const doFilter = param => Request.get(`/onFilter?${param}`);
export const GetItem = id => Request.get(`/item/${id}`);
export const BuyItem = data =>
  Request.post(`/buyitem/`, { body: JSON.stringify(data) });

export const DeleteItem = data => Request.delete(`/buyitem/${data.id}`);
export const UpdateItem = data =>
  Request.post(`/buyitem/${data.id}`, {
    body: JSON.stringify({
      quantity: data.buy
    })
  });
