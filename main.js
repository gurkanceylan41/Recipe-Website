import { Search } from "./js/api.js";
import {
  controlBtn,
  elements,
  getFromLocal,
  setLocalStorage,
} from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";
import { v4 as id } from "https://jspm.dev/uuid";

const recipe = new Recipe();

let basket = getFromLocal("basket") || [];
//Sayfanın yüklenme anını izler
document.addEventListener("DOMContentLoaded", () => {
  renderBasketItems(basket);
  controlBtn(basket);
});

const handleSubmit = async (e) => {
  e.preventDefault(); //Sayfanın yenilenmesini engeller

  const query = elements.searchInput.value;

  //Inputun içerisindeki degeri alip bir degiskene aktardık
  if (query == "") {
    //inputun içerisi boşsa aler ile bildirim gönderdik.
    alert("lütfen bir yemek ismi giriniz!");
    return;
  }
  //Fonksiyonu burda durdurmak için return kullandık.

  //inputun içerisinde herhangi birşey yazarsak calısır.

  if (query) {
    //Seach sınıfının bir örneğini oluşturduk
    const search = new Search(query);
    renderLoader(elements.resultsList);

    //Search sınfı içersindeki getResult methodu ile apiye istek attık.
    try {
      await search.getResult();
      renderResult(search.result);
    } catch (error) {
      console.log(error);
    }
  }
};

const controlRecipe = async () => {
  //urldeki idye erişip # işareti yerine bos bir yapı ekledik.
  const id = location.hash.replace("#", "");
  if (id) {
    try {
      await recipe.getRecipe(id);
      recipe.renderRecipe(recipe.info);
    } catch (error) {
      console.log(eror);
    }
  }
};

elements.form.addEventListener("submit", handleSubmit);
// eklenilen hash yapısını her degistiginde calısır
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    //içindekiler dizisini dön ve her döndügümüz tarif için
    //Yeni bir obje oluştur ve bu obje içerisinde id oluştur
    //oluşturdugumuz her bir objeyi basket dizisine push methodu ile ekledik
    recipe.ingredients.forEach((title) => {
      const newItem = {
        id: id(),
        title,
      };
      basket.push(newItem);
    });
    //Sepeti Locale kaydetme
    setLocalStorage("basket", basket);
    //Ekrana sepet elemanlarını bas
    renderBasketItems(basket);
    controlBtn(basket);
  }
  if (e.target.id === "like-btn") {
    //Tıkladıgımız etiketin id'si like-btn ise beğenilme işlemini gerçekleştirir
    recipe.controlLike();
  }
};

//sepete ekle ve like butonuna tıklanma olaylarını izleme
elements.recipeArea.addEventListener("click", handleClick);

const deleteItem = (e) => {
  //basketList alanındaki elemanlardan idsi delete-item oldugunda çalışır
  if (e.target.id === "delete-item") {
    // x iconunun kapsayıcısına erişmek için parentElement yöntemini kullandık
    const parent = e.target.parentElement;
    console.log(basket);
    //Secilen ürünü diziden kaldırmak için dataset özelligi ile idsine eriştik.
    //bu idsini bildigimiz ürünü basket dizisinden filter yöntemi ile kaldırdık
    basket = basket.filter((i) => i.id !== parent.dataset.id);
    console.log(basket);
    //Locali güncelleme
    setLocalStorage("basket", basket);
    //Sayfadan parent etiketini kaldırma
    parent.remove();

    controlBtn(basket);
  }
};

//basketList alanına tıklanıldıgında deleteItem fonksiyonu calısır
elements.basketList.addEventListener("click", deleteItem);

const handleClear = () => {
  //res true gelirse confirm onaylanırsa calısır.
  const res = confirm("Sepet silineceké Emin misiniz?");
  if (res) {
    //locali temizle
    setLocalStorage("basket", null);
    //Sepet Dizisini temizle
    basket = [];
    //Sepeti temizle dizisini ortadan kaldırır.
    controlBtn(basket);
    //basketList Alanını güncelledik
    elements.basketList.innerHTML = "";
  }
};
//Sepeti temizleme butonuna tıklanma olayını izler
elements.clearBtn.addEventListener("click", handleClear);
