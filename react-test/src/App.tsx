import "./App.css";
import { Item } from "./components/Item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

// const INITIAL_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "Videojuegos",
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "Libros",
//   },
// ];

function App() {
  const { items, addItem, removeItem } = useItems();

  useSEO({
    title: `[${items.length}] Prueba Técnica de React`,
    description: "Añadir y eliminar elementos de una lista",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // e.target.value() --> es para escuchar el onChange de un Input
    // const form = event.currentTarget.elements
    // no se recomienda
    // const input = elements.namedItem("item") as HTMLInputElement ya que estarias FORZANDO a que sea un elemnto input

    const { elements } = event.currentTarget;

    // estrategia 2, es asegurarse que realmente es lo que es
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement; // Javascript puro
    if (!isInput || input == null) return;

    // const getInput = 'item' => {
    //   const isInput = input instanceof HTMLInputElement
    // if (!isInput || input == null) return
    // }

    addItem(input.value);

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id);
  };

  // esto seria sin arrow function
  // function createHandleRemoveItem(id: ItemId) {
  //   return function () {
  //     setItems(function (prevItems) {
  //       return prevItems.filter(function (currentItem) {
  //         currentItem.id !== id;
  //       });
  //     });
  //   };
  // }

  return (
    <main>
      <aside>
        <h1>Prueba Técnica de React</h1>
        <h2>Añadir elementos a una lista</h2>

        <form onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
          <label htmlFor="">
            Elemento a introducir:
            <input type="text" name="item" required placeholder="Videojuego" />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>

        {
          items.length === 0 ? (
          <p>
            <strong>No hay items en la lista</strong>
          </p>
        ) : (
          <ul>
            {
              items.map((item) => {
                return (
                  <Item
                    {...item}
                    key={item.id}
                    handleClick={createHandleRemoveItem(item.id)}
                  />
                );
              })
            }
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
