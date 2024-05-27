export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultsList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  basketList: document.querySelector(".shopping ul"),
  clearBtn: document.querySelector("#clear"),
  likeList: document.querySelector(".list"),
};
// LocalStorage veri ekleme/güncelleme
export const setLocalStorage = (key, data) => {
  //Verileri stringe çevirme
  const strData = JSON.stringify(data);
  //Localstorage kaydetme
  localStorage.setItem(key, strData);
};
//localstorage'dan eleman alma
export const getFromLocal = (key) => {
  //String veriyi lokalden alma
  const strData = localStorage.getItem(key);
  //String veriyi eski haline cevirip dışarı aktarma
  return JSON.parse(strData);
};

//Sepetin doluluk oranına göre sepeti temizle butonu görünür.
export const controlBtn = (basket) => {
  if (basket.length > 0) {
    elements.clearBtn.style.display = "flex";
  } else {
    elements.clearBtn.style.display = "none";
  }
  console.log(basket);
};
