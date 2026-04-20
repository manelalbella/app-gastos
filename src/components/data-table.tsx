import type { Items } from "../pages/home";

type Props = {
  items: Items;
  onDeleteItem: (id: string) => void
}

export const Datatable = ({ items, onDeleteItem }: Props) => {

  const getTotal = () => {
    let total = 0;

    for (let index = 0; index < items.length; index++) {
      const amount = parseFloat(items[index].amount);
      total = total + amount;
    }

    return total;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Importe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Aún no has añadido gastos.
              </td>
            </tr>
          ) : (
            <>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.amount}€</td>
                  <td>
                    <button onClick={() => onDeleteItem(item.id)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  <strong>Total:</strong> {getTotal()}€
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}
