import { useState } from "react";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import Row from "../UI/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      <p>sort/filter</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={()=>setShowForm(prev=>!prev)}>Add new cabin</Button>
        {showForm?<CreateCabinForm  />:null}
      </Row>
    </>
  );
}

export default Cabins;
