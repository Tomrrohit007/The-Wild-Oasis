import { useState } from "react";
import styled from "styled-components";
import { HiTrash, HiSquare2Stack, HiPencil } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { deleteCabinHook, createCabinHook } from "./useHooks";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({
  id,
  name,
  maxCapacity,
  discount,
  regularPrice,
  image,
  description,
}) => {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteFunc } = deleteCabinHook();
  const { isCreating, createFunc } = createCabinHook();

  const handleDuplicate = () => {
    createFunc({
      name: `Copy of ${name}`,
      maxCapacity,
      discount,
      regularPrice,
      image,
      description,
    });
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={id} />
        <Cabin>{name}</Cabin>
        <div>Capacity up to {maxCapacity} person</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isDeleting}
          >
            <HiPencil />
          </button>
          <button onClick={() => deleteFunc(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm
          editTheCabin={{
            id,
            name,
            maxCapacity,
            discount,
            regularPrice,
            image,
            description,
          }}
        />
      )}
    </>
  );
};

export default CabinRow;
