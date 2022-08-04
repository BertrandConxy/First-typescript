import "../assets/style.css";

import { LocalDataSource } from "./data/localDataSource";

const appElement = document.querySelector("tbody")!;
async function displayData(): Promise<string> {
  let ds = new LocalDataSource();
  let allProducts = await ds.getProducts("name");
//   let categories = await ds.getCategories();
//   let chessProducts = await ds.getProducts("name", "Chess");


//   categories.forEach((c) => (result += `Category: ${c}\n`));
//   chessProducts.forEach((p) => ds.order.addProduct(p, 1));
//   result += `Order total: $${ds.order.totalPrice.toFixed(2)}`;
  let result:string  = ''
  allProducts.forEach(
    (p) =>
      (result += `<tr>
                <td>
                    ${p.name}
                </td>
                <td>
                    ${p.category}
                </td>
                </tr>`)
  );

  return result;

}
displayData().then((res) => (appElement.innerHTML += res));
