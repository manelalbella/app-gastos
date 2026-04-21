import { useEffect, useState } from "react";
import { Datatable } from "../components/data-table";
import { Chart } from "../components/chart";
import { AddModal, type FormData } from "../components/add-modal";
import "./home.css";

export type Items = {
  id: string;
  name: string;
  category: string;
  amount: string;
}[];

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [items, setItems] = useState<Items>([]);

  const handleButtonClick = () => {
    setShowModal(true);
  }

  const onAddItem = (newItem: FormData) => {
    const newItems = [
      ...items,
      {
        id: window.crypto.randomUUID(),
        ...newItem
      }
    ];
    setItems(newItems);

    window.localStorage.setItem('mis-gastos', JSON.stringify(newItems));
  }

  const onDeleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);

    window.localStorage.setItem('mis-gastos', JSON.stringify(newItems));
  }

  useEffect(() => {
    const data = window.localStorage.getItem('mis-gastos');
    if (data && data.length > 0) {
      setItems(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <div className="home-container">
        <h1>Mis Gastos</h1>

        <div className="button">
          <button onClick={handleButtonClick}>Añadir</button>
        </div>

        <Datatable
          items={items}
          onDeleteItem={onDeleteItem}
        />

        <Chart
          items={items}
        />
      </div>
      {showModal && (
        <AddModal
          onClose={() => setShowModal(false)}
          onAddItem={onAddItem}
        />
      )}
    </>
  )
}

export default Home;