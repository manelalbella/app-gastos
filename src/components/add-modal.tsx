import { useState, type SubmitEvent } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./add-modal.css";

const categories = ["Selecciona", "Facturas", "Ocio", "Suscripciones", "Comida"];

export type FormData = {
  name: string;
  category: string;
  amount: string;
}

const defaultValue: FormData = {
  name: '',
  category: '',
  amount: ''
}

type Props = {
  onClose: () => void;
  onAddItem: (newItem: FormData) => void;
}

export const AddModal = ({ onClose, onAddItem }: Props) => {
  const [formData, setFormData] = useState(defaultValue);

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem(formData);
    onClose();
  }

  return (
    <Modal open onClose={onClose} center>
      <div className='modal'>
        <form onSubmit={onSubmit}>
          <h2>Añadir Gasto</h2>

          <label className='Nombre'>Nombre</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            autoComplete='off'
          />

          <label className='Categoria'>Categoria</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            {categories.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          <label className='Importe'>Importe</label>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />

          <button type="submit">Añadir</button>
        </form>
      </div>
    </Modal>
  );
};
