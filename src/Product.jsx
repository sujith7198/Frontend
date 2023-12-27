// PRODUCT component
import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { MdDelete } from 'react-icons/md';

function PRODUCT({ entries }) {
  return (
    <>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={entry.image ? URL.createObjectURL(entry.image) : 'holder.js/171x180'}
                    roundedCircle
                  />
                </td>
                <td>{entry.productName}</td>
                <td>{entry.amount}</td>
                <td className="center-icon">
                  <button>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default PRODUCT;
